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
    // In Strapi 5, policyContext IS the Koa context directly
    const ctx = policyContext;

    // Safety check - ensure ctx and ctx.state exist
    if (!ctx || !ctx.state) {
        strapi.log.warn('is-tenant-scoped: No context or state available');
        return false;
    }

    // Check if tenant context exists
    if (!ctx.state.tenant) {
        strapi.log.debug('is-tenant-scoped: No tenant context found, denying access');
        return false; // Deny access if no tenant context
    }

    // Inject tenant filter into query params for find operations
    if (ctx.request?.method === 'GET') {
        if (!ctx.query) {
            ctx.query = {};
        }
        if (!ctx.query.filters) {
            ctx.query.filters = {};
        }
        // Add tenant filter to existing filters
        ctx.query.filters.tenant = {
            documentId: ctx.state.tenant.documentId
        };
    }

    // For create/update operations, ensure tenant is set in request body
    if (['POST', 'PUT', 'PATCH'].includes(ctx.request?.method)) {
        if (ctx.request.body && ctx.request.body.data) {
            ctx.request.body.data.tenant = ctx.state.tenant.documentId;
        }
    }

    return true;
};
