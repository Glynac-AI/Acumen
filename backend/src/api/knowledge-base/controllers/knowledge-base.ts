/**
 * Knowledge Base controller
 *
 * Scopes reads to the resolved tenant (injected by tenant-context middleware).
 * Populates tenant relation on all responses.
 */

import { factories } from '@strapi/strapi';

const KB_POPULATE = {
    tenant: { fields: ['name', 'slug'] },
} as const;

// @ts-ignore
export default factories.createCoreController('api::knowledge-base.knowledge-base' as any, () => ({

    async find(ctx: any) {
        const existingFilters = (ctx.query.filters || {}) as Record<string, unknown>;

        if (ctx.state.tenant) {
            ctx.query.filters = {
                ...existingFilters,
                tenant: {
                    documentId: ctx.state.tenant.documentId,
                },
            };
        }

        ctx.query.populate = KB_POPULATE;
        return await super.find(ctx);
    },

    async findOne(ctx: any) {
        const existingFilters = (ctx.query.filters || {}) as Record<string, unknown>;

        if (ctx.state.tenant) {
            ctx.query.filters = {
                ...existingFilters,
                tenant: {
                    documentId: ctx.state.tenant.documentId,
                },
            };
        }

        ctx.query.populate = KB_POPULATE;
        return await super.findOne(ctx);
    },
}));
