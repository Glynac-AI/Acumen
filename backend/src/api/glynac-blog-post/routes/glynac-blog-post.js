"use strict";

/**
 * glynac-blog-post router with tenant-scoped policies
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/glynac-blog-posts',
            handler: 'glynac-blog-post.find',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'GET',
            path: '/glynac-blog-posts/:id',
            handler: 'glynac-blog-post.findOne',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'POST',
            path: '/glynac-blog-posts',
            handler: 'glynac-blog-post.create',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'PUT',
            path: '/glynac-blog-posts/:id',
            handler: 'glynac-blog-post.update',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'DELETE',
            path: '/glynac-blog-posts/:id',
            handler: 'glynac-blog-post.delete',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
    ],
};
