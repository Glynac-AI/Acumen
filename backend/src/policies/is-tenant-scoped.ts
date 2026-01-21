/**
 * Tenant-Scoped Policy
 * 
 * This policy ensures that:
 * 1. GET requests work publicly (with optional tenant filtering)
 * 2. Write operations require valid tenant context
 * 3. When tenant context exists, queries are filtered by tenant
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

    const isReadOperation = ctx.request?.method === 'GET';
    const isWriteOperation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(ctx.request?.method);
    const hasTenantContext = !!ctx.state.tenant;

    // For write operations, tenant context is REQUIRED
    if (isWriteOperation && !hasTenantContext) {
        strapi.log.debug('is-tenant-scoped: Write operation without tenant context, denying access');
        return false;
    }

    // For read operations without tenant context, allow access (public API)
    if (isReadOperation && !hasTenantContext) {
        strapi.log.debug('is-tenant-scoped: Public read access allowed without tenant context');
        return true;
    }

    // If we have tenant context, apply tenant filtering
    if (hasTenantContext) {
        // Inject tenant filter into query params for find operations
        if (isReadOperation) {
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
    }

    return true;
};

