/**
 * Author controller
 *
 * Handles tenant-scoped filtering for the shared Author content type.
 *
 * Author is manyToMany with Tenant — one author can belong to multiple
 * tenants. Filtering uses:
 *   filters[tenant][documentId][$eq] = <current tenant documentId>
 * which translates to a JOIN on the authors_tenants_lnk table in Strapi v5.
 *
 * On writes, the current tenant is ADDED to the author's tenants list
 * (not replaced) so cross-tenant authorship is preserved.
 */

import { factories } from '@strapi/strapi';

const AUTHOR_POPULATE = {
    photo: {
        fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
    },
    tenant: {
        fields: ['name', 'slug'],
    },
} as const;

// @ts-ignore
export default factories.createCoreController('api::author.author', () => ({

    async find(ctx: any) {
        // If a tenant is resolved from the request (header / origin),
        // filter authors to only those linked to that tenant.
        if (ctx.state.tenant) {
            const existingFilters = (ctx.query.filters || {}) as Record<string, unknown>;
            ctx.query.filters = {
                ...existingFilters,
                tenant: {
                    documentId: { $eq: ctx.state.tenant.documentId },
                },
            };
        }

        ctx.query.populate = AUTHOR_POPULATE;
        return super.find(ctx);
    },

    async findOne(ctx: any) {
        ctx.query.populate = AUTHOR_POPULATE;
        return super.findOne(ctx);
    },

    async create(ctx: any) {
        // Ensure the current tenant is included in the new author's tenants.
        if (ctx.state.tenant) {
            const body = ctx.request.body?.data || ctx.request.body || {};
            const existingConnect: any[] =
                body.tenant?.connect || [];
            ctx.request.body = {
                ...ctx.request.body,
                data: {
                    ...body,
                    tenant: {
                        connect: [
                            ...existingConnect,
                            { documentId: ctx.state.tenant.documentId },
                        ],
                    },
                },
            };
        }
        ctx.query.populate = AUTHOR_POPULATE;
        return super.create(ctx);
    },

    async update(ctx: any) {
        // On update: do NOT replace tenants — only ensure current tenant is
        // connected. This preserves cross-tenant links set by other admins.
        if (ctx.state.tenant) {
            const body = ctx.request.body?.data || ctx.request.body || {};

            // Fetch current tenant links so we don't lose them
            const existing = await strapi.db.query('api::author.author').findOne({
                where: { documentId: ctx.params.id },
                populate: ['tenant'],
            });

            const existingTenantIds: string[] = (existing?.tenant || [])
                .map((t: any) => t.documentId)
                .filter(Boolean);

            const allTenantIds = Array.from(
                new Set([...existingTenantIds, ctx.state.tenant.documentId])
            );

            ctx.request.body = {
                ...ctx.request.body,
                data: {
                    ...body,
                    tenant: {
                        set: allTenantIds.map(docId => ({ documentId: docId })),
                    },
                },
            };
        }
        ctx.query.populate = AUTHOR_POPULATE;
        return super.update(ctx);
    },
}));
