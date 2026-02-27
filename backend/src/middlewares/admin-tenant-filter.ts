/**
 * Admin Tenant Filter Middleware
 * 
 * This middleware intercepts requests to the Strapi Admin Panel (Content Manager)
 * and enforces strict tenant isolation for administrative users assigned to a specific tenant.
 * Superadmins are excluded from these restrictions.
 */

import type { Core } from '@strapi/strapi';

export default (config: Record<string, unknown>, { strapi }: { strapi: Core.Strapi }) => {
    return async (ctx: any, next: () => Promise<void>) => {
        // Only intercept requests to the Content Manager API (Admin Panel operations)
        if (!ctx.url.startsWith('/content-manager/')) {
            return next();
        }

        const isAuthenticatedAdmin = !!ctx.state.user;
        if (!isAuthenticatedAdmin) {
            return next();
        }

        try {
            // Fetch the current admin user to check for tenant assignment and roles
            const adminUser = await strapi.db.query('admin::user').findOne({
                where: { id: ctx.state.user.id },
                populate: ['tenant', 'roles'],
            });

            if (!adminUser) {
                return next();
            }

            // ─── 1. Superadmin Bypass ──────────────────────────────────────
            const isSuperAdmin = adminUser.roles?.some((r: any) => r.code === 'strapi-super-admin');
            if (isSuperAdmin) {
                return next();
            }

            const hasTenantRestriction = !!adminUser.tenant;
            if (hasTenantRestriction) {
                const tenantId = adminUser.tenant.id;

                // Extract target model and optional document ID
                const urlParts = ctx.url.split('?')[0].split('/');
                let targetModelUid = '';
                let documentId = '';

                // Routes: /content-manager/[collection-types|single-types]/[uid](/[documentId])
                const collectionTypesIndex = urlParts.indexOf('collection-types');
                const singleTypesIndex = urlParts.indexOf('single-types');

                if (collectionTypesIndex !== -1 && urlParts.length > collectionTypesIndex + 1) {
                    targetModelUid = urlParts[collectionTypesIndex + 1];
                    if (urlParts.length > collectionTypesIndex + 2) {
                        documentId = urlParts[collectionTypesIndex + 2];
                    }
                } else if (singleTypesIndex !== -1 && urlParts.length > singleTypesIndex + 1) {
                    targetModelUid = urlParts[singleTypesIndex + 1];
                }

                if (!targetModelUid || !strapi.contentTypes[targetModelUid]) {
                    return next();
                }

                const model = strapi.contentTypes[targetModelUid] as any;
                const isTenantScopedModel = !!(model.attributes && model.attributes.tenant);
                const isTenantModel = targetModelUid === 'api::tenant.tenant';

                const method = ctx.request.method;

                // ─── 2. Bulk/List Access Protection (GET) ──────────────────
                if (method === 'GET' && !documentId) {
                    if (!ctx.query) ctx.query = {};
                    if (!ctx.query.filters) ctx.query.filters = {};

                    if (isTenantScopedModel) {
                        ctx.query.filters.tenant = { id: tenantId };
                        strapi.log.debug(`[Admin RBAC] Filtering list ${targetModelUid} for tenant ${tenantId}`);
                    } else if (isTenantModel) {
                        // Restricted admins only see their own tenant record
                        ctx.query.filters.id = tenantId;
                        strapi.log.debug(`[Admin RBAC] Restricting tenant view to id ${tenantId}`);
                    }
                }

                // ─── 3. Single Item Access Protection (Document Level) ──────
                if (documentId && (isTenantScopedModel || isTenantModel)) {
                    // Check if the entity belongs to the user's tenant
                    const entity = await strapi.db.query(targetModelUid).findOne({
                        where: {
                            documentId: documentId,
                            ...(isTenantScopedModel ? { tenant: tenantId } : { id: tenantId })
                        }
                    });

                    if (!entity) {
                        strapi.log.warn(`[Admin RBAC] Blocked ${method} access to ${targetModelUid}:${documentId} for tenant ${tenantId}`);
                        ctx.status = 403;
                        ctx.body = { error: 'Access denied: You do not have permission to access content from other tenants.' };
                        return;
                    }
                }

                // ─── 4. Write Enforcement ──────────────────────────────────
                if (['POST', 'PUT'].includes(method) && isTenantScopedModel) {
                    if (!ctx.request.body) ctx.request.body = {};
                    ctx.request.body.tenant = tenantId;
                    strapi.log.debug(`[Admin RBAC] Enforcing tenant ${tenantId} on write to ${targetModelUid}`);
                }
            }
        } catch (error) {
            strapi.log.error('[Admin Tenant Filter] Middleware Error:', error);
        }

        return next();
    };
};
