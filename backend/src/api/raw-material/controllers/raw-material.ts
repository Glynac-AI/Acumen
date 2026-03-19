/**
 * Raw Material controller
 *
 * Scopes reads to the resolved tenant (injected by tenant-context middleware).
 * Populates tenant and file on all responses.
 */

import { factories } from '@strapi/strapi';

const RAW_MATERIAL_POPULATE = {
    file: {
        fields: ['url', 'alternativeText', 'name', 'mime', 'size'],
    },
    tenant: { fields: ['name', 'slug'] },
} as const;

// @ts-ignore
export default factories.createCoreController('api::raw-material.raw-material' as any, () => ({

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

        ctx.query.populate = RAW_MATERIAL_POPULATE;
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

        ctx.query.populate = RAW_MATERIAL_POPULATE;
        return await super.findOne(ctx);
    },
}));
