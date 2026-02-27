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
        const isContentManager = ctx.url.startsWith('/content-manager/');
        const isPermissions = ctx.url.startsWith('/admin/users/me/permissions');

        // Only intercept requests to the Content Manager API (Admin Panel operations) & Permissions sync
        if (!isContentManager && !isPermissions) {
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
            strapi.log.debug(`[Admin RBAC] User ${adminUser.email} | tenant: ${adminUser.tenant ? JSON.stringify({ id: adminUser.tenant.id, slug: adminUser.tenant.slug }) : 'NONE'}`);

            if (hasTenantRestriction) {
                const tenantId = adminUser.tenant.id;
                const tenantDocumentId = adminUser.tenant.documentId;
                const tenantSlug = adminUser.tenant.slug;

                if (isPermissions) {
                    await next(); // Wait for Strapi's admin plugin to generate permissions

                    if (ctx.response.status === 200 && ctx.body && ctx.body.data) {
                        // Map of tenant slugs to the content-types they own
                        const tenantAllowedTypes: Record<string, string[]> = {
                            'glynac-ai': ['api::blog-post.blog-post'],
                            'regulatethis': ['api::regulatethis-subscriber.regulatethis-subscriber'],
                            'sylvian': ['api::sylvan-request-access.sylvan-request-access']
                        };

                        const allowedModelsForThisTenant = tenantAllowedTypes[tenantSlug] || [];
                        const allTenantSpecificModels = Object.values(tenantAllowedTypes).flat();

                        const originalPermissions = ctx.body.data.permissions || ctx.body.data;
                        const permissionsArray = Array.isArray(originalPermissions) ? originalPermissions : [];

                        const filteredPermissions = permissionsArray.filter((p: any) => {
                            const uid = p.subject;

                            // 1. Hide Tenant collection from non-superadmins
                            if (uid === 'api::tenant.tenant') return false;

                            // 2. If it's a tenant-specific model, only keep it if it belongs to THIS tenant
                            if (uid && allTenantSpecificModels.includes(uid)) {
                                return allowedModelsForThisTenant.includes(uid);
                            }

                            // 3. Keep everything else (like global articles, tags, etc.)
                            return true;
                        });

                        if (Array.isArray(originalPermissions)) {
                            if (ctx.body.data.permissions) {
                                ctx.body.data.permissions = filteredPermissions;
                            } else {
                                ctx.body.data = filteredPermissions;
                            }
                            strapi.log.debug(`[Admin RBAC] Filtered permissions payload for the left menu (Tenant: ${tenantSlug})`);
                        }
                    }
                    return;
                }

                // ─────────────────────────────────────────────────────────────
                // Handling /content-manager/* REST API requests
                // ─────────────────────────────────────────────────────────────

                // Extract target model and optional document ID
                const urlParts = ctx.url.split('?')[0].split('/');
                let targetModelUid = '';
                let documentId = '';

                // Routes: 
                // /content-manager/collection-types/[uid](/[documentId])
                // /content-manager/single-types/[uid]
                // /content-manager/relations/[uid]/[relationName]
                const collectionTypesIndex = urlParts.indexOf('collection-types');
                const singleTypesIndex = urlParts.indexOf('single-types');
                const relationsIndex = urlParts.indexOf('relations');

                if (collectionTypesIndex !== -1 && urlParts.length > collectionTypesIndex + 1) {
                    targetModelUid = urlParts[collectionTypesIndex + 1];
                    if (urlParts.length > collectionTypesIndex + 2) {
                        documentId = urlParts[collectionTypesIndex + 2];
                    }
                } else if (singleTypesIndex !== -1 && urlParts.length > singleTypesIndex + 1) {
                    targetModelUid = urlParts[singleTypesIndex + 1];
                } else if (relationsIndex !== -1 && urlParts.length > relationsIndex + 1) {
                    targetModelUid = urlParts[relationsIndex + 1];
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
                        // Try filtering by both id and documentId to handle both Strapi v4/v5 ORM modes
                        ctx.query.filters.tenant = { id: { $eq: tenantId } };
                        strapi.log.debug(`[Admin RBAC] Filtering list ${targetModelUid} for tenant id=${tenantId} documentId=${tenantDocumentId}`);
                    } else if (isTenantModel) {
                        // Restricted admins only see their own tenant record
                        ctx.query.filters.id = { $eq: tenantId };
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
                        ctx.body = { error: { status: 403, name: 'ForbiddenError', message: 'Access denied: This content does not belong to your tenant.' } };
                        return;
                    }
                }

                // ─── 4. Write Enforcement ──────────────────────────────────
                if (['POST', 'PUT'].includes(method) && isTenantScopedModel) {
                    if (!ctx.request.body) ctx.request.body = {};
                    ctx.request.body.tenant = tenantDocumentId; // Use documentId for writes
                    strapi.log.debug(`[Admin RBAC] Enforcing tenant ${tenantId} on write to ${targetModelUid}`);
                }
            }
        } catch (error) {
            strapi.log.error('[Admin Tenant Filter] Middleware Error:', error);
        }

        return next();
    };
};
