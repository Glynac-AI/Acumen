/**
 * blog-post router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::blog-post.blog-post', {
    config: {
        find: {
            middlewares: ['api::tenant-context'],
            policies: [],
        },
        findOne: {
            middlewares: ['api::tenant-context'],
            policies: [],
        },
        create: {
            middlewares: ['api::tenant-context'],
            policies: ['admin::isAuthenticatedAdmin'],
        },
        update: {
            middlewares: ['api::tenant-context'],
            policies: ['admin::isAuthenticatedAdmin'],
        },
        delete: {
            middlewares: ['api::tenant-context'],
            policies: ['admin::isAuthenticatedAdmin'],
        },
    },
});
