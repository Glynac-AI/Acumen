/**
 * Author router
 *
 * Read operations: return authors belonging to the current tenant
 * (at least one of their tenants matches the resolved tenant).
 * Write operations: require tenant context.
 *
 * Author is a SHARED content type — one author can belong to multiple
 * tenants. The is-tenant-scoped policy is NOT used here because it injects
 * a strict single-value tenant filter that breaks manyToMany relations.
 * Filtering is handled directly in the author controller instead.
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/authors',
            handler: 'author.find',
            config: {
                auth: false,
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/authors/:id',
            handler: 'author.findOne',
            config: {
                auth: false,
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/authors',
            handler: 'author.create',
            config: {
                policies: [],
            },
        },
        {
            method: 'PUT',
            path: '/authors/:id',
            handler: 'author.update',
            config: {
                policies: [],
            },
        },
        {
            method: 'DELETE',
            path: '/authors/:id',
            handler: 'author.delete',
            config: {
                policies: [],
            },
        },
    ],
};
