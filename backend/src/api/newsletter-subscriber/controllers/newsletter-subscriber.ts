/**
 * newsletter-subscriber controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::newsletter-subscriber.newsletter-subscriber', ({ strapi }) => ({
    /**
     * Override create method to normalize status BEFORE validation
     * This fixes the validation error by ensuring the status field matches
     * the schema's lowercase enum values before Strapi's validator checks it
     */
    async create(ctx) {
        // Normalize status to lowercase if provided
        if (ctx.request.body?.data?.status) {
            const originalStatus = ctx.request.body.data.status;
            ctx.request.body.data.status = originalStatus.toLowerCase();

            strapi.log.debug(`Newsletter Subscriber: Normalized status from "${originalStatus}" to "${ctx.request.body.data.status}"`);
        }

        // Call the default create method (validation will now pass)
        const response = await super.create(ctx);
        return response;
    },

    /**
     * Override update method to normalize status BEFORE validation
     */
    async update(ctx) {
        // Normalize status to lowercase if being updated
        if (ctx.request.body?.data?.status) {
            const originalStatus = ctx.request.body.data.status;
            ctx.request.body.data.status = originalStatus.toLowerCase();

            strapi.log.debug(`Newsletter Subscriber: Normalized status from "${originalStatus}" to "${ctx.request.body.data.status}"`);
        }

        // Call the default update method (validation will now pass)
        const response = await super.update(ctx);
        return response;
    }
}));
