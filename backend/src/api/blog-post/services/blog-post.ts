/**
 * blog-post service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::blog-post.blog-post', ({ strapi }) => ({
    /**
     * Custom method to find published blog posts by tenant
     * @param {string} tenantSlug - Tenant slug to filter by
     * @param {object} params - Additional query parameters
     */
    async findPublishedByTenant(tenantSlug: string, params = {}) {
        const tenant = await strapi.db.query('api::tenant.tenant').findOne({
            where: { slug: tenantSlug },
        });

        if (!tenant) {
            return { data: [], meta: {} };
        }

        const entries = await strapi.entityService.findMany('api::blog-post.blog-post', {
            ...params,
            filters: {
                ...params.filters,
                tenant: {
                    id: tenant.id,
                },
                publishedAt: {
                    $notNull: true,
                },
            },
            populate: {
                author: true,
                coverImage: true,
                tenant: {
                    fields: ['name', 'slug'],
                },
            },
        });

        return entries;
    },

    /**
     * Custom method to find a blog post by slug and tenant
     * @param {string} slug - Blog post slug
     * @param {string} tenantSlug - Tenant slug
     */
    async findOneBySlug(slug: string, tenantSlug: string) {
        const tenant = await strapi.db.query('api::tenant.tenant').findOne({
            where: { slug: tenantSlug },
        });

        if (!tenant) {
            return null;
        }

        const entry = await strapi.db.query('api::blog-post.blog-post').findOne({
            where: {
                slug,
                tenant: {
                    id: tenant.id,
                },
                publishedAt: {
                    $notNull: true,
                },
            },
            populate: {
                author: true,
                coverImage: true,
                tenant: {
                    fields: ['name', 'slug'],
                },
            },
        });

        return entry;
    },
}));
