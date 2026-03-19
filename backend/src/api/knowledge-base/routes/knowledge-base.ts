/**
 * Knowledge Base router with tenant-scoped policies
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/knowledge-bases',
            handler: 'knowledge-base.find',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'GET',
            path: '/knowledge-bases/:id',
            handler: 'knowledge-base.findOne',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'POST',
            path: '/knowledge-bases',
            handler: 'knowledge-base.create',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'PUT',
            path: '/knowledge-bases/:id',
            handler: 'knowledge-base.update',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'DELETE',
            path: '/knowledge-bases/:id',
            handler: 'knowledge-base.delete',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
    ],
};
