/**
 * blog-post controller
 */

import { factories } from '@strapi/strapi';

// @ts-ignore
export default factories.createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
    /**
     * Find blog posts (with tenant filtering)
     */
    async find(ctx) {
        // Apply tenant filter if tenant context exists
        if (ctx.state.tenant) {
            ctx.query = {
                ...ctx.query,
                filters: {
                    // @ts-ignore
                    ...(ctx.query.filters || {}),
                    tenant: {
                        id: ctx.state.tenant.id,
                    },
                },
            };
        }

        // Populate author component and other relations
        ctx.query = {
            ...ctx.query,
            populate: {
                author: true,
                coverImage: true,
                tenant: {
                    fields: ['name', 'slug'],
                },
            },
        };

        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },

    /**
     * Find one blog post by ID or slug
     */
    async findOne(ctx) {
        // Apply tenant filter if tenant context exists
        if (ctx.state.tenant) {
            ctx.query = {
                ...ctx.query,
                filters: {
                    // @ts-ignore
                    ...(ctx.query.filters || {}),
                    tenant: {
                        id: ctx.state.tenant.id,
                    },
                },
            };
        }

        // Populate author component and other relations
        ctx.query = {
            ...ctx.query,
            populate: {
                author: true,
                coverImage: true,
                tenant: {
                    fields: ['name', 'slug'],
                },
            },
        };

        const { data, meta } = await super.findOne(ctx);
        return { data, meta };
    },
}));
