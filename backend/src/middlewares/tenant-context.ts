/**
 * Tenant Context Middleware
 * 
 * This middleware identifies the tenant from incoming requests and injects
 * the tenant context into the Strapi context for use by policies and controllers.
 * 
 * Tenant identification strategies (in order of priority):
 * 1. Authenticated user's tenant relation (highest priority for RBAC)
 * 2. X-Tenant-Domain header
 * 3. X-Tenant-Slug header
 * 4. Origin header (for browser requests)
 * 5. Referer header fallback
 */

import type { Core } from '@strapi/strapi';

interface TenantContext {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    domain: string;
    isActive: boolean;
}

// Extend Strapi's context state type
declare module 'koa' {
    interface DefaultState {
        tenant?: TenantContext;
    }
}

const extractDomain = (url: string | undefined): string | null => {
    if (!url) return null;
    try {
        const parsed = new URL(url);
        return parsed.hostname;
    } catch {
        return null;
    }
};

export default (config: Record<string, unknown>, { strapi }: { strapi: Core.Strapi }) => {
    return async (ctx: any, next: () => Promise<void>) => {
        // Skip tenant resolution for admin routes
        if (ctx.url.startsWith('/admin') || ctx.url.startsWith('/_health')) {
            return next();
        }

        // ─── Strategy 1: Resolve tenant from authenticated user ────────
        // If the user is logged in and has a tenant relation, use it (RBAC)
        if (ctx.state?.user?.id) {
            try {
                const userWithTenant = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { id: ctx.state.user.id },
                    populate: ['tenant'],
                });

                if (userWithTenant?.tenant) {
                    const t = userWithTenant.tenant;
                    ctx.state.tenant = {
                        id: t.id,
                        documentId: t.documentId,
                        name: t.name,
                        slug: t.slug,
                        domain: t.domain,
                        isActive: t.isActive,
                    } as TenantContext;
                    return next();
                }
            } catch (error) {
                strapi.log.error('Tenant middleware: Error resolving tenant from user:', error);
            }
        }

        // ─── Strategy 2-5: Header-based tenant resolution ──────────────
        const tenantDomain =
            ctx.request.headers['x-tenant-domain'] ||
            ctx.request.headers['x-tenant-slug'] ||
            extractDomain(ctx.request.headers['origin']) ||
            extractDomain(ctx.request.headers['referer']);

        if (!tenantDomain) {
            // Allow requests without tenant for public routes that don't need tenant context
            // Tenant-requiring routes will be protected by the is-tenant-scoped policy
            return next();
        }

        try {
            // Look up tenant by domain or slug
            const tenants = await strapi.documents('api::tenant.tenant').findMany({
                filters: {
                    $or: [
                        { domain: tenantDomain },
                        { slug: tenantDomain }
                    ],
                    isActive: true
                },
                limit: 1
            });

            if (tenants && tenants.length > 0) {
                const tenant = tenants[0];
                ctx.state.tenant = {
                    id: tenant.id,
                    documentId: tenant.documentId,
                    name: tenant.name,
                    slug: tenant.slug,
                    domain: tenant.domain,
                    isActive: tenant.isActive
                } as TenantContext;
            }
        } catch (error) {
            strapi.log.error('Tenant middleware error:', error);
        }

        return next();
    };
};
