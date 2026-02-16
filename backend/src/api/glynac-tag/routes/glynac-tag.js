"use strict";

/**
 * glynac-tag router with tenant-scoped policies
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/glynac-tags',
            handler: 'glynac-tag.find',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'GET',
            path: '/glynac-tags/:id',
            handler: 'glynac-tag.findOne',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'POST',
            path: '/glynac-tags',
            handler: 'glynac-tag.create',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'PUT',
            path: '/glynac-tags/:id',
            handler: 'glynac-tag.update',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'DELETE',
            path: '/glynac-tags/:id',
            handler: 'glynac-tag.delete',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
    ],
};
