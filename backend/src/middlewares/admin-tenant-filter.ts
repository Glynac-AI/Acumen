/**
 * Admin Tenant Filter Middleware
 *
 * Enforces RBAC for the Strapi Admin Panel:
 *   1. Filters GET /admin/content-manager/content-types to hide forbidden content types (sidebar)
 *   2. Filters GET /admin/permissions to hide forbidden permissions
 *   3. Hard-blocks HTTP requests to forbidden content type endpoints (403)
 *   4. Injects tenant filter on all list/bulk GET queries (data isolation)
 *   5. Enforces tenant on all write operations (data isolation)
 *
 * Superadmins (role code: strapi-super-admin) bypass ALL restrictions.
 */

import type { Core } from '@strapi/strapi';

// ─── Tenant RBAC configuration ────────────────────────────────────────────────
// Map each tenant slug to the content type UIDs that are EXCLUSIVE to that tenant.
// All other content types are "shared" and visible to all tenant admins (filtered by tenant).
const TENANT_EXCLUSIVE_TYPES: Record<string, string[]> = {
    'glynac-ai': ['api::blog-post.blog-post'],
    'regulatethis': ['api::regulatethis-subscriber.regulatethis-subscriber'],
    'sylvian': ['api::sylvan-request-access.sylvan-request-access'],
};

// Flat list of ALL exclusive types across all tenants
const ALL_EXCLUSIVE_TYPES: string[] = Object.values(TENANT_EXCLUSIVE_TYPES).flat();

/**
 * Given the current admin user's tenant slug, returns true if the
 * given content type UID is accessible to this tenant.
 */
function isContentTypeAllowed(uid: string, tenantSlug: string): boolean {
    // Shared types (not in any exclusive list) are always allowed
    if (!ALL_EXCLUSIVE_TYPES.includes(uid)) return true;
    // Exclusive types are only allowed for their designated tenant
    return (TENANT_EXCLUSIVE_TYPES[tenantSlug] || []).includes(uid);
}

/**
 * Resolve the admin user from ctx.state.user, with tenant and roles populated.
 * Returns null if not authenticated or user not found.
 */
async function resolveAdminUser(ctx: any, strapi: Core.Strapi): Promise<any | null> {
    // ctx.state.user is set by Strapi's admin auth handler after next() in upward cycle,
    // or may be set before next() in downward cycle depending on Strapi version.
    // Always safe to call — returns null if not available.
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
        const isContentManagerContentTypes = url.includes('/content-manager/content-types');
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
        // Used for: content-types list (sidebar) and permissions endpoints
        // ════════════════════════════════════════════════════════════════════
        if (isContentManagerContentTypes || isPermissionsEndpoint) {
            await next(); // Let Strapi generate the full response first

            // Only proceed if response is successful and we have an authenticated user
            if (ctx.response.status !== 200 || !ctx.body) return;

            // Resolve user AFTER next() — ctx.state.user is populated by now
            const adminUser = await resolveAdminUser(ctx, strapi);
            if (!adminUser) return;

            // Superadmins are never filtered
            const isSuperAdmin = adminUser.roles?.some((r: any) => r.code === 'strapi-super-admin');
            strapi.log.debug(
                `[Admin RBAC] ${method} ${url} | user=${adminUser.email} | superAdmin=${isSuperAdmin} | ` +
                `roles=${adminUser.roles?.map((r: any) => r.code).join(',') || 'none'} | ` +
                `tenant=${adminUser.tenant?.slug || 'none'}`
            );
            if (isSuperAdmin) return;

            // No tenant assigned = treat as restricted with no exclusive type
            const tenantSlug: string = adminUser.tenant?.slug || '';

            // ── 1. Filter /admin/content-manager/content-types (SIDEBAR) ──────
            if (isContentManagerContentTypes) {
                try {
                    // Strapi v5 response shape: { data: ContentType[] } or ContentType[]
                    const responseData = ctx.body?.data ?? ctx.body;

                    if (Array.isArray(responseData)) {
                        const filtered = responseData.filter((ct: any) => {
                            const uid: string = ct.uid || '';
                            // Always hide the tenant model from sidebar (accessible via relation, not direct edit)
                            if (uid === 'api::tenant.tenant') return false;
                            return isContentTypeAllowed(uid, tenantSlug);
                        });

                        if (ctx.body?.data !== undefined) {
                            ctx.body.data = filtered;
                        } else {
                            ctx.body = filtered;
                        }

                        ctx.response.set('X-RBAC-Content-Types-Before', responseData.length.toString());
                        ctx.response.set('X-RBAC-Content-Types-After', filtered.length.toString());
                        strapi.log.debug(`[Admin RBAC] Sidebar filtered: ${responseData.length} → ${filtered.length} types for tenant '${tenantSlug}'`);
                    }
                } catch (e) {
                    strapi.log.error('[Admin RBAC] Content-types filter error:', e);
                }
                return;
            }

            // ── 2. Filter /admin/permissions and /admin/users/me ──────────────
            if (isPermissionsEndpoint) {
                try {
                    // Strapi v5 /admin/permissions response: { data: Permission[] }
                    // Strapi v5 /admin/users/me response: { data: { roles, permissions?, ... } }
                    // The permissions list may be nested differently — handle both shapes.
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
                        // No permissions array found in response — nothing to filter
                        strapi.log.debug(`[Admin RBAC] No permissions array found in response for ${url}`);
                        return;
                    }

                    const before = permissionsArray.length;

                    const filtered = permissionsArray.filter((p: any) => {
                        const uid: string = p.subject || '';

                        // Tenant model: allow read/update only
                        if (uid === 'api::tenant.tenant') {
                            return (
                                p.action === 'plugin::content-manager.explorer.read' ||
                                p.action === 'plugin::content-manager.explorer.update'
                            );
                        }

                        // Exclusive content types: only allow if this tenant owns them
                        if (ALL_EXCLUSIVE_TYPES.includes(uid)) {
                            return isContentTypeAllowed(uid, tenantSlug);
                        }

                        // All other permissions (shared types, upload, i18n, etc.) pass through
                        return true;
                    });

                    // Write filtered array back to the correct response path
                    if (permissionsPath === 'root') {
                        ctx.body = filtered;
                    } else if (permissionsPath === 'data') {
                        ctx.body.data = filtered;
                    } else {
                        ctx.body.data.permissions = filtered;
                    }

                    ctx.response.set('X-RBAC-Permissions-Before', before.toString());
                    ctx.response.set('X-RBAC-Permissions-After', filtered.length.toString());
                    strapi.log.debug(`[Admin RBAC] Permissions filtered: ${before} → ${filtered.length} for tenant '${tenantSlug}'`);
                } catch (e) {
                    strapi.log.error('[Admin RBAC] Permissions filter error:', e);
                }
                return;
            }

            return; // Handled above, no further processing
        }

        // ════════════════════════════════════════════════════════════════════
        // DOWNWARD CYCLE — intercept the REQUEST before Strapi processes it
        // Used for: content-manager data operations (data isolation + hard blocks)
        // ════════════════════════════════════════════════════════════════════

        // For downward cycle, ctx.state.user may or may not be set yet depending on
        // Strapi's auth middleware timing. We proceed with next() if user is not available
        // and check after — but for blocking we need the user, so we call next() and
        // re-check, OR we rely on Strapi's built-in permission checks for unauthenticated.
        //
        // STRATEGY: Attempt to read ctx.state.user; if null, pass through.
        // Strapi's own permission layer will block unauthenticated access.

        if (!ctx.state?.user?.id) {
            return next();
        }

        try {
            const adminUser = await resolveAdminUser(ctx, strapi);
            if (!adminUser) return next();

            // Superadmin bypass
            const isSuperAdmin = adminUser.roles?.some((r: any) => r.code === 'strapi-super-admin');
            if (isSuperAdmin) return next();

            // No tenant = no restriction beyond Strapi defaults
            if (!adminUser.tenant) return next();

            const tenantId: number = adminUser.tenant.id;
            const tenantDocumentId: string = adminUser.tenant.documentId;
            const tenantSlug: string = adminUser.tenant.slug;

            // ── Parse content-manager URL to extract targetModelUid and documentId ──
            // URL patterns:
            //   /content-manager/collection-types/{uid}
            //   /content-manager/collection-types/{uid}/{documentId}
            //   /content-manager/single-types/{uid}
            //   /content-manager/relations/{uid}/{field}
            const cleanUrl = url.split('?')[0];
            const urlParts = cleanUrl.split('/').filter(Boolean);

            let targetModelUid = '';
            let documentId = '';

            const collIdx = urlParts.indexOf('collection-types');
            const singleIdx = urlParts.indexOf('single-types');
            const relIdx = urlParts.indexOf('relations');

            if (collIdx !== -1 && urlParts.length > collIdx + 1) {
                targetModelUid = urlParts[collIdx + 1];
                if (urlParts.length > collIdx + 2) {
                    documentId = urlParts[collIdx + 2];
                }
            } else if (singleIdx !== -1 && urlParts.length > singleIdx + 1) {
                targetModelUid = urlParts[singleIdx + 1];
            } else if (relIdx !== -1 && urlParts.length > relIdx + 1) {
                targetModelUid = urlParts[relIdx + 1];
            }

            // If we can't parse a model UID, or Strapi doesn't know this model, pass through
            if (!targetModelUid || !strapi.contentTypes[targetModelUid]) {
                return next();
            }

            const model = strapi.contentTypes[targetModelUid] as any;
            const isTenantScopedModel = !!(model.attributes && model.attributes.tenant);
            const isTenantModel = targetModelUid === 'api::tenant.tenant';

            // ── 2b. HARD BLOCK: Deny access to other tenants' exclusive content types ──
            // This is the primary security gate — runs before any data query.
            if (ALL_EXCLUSIVE_TYPES.includes(targetModelUid) && !isContentTypeAllowed(targetModelUid, tenantSlug)) {
                strapi.log.warn(
                    `[Admin RBAC] BLOCKED ${method} ${targetModelUid} for tenant '${tenantSlug}' (not in allowed list)`
                );
                ctx.status = 403;
                ctx.body = {
                    error: {
                        status: 403,
                        name: 'ForbiddenError',
                        message: 'Access denied: This content type is not available for your tenant.',
                    },
                };
                return; // Do NOT call next()
            }

            // ── 2. Inject tenant filter on list GET requests ───────────────────
            if (method === 'GET' && !documentId) {
                if (!ctx.query) ctx.query = {};
                if (!ctx.query.filters) ctx.query.filters = {};

                if (isTenantScopedModel) {
                    ctx.query.filters.tenant = { id: { $eq: tenantId } };
                    strapi.log.debug(
                        `[Admin RBAC] Injecting tenant filter on GET list ${targetModelUid} for tenant id=${tenantId}`
                    );
                } else if (isTenantModel) {
                    // Restrict tenant admins to only see their own tenant record
                    ctx.query.filters.id = { $eq: tenantId };
                    strapi.log.debug(`[Admin RBAC] Restricting tenant list to id=${tenantId}`);
                }
            }

            // ── 3. Document-level access protection ───────────────────────────
            if (documentId && (isTenantScopedModel || isTenantModel)) {
                const entity = await strapi.db.query(targetModelUid).findOne({
                    where: {
                        documentId,
                        ...(isTenantScopedModel
                            ? { tenant: tenantId }          // content has tenant relation
                            : { id: tenantId }),            // for api::tenant.tenant itself
                    },
                });

                if (!entity) {
                    strapi.log.warn(
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

            // ── 4. Force tenant on write operations ───────────────────────────
            if (['POST', 'PUT', 'PATCH'].includes(method) && isTenantScopedModel) {
                if (!ctx.request.body) ctx.request.body = {};
                // Use documentId for relations in Strapi v5 Document Service
                ctx.request.body.tenant = tenantDocumentId;
                strapi.log.debug(
                    `[Admin RBAC] Forcing tenant documentId=${tenantDocumentId} on ${method} ${targetModelUid}`
                );
            }

        } catch (error) {
            strapi.log.error('[Admin RBAC] Middleware error:', error);
        }

        return next();
    };
};
