/**
 * blog-post controller
 *
 * Scopes all reads to the resolved tenant (injected by the tenant-context middleware).
 * Each tenant (Glynac AI, RegulateThis, Sylvan, …) only sees its own blog posts.
 *
 * Populate strategy: use relation-level populate objects WITHOUT a `fields` restriction
 * so that Strapi v5 returns all scalar fields on each relation (author name, title, etc).
 * Using `fields: [...]` in Strapi v5 can silently suppress scalars in some versions.
 */

import { factories } from '@strapi/strapi';

// @ts-ignore
export default factories.createCoreController('api::blog-post.blog-post', () => ({

    /**
     * List blog posts — filtered to the resolved tenant when present.
     */
    async find(ctx) {
        const existingFilters = (ctx.query.filters || {}) as Record<string, unknown>;

        // Scope by tenant if resolved by middleware
        if (ctx.state.tenant) {
            ctx.query.filters = {
                ...existingFilters,
                tenant: {
                    documentId: ctx.state.tenant.documentId,
                },
            };
        }

        // Populate author + nested photo without field restrictions
        ctx.query.populate = {
            author: {
                populate: { photo: true },
            },
            coverImage: true,
            tenant: true,
            seo: {
                populate: { ogImage: true },
            },
        };

        return await super.find(ctx);
    },

    /**
     * Get single blog post by ID — filtered to the resolved tenant when present.
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

        ctx.query.populate = {
            author: {
                populate: { photo: true },
            },
            coverImage: true,
            tenant: true,
            seo: {
                populate: { ogImage: true },
            },
        };

        return await super.findOne(ctx);
    },
}));
