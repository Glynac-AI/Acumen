/**
 * blog-post controller
 */

import { factories } from '@strapi/strapi';

// @ts-ignore
export default factories.createCoreController('api::blog-post.blog-post', () => ({
    /**
     * Find blog posts — author is an embedded component; coverImage is a media relation.
     */
    async find(ctx) {
        // Always populate coverImage and author (component — no data wrapper needed)
        ctx.query.populate = {
            author: true,
            coverImage: {
                fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
            },
        };

        return await super.find(ctx);
    },

    /**
     * Find one blog post by ID
     */
    async findOne(ctx) {
        // Always populate coverImage and author (component — no data wrapper needed)
        ctx.query.populate = {
            author: true,
            coverImage: {
                fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
            },
        };

        return await super.findOne(ctx);
    },
}));
