import type { Core } from '@strapi/strapi';

export default (policyContext: any, config: Record<string, unknown>, { strapi }: { strapi: Core.Strapi }) => {
    const ctx = policyContext;

    // Safety check - ensure ctx and ctx.state exist
    if (!ctx || !ctx.state) {
        strapi.log.warn('is-tenant-scoped: No context or state available');
        return false;
    }

    // Check if this is a Strapi admin panel request
    // Admin panel requests go through content-manager routes and have admin user in state
    const isAdminRequest = ctx.state.user?.roles?.some((role: any) =>
        role.code === 'strapi-super-admin' || role.code === 'strapi-editor' || role.code === 'strapi-author'
    ) || ctx.request?.url?.includes('/content-manager/');

    // Allow admin panel requests to bypass tenant restrictions
    if (isAdminRequest) {
        strapi.log.debug('is-tenant-scoped: Admin request detected, bypassing tenant check');
        return true;
    }

    const isReadOperation = ctx.request?.method === 'GET';
    const isWriteOperation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(ctx.request?.method);
    const hasTenantContext = !!ctx.state.tenant;

    // For write operations from public API, tenant context is REQUIRED
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

