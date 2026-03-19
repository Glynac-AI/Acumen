/**
 * Playbook router with tenant-scoped policies
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/playbooks',
            handler: 'playbook.find',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'GET',
            path: '/playbooks/:id',
            handler: 'playbook.findOne',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'POST',
            path: '/playbooks',
            handler: 'playbook.create',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'PUT',
            path: '/playbooks/:id',
            handler: 'playbook.update',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'DELETE',
            path: '/playbooks/:id',
            handler: 'playbook.delete',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
    ],
};
