"use strict";

/**
 * glynac-category router with tenant-scoped policies
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/glynac-categories',
            handler: 'glynac-category.find',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'GET',
            path: '/glynac-categories/:id',
            handler: 'glynac-category.findOne',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'POST',
            path: '/glynac-categories',
            handler: 'glynac-category.create',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'PUT',
            path: '/glynac-categories/:id',
            handler: 'glynac-category.update',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'DELETE',
            path: '/glynac-categories/:id',
            handler: 'glynac-category.delete',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
    ],
};
