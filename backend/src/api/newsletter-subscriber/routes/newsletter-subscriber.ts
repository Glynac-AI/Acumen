/**
 * Newsletter Subscriber router with tenant-scoped policies
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/newsletter-subscribers',
            handler: 'newsletter-subscriber.find',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'GET',
            path: '/newsletter-subscribers/:id',
            handler: 'newsletter-subscriber.findOne',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'POST',
            path: '/newsletter-subscribers',
            handler: 'newsletter-subscriber.create',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'PUT',
            path: '/newsletter-subscribers/:id',
            handler: 'newsletter-subscriber.update',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
        {
            method: 'DELETE',
            path: '/newsletter-subscribers/:id',
            handler: 'newsletter-subscriber.delete',
            config: {
                policies: ['global::is-tenant-scoped'],
            },
        },
    ],
};
