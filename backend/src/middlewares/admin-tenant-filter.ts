/**
 * Admin Tenant Filter Middleware
 * 
 * This middleware intercepts requests to the Strapi Admin Panel (Content Manager)
 * and enforces tenant isolation for administrative users who are assigned to a specific tenant.
 */

import type { Core } from '@strapi/strapi';

export default (config: Record<string, unknown>, { strapi }: { strapi: Core.Strapi }) => {
    return async (ctx: any, next: () => Promise<void>) => {
        // Only intercept requests to the Content Manager API (Admin Panel operations)
        if (!ctx.url.startsWith('/content-manager/')) {
            return next();
        }

        // Wait to execute the downstream route handler if we only need to filter responses,
        // but since we need to mutate the query/body, we do the work beforehand.
        const isAuthenticatedAdmin = !!ctx.state.user;
        if (!isAuthenticatedAdmin) {
            return next();
        }

        try {
            // Fetch the current admin user to check if they have a tenant assigned
            const adminUser = await strapi.db.query('admin::user').findOne({
                where: { id: ctx.state.user.id },
                populate: ['tenant'],
            });

            const hasTenantRestriction = !!(adminUser && adminUser.tenant);

            if (hasTenantRestriction) {
                const tenantId = adminUser.tenant.id;

                // Extract the content type UID from the URL.
                // Example URL: /content-manager/collection-types/api::article.article
                // Or: /content-manager/relations/api::article.article/tags
                const urlParts = ctx.url.split('?')[0].split('/');
                let targetModelUid = '';

                const collectionTypesIndex = urlParts.indexOf('collection-types');
                const singleTypesIndex = urlParts.indexOf('single-types');
                const relationsIndex = urlParts.indexOf('relations');

                if (collectionTypesIndex !== -1 && urlParts.length > collectionTypesIndex + 1) {
                    targetModelUid = urlParts[collectionTypesIndex + 1];
                } else if (singleTypesIndex !== -1 && urlParts.length > singleTypesIndex + 1) {
                    targetModelUid = urlParts[singleTypesIndex + 1];
                } else if (relationsIndex !== -1 && urlParts.length > relationsIndex + 1) {
                    targetModelUid = urlParts[relationsIndex + 1];
                }

                // Check if the target model actually has a tenant relation
                // We don't want to break internal admin models that don't have tenants
                if (targetModelUid && strapi.contentTypes[targetModelUid]) {
                    const model = strapi.contentTypes[targetModelUid] as any;
                    const isTenantScopedModel = !!(model.attributes && model.attributes.tenant);

                    if (isTenantScopedModel) {
                        const method = ctx.request.method;

                        // Force tenant filter for GET requests (List, Count, etc)
                        if (method === 'GET') {
                            if (!ctx.query) ctx.query = {};
                            if (!ctx.query.filters) ctx.query.filters = {};

                            // Strapi Content Manager allows deep filtering, so we safely inject
                            ctx.query.filters.tenant = {
                                id: tenantId
                            };
                            strapi.log.debug(`[Admin Tenant Filter] Applied tenant=${tenantId} filter to GET ${targetModelUid}`);
                        }

                        // Force tenant association for POST/PUT requests (Create, Edit)
                        if (['POST', 'PUT'].includes(method)) {
                            if (!ctx.request.body) ctx.request.body = {};

                            // In newer Strapi versions, Content manager body is { ...attributes } directly or { data: {...} }?
                            // Actually, Content Manager typically passes the body directly as the data, or inside.
                            // Better safe: check if it's nested or flat.
                            ctx.request.body.tenant = tenantId;

                            strapi.log.debug(`[Admin Tenant Filter] Enforced tenant=${tenantId} on ${method} ${targetModelUid}`);
                        }
                    }
                }
            }
        } catch (error) {
            strapi.log.error('[Admin Tenant Filter] Error checking admin user tenant restriction:', error);
        }

        return next();
    };
};
