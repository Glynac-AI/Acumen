/**
 * Playbook controller
 *
 * Scopes reads to the resolved tenant (injected by tenant-context middleware).
 * Populates tenant relation on all responses.
 */

import { factories } from '@strapi/strapi';

const PLAYBOOK_POPULATE = {
    tenant: { fields: ['name', 'slug'] },
} as const;

// @ts-ignore
export default factories.createCoreController('api::playbook.playbook' as any, () => ({

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

        ctx.query.populate = PLAYBOOK_POPULATE;
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

        ctx.query.populate = PLAYBOOK_POPULATE;
        return await super.findOne(ctx);
    },
}));
