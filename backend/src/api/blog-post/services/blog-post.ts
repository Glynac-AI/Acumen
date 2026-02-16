/**
 * blog-post service
 */

import { factories } from '@strapi/strapi';

interface FindPublishedParams {
    filters?: Record<string, any>;
    sort?: string | string[];
    pagination?: {
        page?: number;
        pageSize?: number;
        start?: number;
        limit?: number;
    };
    populate?: any;
}

export default factories.createCoreService('api::blog-post.blog-post', ({ strapi }) => ({
    /**
     * Custom method to find published blog posts by tenant
     */
    async findPublishedByTenant(tenantSlug: string, params: FindPublishedParams = {}) {
        const tenant = await strapi.db.query('api::tenant.tenant').findOne({
            where: { slug: tenantSlug },
        });

        if (!tenant) {
            return { data: [], meta: {} };
        }

        const entries = await strapi.entityService.findMany('api::blog-post.blog-post', {
            ...params,
            filters: {
                ...(params.filters || {}),
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
