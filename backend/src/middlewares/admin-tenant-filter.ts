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
 */

import type { Core } from '@strapi/strapi';

// ─── Tenant RBAC configuration ────────────────────────────────────────────────
const TENANT_EXCLUSIVE_TYPES: Record<string, string[]> = {
    'glynac-ai': ['api::blog-post.blog-post'],
    'regulatethis': ['api::regulatethis-subscriber.regulatethis-subscriber'],
    'sylvian': ['api::sylvan-request-access.sylvan-request-access'],
};

const ALL_EXCLUSIVE_TYPES: string[] = Object.values(TENANT_EXCLUSIVE_TYPES).flat();

function isContentTypeAllowed(uid: string, tenantSlug: string): boolean {
    if (!ALL_EXCLUSIVE_TYPES.includes(uid)) return true;
    return (TENANT_EXCLUSIVE_TYPES[tenantSlug] || []).includes(uid);
}

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

export default (config: Record<string, unknown>, { strapi }: { strapi: Core.Strapi }) => {
    return async (ctx: any, next: () => Promise<void>) => {

        const url: string = ctx.url || '';
        const method: string = ctx.request?.method || 'GET';

        // ── Route classification ────────────────────────────────────────────
        // content-types list: exact match on /content-manager/content-types (no trailing path segments)
        const contentTypesPattern = /\/content-manager\/content-types(\?|$)/;
        const isContentManagerContentTypes = contentTypesPattern.test(url);

        // init endpoint: /content-manager/init
        const isContentManagerInit = /\/content-manager\/init(\?|$)/.test(url);

        // permissions / users/me
        const isPermissionsEndpoint =
            url.includes('/admin/permissions') ||
            url.includes('/users/me');

        const isContentManager = url.startsWith('/content-manager/');
        const isAdminRoute = url.startsWith('/admin/');

        // Skip entirely if not an admin or content-manager route
        if (!isContentManager && !isAdminRoute) {
            return next();
        }

        // ════════════════════════════════════════════════════════════════════
        // UPWARD CYCLE — run next() first, then intercept the RESPONSE
        // ════════════════════════════════════════════════════════════════════
        if (isContentManagerContentTypes || isContentManagerInit || isPermissionsEndpoint) {
            await next();

            if (ctx.response.status !== 200 || !ctx.body) return;

            const adminUser = await resolveAdminUser(ctx, strapi);
            if (!adminUser) return;

            const isSuperAdmin = adminUser.roles?.some((r: any) => r.code === 'strapi-super-admin');
            if (isSuperAdmin) return;

            let tenantSlug: string = adminUser.tenant?.slug || '';

            // Fallback: If DB relation is missing, infer tenant from known admin emails
            if (!tenantSlug && adminUser.email) {
                const fallbackMap: Record<string, string> = {
                    'glynacadmin@glynac.ai': 'glynac-ai',
                    'admin@sylvannotes.com': 'sylvian',
                    'admin@regulatethis.com': 'regulatethis'
                };
                tenantSlug = fallbackMap[adminUser.email.toLowerCase()] || '';
                if (tenantSlug) {
                    strapi.log.warn(`[Admin RBAC] UPWARD fallback: derived tenantSlug '${tenantSlug}' for ${adminUser.email}`);
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
                        const filtered = responseData.filter((ct: any) => {
                            const uid: string = ct.uid || '';
                            if (uid === 'api::tenant.tenant') return false;
                            return isContentTypeAllowed(uid, tenantSlug);
                        });

                        const hasBlogPost = filtered.some((ct: any) => ct.uid === 'api::blog-post.blog-post');
                        strapi.log.warn(`[DEBUG-RBAC] Sidebar payload has blog-post? ${hasBlogPost}`);

                        if (ctx.body?.data !== undefined) {
                            ctx.body.data = filtered;
                        } else {
                            ctx.body = filtered;
                        }

                        ctx.response.set('X-RBAC-CT-Before', responseData.length.toString());
                        ctx.response.set('X-RBAC-CT-After', filtered.length.toString());
                        strapi.log.info(`[Admin RBAC] Sidebar: ${responseData.length} → ${filtered.length} types for '${tenantSlug}'`);
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
                            const filtered = ctArray.filter((ct: any) => {
                                const uid: string = ct.uid || '';
                                if (uid === 'api::tenant.tenant') return false;
                                return isContentTypeAllowed(uid, tenantSlug);
                            });

                            const hasBlogPostInit = filtered.some((ct: any) => ct.uid === 'api::blog-post.blog-post');
                            strapi.log.warn(`[DEBUG-RBAC] Init payload has blog-post? ${hasBlogPostInit}`);

                            if (ctPath === 'root') {
                                initData.contentTypes = filtered;
                            } else {
                                initData.data.contentTypes = filtered;
                            }

                            strapi.log.info(`[Admin RBAC] Init: ${ctArray.length} → ${filtered.length} types for '${tenantSlug}'`);
                        }
                    }
                } catch (e) {
                    strapi.log.error('[Admin RBAC] Init filter error:', e);
                }
                return;
            }

            // ── 2. Filter /admin/permissions and /admin/users/me ──────────────
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
                        permissionsArray = ctx.body.data.permissions;
                        permissionsPath = 'data.permissions';
                    }

                    if (permissionsArray.length === 0) {
                        strapi.log.debug(`[Admin RBAC] No permissions array in response for ${url}`);
                        return;
                    }

                    const before = permissionsArray.length;

                    const filtered = permissionsArray.filter((p: any) => {
                        const uid: string = p.subject || '';

                        if (uid === 'api::tenant.tenant') {
                            return (
                                p.action === 'plugin::content-manager.explorer.read' ||
                                p.action === 'plugin::content-manager.explorer.update'
                            );
                        }

                        if (ALL_EXCLUSIVE_TYPES.includes(uid)) {
                            return isContentTypeAllowed(uid, tenantSlug);
                        }

                        return true;
                    });

                    const hasBlogPostPerm = filtered.some((p: any) => p.subject === 'api::blog-post.blog-post' && p.action === 'plugin::content-manager.explorer.read');
                    strapi.log.warn(`[DEBUG-RBAC] Permissions payload has blog-post read? ${hasBlogPostPerm}`);

                    if (permissionsPath === 'root') {
                        ctx.body = filtered;
                    } else if (permissionsPath === 'data') {
                        ctx.body.data = filtered;
                    } else {
                        ctx.body.data.permissions = filtered;
                    }

                    ctx.response.set('X-RBAC-Perms-Before', before.toString());
                    ctx.response.set('X-RBAC-Perms-After', filtered.length.toString());
                    strapi.log.info(`[Admin RBAC] Permissions: ${before} → ${filtered.length} for '${tenantSlug}'`);
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

        if (!ctx.state?.user?.id) {
            return next();
        }

        try {
            const adminUser = await resolveAdminUser(ctx, strapi);
            if (!adminUser) return next();

            const isSuperAdmin = adminUser.roles?.some((r: any) => r.code === 'strapi-super-admin');
            if (isSuperAdmin) return next();

            let tenantId: number | null = adminUser.tenant?.id || null;
            let tenantDocumentId: string | null = adminUser.tenant?.documentId || null;
            let tenantSlug: string = adminUser.tenant?.slug || '';

            // Fallback: If DB relation is missing, infer tenant from known admin emails
            if ((!tenantSlug || !tenantId) && adminUser.email) {
                const fallbackMap: Record<string, string> = {
                    'glynacadmin@glynac.ai': 'glynac-ai',
                    'admin@sylvannotes.com': 'sylvian',
                    'admin@regulatethis.com': 'regulatethis'
                };
                const fbSlug = fallbackMap[adminUser.email.toLowerCase()];
                if (fbSlug) {
                    const tenantRec = await strapi.documents('api::tenant.tenant').findFirst({
                        filters: { slug: fbSlug }
                    });
                    if (tenantRec) {
                        tenantId = tenantRec.id as number;
                        tenantDocumentId = tenantRec.documentId;
                        tenantSlug = tenantRec.slug;
                        strapi.log.warn(`[Admin RBAC] DOWNWARD fallback: derived tenant '${tenantSlug}' for ${adminUser.email}`);
                    }
                }
            }

            if (!tenantId || !tenantDocumentId) return next();

            const cleanUrl = url.split('?')[0];
            const urlParts = cleanUrl.split('/').filter(Boolean);

            let targetModelUid = '';
            let documentId = '';
            // Track whether this is a sub-action (e.g. /actions/publish, /actions/unpublish)
            // These are POST requests to a specific document, not CRUD on the entity itself.
            let isSubAction = false;

            const collIdx = urlParts.indexOf('collection-types');
            const singleIdx = urlParts.indexOf('single-types');
            const relIdx = urlParts.indexOf('relations');

            if (collIdx !== -1 && urlParts.length > collIdx + 1) {
                targetModelUid = urlParts[collIdx + 1];
                if (urlParts.length > collIdx + 2) {
                    documentId = urlParts[collIdx + 2];
                }
                // Detect /actions/* sub-routes: .../collection-types/{uid}/{docId}/actions/{action}
                // e.g. publish, unpublish, discard-draft
                const actionsIdx = urlParts.indexOf('actions', collIdx + 2);
                if (actionsIdx !== -1) {
                    isSubAction = true;
                }
            } else if (singleIdx !== -1 && urlParts.length > singleIdx + 1) {
                targetModelUid = urlParts[singleIdx + 1];
            } else if (relIdx !== -1 && urlParts.length > relIdx + 1) {
                targetModelUid = urlParts[relIdx + 1];
            }

            if (!targetModelUid || !strapi.contentTypes[targetModelUid]) {
                return next();
            }

            const model = strapi.contentTypes[targetModelUid] as any;
            const isTenantScopedModel = !!(model.attributes && model.attributes.tenant);
            const isTenantModel = targetModelUid === 'api::tenant.tenant';

            // ── HARD BLOCK: Deny access to other tenants' exclusive content types ──
            if (ALL_EXCLUSIVE_TYPES.includes(targetModelUid) && !isContentTypeAllowed(targetModelUid, tenantSlug)) {
                strapi.log.info(`[Admin RBAC] HARD BLOCK: ${method} ${targetModelUid} for tenant '${tenantSlug}'`);
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
            // For sub-actions (publish/unpublish/discard-draft), we still verify
            // ownership but via a separate query that handles draft-only documents.
            if (documentId && (isTenantScopedModel || isTenantModel)) {
                let entity: any = null;

                if (isTenantScopedModel) {
                    // Try both draft and published states for draftAndPublish types.
                    // strapi.db.query returns DB rows (not versioned documents), so
                    // querying by documentId without status filter covers both states.
                    entity = await strapi.db.query(targetModelUid).findOne({
                        where: {
                            document_id: documentId,
                            tenant: tenantId,
                        },
                    });

                    // Fallback: Strapi v5 uses 'document_id' column but some versions
                    // may expose it as 'documentId'. Try the alternate field name.
                    if (!entity) {
                        entity = await strapi.db.query(targetModelUid).findOne({
                            where: {
                                documentId,
                                tenant: tenantId,
                            },
                        });
                    }
                } else if (isTenantModel) {
                    entity = await strapi.db.query(targetModelUid).findOne({
                        where: { id: tenantId },
                    });
                }

                if (!entity) {
                    strapi.log.info(`[Admin RBAC] BLOCKED ${method} ${targetModelUid}:${documentId} for tenant id=${tenantId}`);
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
            // Sub-actions (publish/unpublish) do not accept a body for the tenant
            // relation — they operate on the existing document. Skip body injection
            // for those routes; ownership is already verified above.
            //
            // For create (POST without documentId) and update (PUT/PATCH with documentId),
            // inject the tenant using the Strapi v5 Document Service relation format:
            //   { connect: [{ documentId: tenantDocumentId }] }
            // A plain string is NOT accepted by the content-manager API for relations.
            if (!isSubAction && ['POST', 'PUT', 'PATCH'].includes(method) && isTenantScopedModel) {
                if (!ctx.request.body) ctx.request.body = {};

                // Strapi v5 content-manager API expects relations in connect/disconnect format.
                // Setting a plain string breaks the relation silently — tenant stays NULL,
                // which then causes the document-level check to block the publish action.
                ctx.request.body.tenant = {
                    connect: [{ documentId: tenantDocumentId }],
                };

                strapi.log.info(`[Admin RBAC] Injected tenant relation for ${method} ${targetModelUid} (tenantDocumentId=${tenantDocumentId})`);
            }

        } catch (error) {
            strapi.log.error('[Admin RBAC] Middleware error:', error);
        }

        return next();
    };
};
