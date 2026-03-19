/**
 * blog-post router
 *
 * IMPORTANT: `find` and `findOne` now require auth (API token) so Strapi
 * returns populated relations like `author`.  With `auth: false` the request
 * goes through the Public role, which does NOT have permission to populate
 * the Author content type — that's why the author field was always missing.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::blog-post.blog-post' as any, {
    config: {
        find: {
            middlewares: ['global::tenant-context'],
            policies: [],
        },
        findOne: {
            middlewares: ['global::tenant-context'],
            policies: [],
        },
        create: {
            middlewares: ['global::tenant-context'],
            policies: ['admin::isAuthenticatedAdmin'],
        },
        update: {
            middlewares: ['global::tenant-context'],
            policies: ['admin::isAuthenticatedAdmin'],
        },
        delete: {
            middlewares: ['global::tenant-context'],
            policies: ['admin::isAuthenticatedAdmin'],
        },
    },
});
