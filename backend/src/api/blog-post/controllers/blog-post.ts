/**
 * blog-post controller
 */

import { factories } from '@strapi/strapi';

// @ts-ignore
export default factories.createCoreController('api::blog-post.blog-post', () => ({
    /**
     * Find blog posts (with tenant filtering)
     */
    async find(ctx) {
        const existingFilters = (ctx.query.filters || {}) as Record<string, unknown>;

        if (ctx.state.tenant) {
            ctx.query.filters = {
                ...existingFilters,
                tenant: {
                    documentId: ctx.state.tenant.documentId,
                },
            };
        }

        // Author is a component, so populate with boolean true.
        ctx.query.populate = {
            author: true,
            coverImage: {
                fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
            },
            tenant: {
                fields: ['name', 'slug'],
            },
        };

        return await super.find(ctx);
    },

    /**
     * Find one blog post by ID
     */
    async findOne(ctx) {
        const existingFilters = (ctx.query.filters || {}) as Record<string, unknown>;

        if (ctx.state.tenant) {
            ctx.query.filters = {
                ...existingFilters,
                tenant: {
                    documentId: ctx.state.tenant.documentId,
                },
            };
        }

        // Author is a component, so populate with boolean true.
        ctx.query.populate = {
            author: true,
            coverImage: {
                fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
            },
            tenant: {
                fields: ['name', 'slug'],
            },
        };

        return await super.findOne(ctx);
    },
}));
