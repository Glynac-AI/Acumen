"use strict";

/**
 * glynac-author router with tenant-scoped policies
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/glynac-authors',
            handler: 'glynac-author.find',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'GET',
            path: '/glynac-authors/:id',
            handler: 'glynac-author.findOne',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'POST',
            path: '/glynac-authors',
            handler: 'glynac-author.create',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'PUT',
            path: '/glynac-authors/:id',
            handler: 'glynac-author.update',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'DELETE',
            path: '/glynac-authors/:id',
            handler: 'glynac-author.delete',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
    ],
};
