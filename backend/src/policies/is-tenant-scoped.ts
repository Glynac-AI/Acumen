/**
 * Tenant-Scoped Policy
 * 
 * This policy ensures that:
 * 1. Requests have a valid tenant context
 * 2. Queries are automatically filtered by tenant
 * 3. Create/Update operations include the tenant relation
 * 
 * Apply this policy to routes that require tenant isolation.
 */

import type { Core } from '@strapi/strapi';

export default (policyContext: any, config: Record<string, unknown>, { strapi }: { strapi: Core.Strapi }) => {
    const { ctx } = policyContext;

    // Check if tenant context exists
    if (!ctx.state.tenant) {
        return false; // Deny access if no tenant context
    }

    // Inject tenant filter into query params for find operations
    if (ctx.request.method === 'GET') {
        if (!ctx.query.filters) {
            ctx.query.filters = {};
        }
        // Add tenant filter to existing filters
        ctx.query.filters.tenant = {
            documentId: ctx.state.tenant.documentId
        };
    }

    // For create/update operations, ensure tenant is set in request body
    if (['POST', 'PUT', 'PATCH'].includes(ctx.request.method)) {
        if (ctx.request.body && ctx.request.body.data) {
            ctx.request.body.data.tenant = ctx.state.tenant.documentId;
        }
    }

    return true;
};
