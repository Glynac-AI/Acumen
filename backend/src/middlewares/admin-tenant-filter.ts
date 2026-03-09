/**
 * Admin Tenant Filter Middleware — Strapi 5.35.0
 *
 * Enforces RBAC for the Strapi Admin Panel:
 *   1. Filters GET /content-manager/content-types  → hides forbidden types (sidebar)
 *   2. Filters GET /content-manager/init           → hides forbidden types (frontend state)
 *   3. Filters GET /admin/permissions and /users/me → hides forbidden permissions
 *   4. Hard-blocks HTTP requests to forbidden content type endpoints (403)
 *   5. Injects tenant filter on all list/bulk GET queries (data isolation)
 *   6. Enforces tenant on all write operations (data isolation)
 *
 * Superadmins (role code: strapi-super-admin) bypass ALL restrictions.
 *
 * Tenant → exclusive content type mapping:
 *   glynac-ai    → api::blog-post.blog-post
 *   regulatethis → api::regulatethis-subscriber.regulatethis-subscriber
 *   sylvian      → api::sylvan-request-access.sylvan-request-access
 *
 * Shared content types (all tenants, data filtered by tenant relation):
 *   article, author, category, tag, pillar, subcategory, site-setting
 *
 * api::tenant.tenant: visible (read/update only), data filtered to own tenant
 *
 * ─── PATCHES ─────────────────────────────────────────────────────────────────
 *
 * PATCH 1 — api::article.article 404 for Glynac Admin
 *   Glynac AI uses blog-post, not article. Article is added to TENANT_HIDDEN_TYPES
 *   for glynac-ai, removing it from the sidebar/init/permissions and hard-blocking
 *   any direct request to it — eliminating the 404 from the content-manager trying
 *   to load a schema the admin has permission to see but shouldn't.
 *
 * PATCH 2 — countDraftRelations → 403
 *   URL pattern: /collection-types/{uid}/actions/countDraftRelations
 *   isSubAction=true routes now short-circuit to next() IMMEDIATELY after the
 *   hard-block check, instead of falling through to the tenant-filter injection
 *   path. Previously the injection could set ctx.query.filters.tenant on the
 *   type-level action request, which has no documentId context and causes Strapi's
 *   own RBAC to reject the unfiltered countDraftRelations call with 403.
 *
 * PATCH 3 — Preview URL 404 console spam
 *   Strapi 5.x renders a "Preview" button even when no previewUrl is configured
 *   in the schema's pluginOptions. The resulting call to
 *   /content-manager/preview/url/{uid}?documentId=... hits an unregistered route
 *   and throws a noisy unhandled-route 404. We intercept it early and return a
 *   clean JSON 404 response for both blog-post and article.
 *
 * PATCH 4 — useRBAC "first argument should be an array" warning
 *   The Strapi admin useRBAC() hook expects its first argument to be an array.
 *   The /users/me response shape is { data: { permissions: [...], ...user } }.
 *   The old code detected permissionsPath='data.permissions' correctly but then
 *   wrote ctx.body = filtered (an array) at the ROOT level, replacing the entire
 *   user object with a bare permissions array. The useRBAC hook received an object
 *   instead of an array and logged the deprecation warning. Fixed by writing the
 *   filtered array back to the exact sub-path it was read from.
 *
 * PATCH 5 — TENANT_HIDDEN_TYPES applied in permissions + init + sidebar filters
 *   The permissions filter previously only stripped EXCLUSIVE types from other
 *   tenants. Hidden types (shared types a tenant doesn't use) were left in the
 *   permissions response, causing stale permission entries to trigger RBAC errors
 *   and the useRBAC warning on every navigation event.
 */

import type { Core } from '@strapi/strapi';

// ─── Tenant RBAC configuration ────────────────────────────────────────────────
const TENANT_EXCLUSIVE_TYPES: Record<string, string[]> = {
    'glynac-ai': ['api::blog-post.blog-post'],
    'regulatethis': ['api::regulatethis-subscriber.regulatethis-subscriber'],
    'sylvian': ['api::sylvan-request-access.sylvan-request-access'],
};

const ALL_EXCLUSIVE_TYPES: string[] = Object.values(TENANT_EXCLUSIVE_TYPES).flat();

/**
 * Shared content types hidden for specific tenants.
 * These are "shared" types that a tenant simply does not use.
 * They are stripped from the sidebar, init state, and permissions,
 * and any direct request to them is blocked with 403.
 *
 * PATCH 1: glynac-ai uses blog-post for content — article is hidden.
 */
const TENANT_HIDDEN_TYPES: Record<string, string[]> = {
    'glynac-ai': ['api::article.article'],
};

/**
 * Returns true if `uid` is visible and accessible for `tenantSlug`.
 * Blocks: exclusive types owned by another tenant, and hidden types for this tenant.
 */
function isContentTypeAllowed(uid: string, tenantSlug: string): boolean {
    // Exclusive type → only allowed for the tenant that owns it
    if (ALL_EXCLUSIVE_TYPES.includes(uid)) {
        return (TENANT_EXCLUSIVE_TYPES[tenantSlug] || []).includes(uid);
    }
    // Hidden type → not allowed for this tenant
    const hidden = TENANT_HIDDEN_TYPES[tenantSlug] || [];
    return !hidden.includes(uid);
}

/** Resolves the full admin::user record including tenant + roles. */
async function resolveAdminUser(ctx: any, strapi: Core.Strapi): Promise<any | null> {
    const userId = ctx.state?.user?.id;
    if (!userId) return null;
    try {
        return await strapi.db.query('admin::user').findOne({
            where: { id: userId },
            populate: ['tenant', 'roles'],
        });
    } catch {
        return null;
    }
}

/**
 * Email-to-tenant-slug fallback (keys are lowercased).
 * Used when the tenant DB relation is not populated on the admin::user record.
 * NOTE: The seeded Glynac admin email is 'GlynacAdmin@glynac.ai' —
 *       always lowercase before looking up in this map.
 */
const EMAIL_TENANT_FALLBACK: Record<string, string> = {
    'glynacadmin@glynac.ai': 'glynac-ai',
    'admin@sylvannotes.com': 'sylvian',
    'admin@regulatethis.com': 'regulatethis',
};

export default (config: Record<string, unknown>, { strapi }: { strapi: Core.Strapi }) => {
    return async (ctx: any, next: () => Promise<void>) => {

        const url: string = ctx.url || '';
        const method: string = ctx.request?.method || 'GET';

        // ── Route classification ────────────────────────────────────────────
        // Exact match: /content-manager/content-types  (no trailing path segments)
        const isContentManagerContentTypes = /\/content-manager\/content-types(\?|$)/.test(url);
        const isContentManagerInit = /\/content-manager\/init(\?|$)/.test(url);
        const isPermissionsEndpoint =
            url.includes('/admin/permissions') ||
            url.includes('/users/me');

        const isContentManager = url.startsWith('/content-manager/');
        const isAdminRoute = url.startsWith('/admin/');

        // Skip entirely if not an admin or content-manager route
        if (!isContentManager && !isAdminRoute) {
            return next();
        }

        // ── PATCH 3: Silently handle preview URL requests ───────────────────
        // Strapi 5.x fires preview button requests even when no previewUrl is
        // configured in the content type's pluginOptions. Without this guard the
        // request hits an unregistered route and Strapi logs a noisy 404 error.
        if (/\/content-manager\/preview\/url\//.test(url)) {
            ctx.status = 404;
            ctx.body = {
                error: {
                    status: 404,
                    name: 'NotFoundError',
                    message: 'Preview URL is not configured for this content type.',
                },
            };
            return;
        }

        // ════════════════════════════════════════════════════════════════════
        // UPWARD CYCLE — run next() first, then intercept the RESPONSE
        // ════════════════════════════════════════════════════════════════════
        if (isContentManagerContentTypes || isContentManagerInit || isPermissionsEndpoint) {
            await next();

            // Only process successful responses
            if (ctx.response.status !== 200 || !ctx.body) return;

            const adminUser = await resolveAdminUser(ctx, strapi);
            if (!adminUser) return;

            const isSuperAdmin = adminUser.roles?.some((r: any) => r.code === 'strapi-super-admin');
            if (isSuperAdmin) return;

            // Resolve tenant slug — DB relation first, email fallback second
            let tenantSlug: string = adminUser.tenant?.slug || '';
            if (!tenantSlug && adminUser.email) {
                tenantSlug = EMAIL_TENANT_FALLBACK[adminUser.email.toLowerCase()] || '';
                if (tenantSlug) {
                    strapi.log.warn(
                        `[Admin RBAC] UPWARD fallback: tenantSlug='${tenantSlug}' for ${adminUser.email}`
                    );
                }
            }

            // Diagnostic log — visible in production (info level)
            strapi.log.info(
                `[Admin RBAC] UPWARD ${method} ${url.substring(0, 80)} | ` +
                `user=${adminUser.email} | tenant='${tenantSlug}' | ` +
                `roles=${adminUser.roles?.map((r: any) => r.code).join(',') || 'none'}`
            );

            // ── 1. Filter /content-manager/content-types (SIDEBAR) ────────────
            if (isContentManagerContentTypes) {
                try {
                    const responseData = ctx.body?.data ?? ctx.body;

                    if (Array.isArray(responseData)) {
                        const before = responseData.length;
                        const filtered = responseData.filter((ct: any) => {
                            const uid: string = ct.uid || '';
                            if (uid === 'api::tenant.tenant') return false;
                            return isContentTypeAllowed(uid, tenantSlug);
                        });

                        if (ctx.body?.data !== undefined) {
                            ctx.body.data = filtered;
                        } else {
                            ctx.body = filtered;
                        }

                        ctx.response.set('X-RBAC-CT-Before', before.toString());
                        ctx.response.set('X-RBAC-CT-After', filtered.length.toString());
                        strapi.log.info(
                            `[Admin RBAC] Sidebar: ${before} → ${filtered.length} types for '${tenantSlug}'`
                        );
                    }
                } catch (e) {
                    strapi.log.error('[Admin RBAC] Content-types filter error:', e);
                }
                return;
            }

            // ── 1b. Filter /content-manager/init (FRONTEND STATE) ─────────────
            if (isContentManagerInit) {
                try {
                    const initData = ctx.body?.data ?? ctx.body;

                    if (initData && typeof initData === 'object') {
                        // Handle both { contentTypes: [...] } and { data: { contentTypes: [...] } }
                        let ctArray: any[] | null = null;
                        let ctPath: 'root' | 'data' = 'root';

                        if (Array.isArray(initData.contentTypes)) {
                            ctArray = initData.contentTypes;
                            ctPath = 'root';
                        } else if (Array.isArray(initData.data?.contentTypes)) {
                            ctArray = initData.data.contentTypes;
                            ctPath = 'data';
                        }

                        if (ctArray) {
                            const before = ctArray.length;
                            const filtered = ctArray.filter((ct: any) => {
                                const uid: string = ct.uid || '';
                                if (uid === 'api::tenant.tenant') return false;
                                return isContentTypeAllowed(uid, tenantSlug);
                            });

                            if (ctPath === 'root') {
                                initData.contentTypes = filtered;
                            } else {
                                initData.data.contentTypes = filtered;
                            }
                            strapi.log.info(
                                `[Admin RBAC] Init: ${before} → ${filtered.length} types for '${tenantSlug}'`
                            );
                        }
                    }
                } catch (e) {
                    strapi.log.error('[Admin RBAC] Init filter error:', e);
                }
                return;
            }

            // ── 2. Filter /admin/permissions and /admin/users/me ──────────────
            // PATCH 4: Write the filtered array back to the EXACT path it was
            // read from to preserve the response body shape that useRBAC() expects.
            if (isPermissionsEndpoint) {
                try {
                    let permissionsArray: any[] = [];
                    let permissionsPath: 'root' | 'data' | 'data.permissions' = 'root';

                    if (Array.isArray(ctx.body)) {
                        permissionsArray = ctx.body;
                        permissionsPath = 'root';
                    } else if (Array.isArray(ctx.body?.data)) {
                        permissionsArray = ctx.body.data;
                        permissionsPath = 'data';
                    } else if (Array.isArray(ctx.body?.data?.permissions)) {
                        // /users/me shape: { data: { permissions: [...], ...userFields } }
                        permissionsArray = ctx.body.data.permissions;
                        permissionsPath = 'data.permissions';
                    }

                    if (permissionsArray.length === 0) {
                        strapi.log.debug(`[Admin RBAC] No permissions array for ${url}`);
                        return;
                    }

                    const before = permissionsArray.length;

                    // PATCH 5: Filter both exclusive AND hidden types
                    const filtered = permissionsArray.filter((p: any) => {
                        const uid: string = p.subject || '';

                        // Tenant model: read + update only
                        if (uid === 'api::tenant.tenant') {
                            return (
                                p.action === 'plugin::content-manager.explorer.read' ||
                                p.action === 'plugin::content-manager.explorer.update'
                            );
                        }

                        return isContentTypeAllowed(uid, tenantSlug);
                    });

                    strapi.log.info(
                        `[Admin RBAC] Permissions: ${before} → ${filtered.length} for '${tenantSlug}'`
                    );

                    // PATCH 4: Restore filtered array to exact path to preserve body shape
                    if (permissionsPath === 'root') {
                        ctx.body = filtered;
                    } else if (permissionsPath === 'data') {
                        ctx.body.data = filtered;
                    } else {
                        // 'data.permissions' — keep { data: { ...user, permissions: filtered } }
                        ctx.body.data.permissions = filtered;
                    }

                    ctx.response.set('X-RBAC-Perms-Before', before.toString());
                    ctx.response.set('X-RBAC-Perms-After', filtered.length.toString());
                } catch (e) {
                    strapi.log.error('[Admin RBAC] Permissions filter error:', e);
                }
                return;
            }

            return;
        }

        // ════════════════════════════════════════════════════════════════════
        // DOWNWARD CYCLE — intercept the REQUEST before Strapi processes it
        // ════════════════════════════════════════════════════════════════════

        // ── Early exit: /content-manager/relations/* ───────────────────────
        // Relation picker dropdown data. Strapi's own RBAC handles access.
        // Injecting tenant filters here causes "An error occurred while fetching
        // draft relations on this document." errors in the UI.
        if (url.startsWith('/content-manager/relations/')) {
            return next();
        }

        if (!ctx.state?.user?.id) {
            return next();
        }

        try {
            const adminUser = await resolveAdminUser(ctx, strapi);
            if (!adminUser) return next();

            const isSuperAdmin = adminUser.roles?.some((r: any) => r.code === 'strapi-super-admin');
            if (isSuperAdmin) return next();

            // Resolve tenant — DB relation first, email fallback second
            let tenantId: number | null = adminUser.tenant?.id || null;
            let tenantDocumentId: string | null = adminUser.tenant?.documentId || null;
            let tenantSlug: string = adminUser.tenant?.slug || '';

            if ((!tenantSlug || !tenantId) && adminUser.email) {
                const fbSlug = EMAIL_TENANT_FALLBACK[adminUser.email.toLowerCase()];
                if (fbSlug) {
                    const tenantRec = await strapi.documents('api::tenant.tenant').findFirst({
                        filters: { slug: fbSlug }
                    });
                    if (tenantRec) {
                        tenantId = tenantRec.id as number;
                        tenantDocumentId = tenantRec.documentId;
                        tenantSlug = tenantRec.slug;
                        strapi.log.warn(
                            `[Admin RBAC] DOWNWARD fallback: tenant='${tenantSlug}' for ${adminUser.email}`
                        );
                    }
                }
            }

            if (!tenantId || !tenantDocumentId) return next();

            const cleanUrl = url.split('?')[0];
            const urlParts = cleanUrl.split('/').filter(Boolean);

            let targetModelUid = '';
            let documentId = '';
            // isSubAction: true for type-level actions (/actions/countDraftRelations)
            // and document-level sub-routes (/actions/publish, /relations/field).
            // In both cases skip ownership check and body injection.
            let isSubAction = false;

            const collIdx = urlParts.indexOf('collection-types');
            const singleIdx = urlParts.indexOf('single-types');
            const relIdx = urlParts.indexOf('relations');

            if (collIdx !== -1 && urlParts.length > collIdx + 1) {
                targetModelUid = urlParts[collIdx + 1];
                const candidateSegment = urlParts.length > collIdx + 2 ? urlParts[collIdx + 2] : '';

                // Shape A — TYPE-LEVEL action (no documentId):
                //   /collection-types/{uid}/actions/{action}
                //   e.g. countDraftRelations, bulkDelete
                //   candidateSegment === 'actions' → NOT a documentId.
                if (candidateSegment === 'actions') {
                    isSubAction = true;
                } else if (candidateSegment) {
                    documentId = candidateSegment;
                    // Shape B — DOCUMENT-LEVEL sub-route after documentId
                    const segmentsAfterDocId = urlParts.slice(collIdx + 3);
                    if (segmentsAfterDocId[0] === 'actions' || segmentsAfterDocId[0] === 'relations') {
                        isSubAction = true;
                    }
                }
            } else if (singleIdx !== -1 && urlParts.length > singleIdx + 1) {
                targetModelUid = urlParts[singleIdx + 1];
            } else if (relIdx !== -1 && urlParts.length > relIdx + 1) {
                targetModelUid = urlParts[relIdx + 1];
            }

            if (!targetModelUid || !strapi.contentTypes[targetModelUid]) {
                return next();
            }

            // ── Unified access check: exclusive + hidden types ─────────────────
            // PATCH 1 + PATCH 2: Check isBlocked BEFORE the isSubAction short-circuit
            // so that forbidden types are always hard-blocked, then let allowed
            // sub-actions (countDraftRelations etc.) pass through cleanly.
            const isBlocked = !isContentTypeAllowed(targetModelUid, tenantSlug)
                || (TENANT_HIDDEN_TYPES[tenantSlug] || []).includes(targetModelUid);

            if (isBlocked) {
                strapi.log.info(
                    `[Admin RBAC] HARD BLOCK: ${method} ${targetModelUid} for tenant '${tenantSlug}'`
                );
                ctx.status = 403;
                ctx.body = {
                    error: {
                        status: 403,
                        name: 'ForbiddenError',
                        message: 'Access denied: This content type is not available for your tenant.',
                    },
                };
                return;
            }

            // PATCH 2: After confirming the type is allowed, let sub-actions
            // (countDraftRelations, publish, unpublish, bulkDelete etc.) pass
            // directly to Strapi without any tenant injection — these endpoints
            // operate on already-verified documents and have no ownership context.
            if (isSubAction) {
                return next();
            }

            const model = strapi.contentTypes[targetModelUid] as any;
            const isTenantScopedModel = !!(model.attributes && model.attributes.tenant);
            const isTenantModel = targetModelUid === 'api::tenant.tenant';

            // ── Inject tenant filter on list GET requests ──────────────────────
            if (method === 'GET' && !documentId) {
                if (!ctx.query) ctx.query = {};
                if (!ctx.query.filters) ctx.query.filters = {};

                if (isTenantScopedModel) {
                    ctx.query.filters.tenant = { id: { $eq: tenantId } };
                } else if (isTenantModel) {
                    ctx.query.filters.id = { $eq: tenantId };
                }
            }

            // ── Document-level access protection ──────────────────────────────
            if (documentId && (isTenantScopedModel || isTenantModel)) {
                let entity: any = null;

                if (isTenantScopedModel) {
                    // strapi.db.query returns DB rows — querying by document_id without
                    // status filter covers both draft and published versions.
                    entity = await strapi.db.query(targetModelUid).findOne({
                        where: { document_id: documentId, tenant: tenantId },
                    });
                    // Fallback: some Strapi v5 builds expose it as 'documentId'
                    if (!entity) {
                        entity = await strapi.db.query(targetModelUid).findOne({
                            where: { documentId, tenant: tenantId },
                        });
                    }
                } else if (isTenantModel) {
                    entity = await strapi.db.query(targetModelUid).findOne({
                        where: { id: tenantId },
                    });
                }

                if (!entity) {
                    strapi.log.info(
                        `[Admin RBAC] BLOCKED ${method} ${targetModelUid}:${documentId} for tenant id=${tenantId}`
                    );
                    ctx.status = 403;
                    ctx.body = {
                        error: {
                            status: 403,
                            name: 'ForbiddenError',
                            message: 'Access denied: This content does not belong to your tenant.',
                        },
                    };
                    return;
                }
            }

            // ── Force tenant on write operations ──────────────────────────────
            // Strapi v5 content-manager API expects relations in connect/disconnect
            // format. A plain string/id is silently ignored, leaving tenant NULL
            // which then blocks the subsequent publish action with 403.
            if (['POST', 'PUT', 'PATCH'].includes(method) && isTenantScopedModel) {
                if (!ctx.request.body) ctx.request.body = {};
                ctx.request.body.tenant = {
                    connect: [{ id: tenantId }],
                };

                strapi.log.info(
                    `[Admin RBAC] Injected tenant for ${method} ${targetModelUid} (tenantId=${tenantId})`
                );
            }

        } catch (error) {
            strapi.log.error('[Admin RBAC] Middleware error:', error);
        }

        return next();
    };
};