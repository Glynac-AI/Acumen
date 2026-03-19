/**
 * Playbook Page router with tenant-scoped policies
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/playbook-pages',
            handler: 'playbook-page.find',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'GET',
            path: '/playbook-pages/:id',
            handler: 'playbook-page.findOne',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'POST',
            path: '/playbook-pages',
            handler: 'playbook-page.create',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'PUT',
            path: '/playbook-pages/:id',
            handler: 'playbook-page.update',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'DELETE',
            path: '/playbook-pages/:id',
            handler: 'playbook-page.delete',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
    ],
};
