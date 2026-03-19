/**
 * Raw Material router with tenant-scoped policies
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/raw-materials',
            handler: 'raw-material.find',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'GET',
            path: '/raw-materials/:id',
            handler: 'raw-material.findOne',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'POST',
            path: '/raw-materials',
            handler: 'raw-material.create',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'PUT',
            path: '/raw-materials/:id',
            handler: 'raw-material.update',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'DELETE',
            path: '/raw-materials/:id',
            handler: 'raw-material.delete',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
    ],
};
