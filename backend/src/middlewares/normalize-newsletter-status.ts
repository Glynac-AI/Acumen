/**
 * Newsletter Status Normalization Middleware
 * 
 * This middleware intercepts Content Manager requests for newsletter-subscriber
 * and normalizes the status field to lowercase BEFORE Strapi's validation runs.
 * 
 * This is necessary because:
 * 1. Content Manager admin panel doesn't use custom API controllers
 * 2. Lifecycle hooks run AFTER validation, so they can't fix invalid data
 * 3. This middleware runs BEFORE validation, allowing us to normalize the data
 */

import type { Core } from '@strapi/strapi';

export default (config: Record<string, unknown>, { strapi }: { strapi: Core.Strapi }) => {
    return async (ctx: any, next: () => Promise<void>) => {
        // Intercept both Content Manager AND API requests for subscriber collections
        const isContentManagerRequest = ctx.url.includes('/content-manager/');
        const isApiRequest = ctx.url.includes('/api/');

        // Check for either collection name
        const isNewsletterRequest = ctx.url.includes('newsletter-subscriber') ||
            ctx.url.includes('regulatethis-subscriber');

        const isWriteRequest = ['POST', 'PUT', 'PATCH'].includes(ctx.request.method);

        // Allow if it's a subscriber request, is a write op, AND is either content manager OR api
        if ((isContentManagerRequest || isApiRequest) && isNewsletterRequest && isWriteRequest) {
            strapi.log.debug('📧 Newsletter middleware: Intercepting Content Manager request');
            strapi.log.debug(`📧 Request URL: ${ctx.url}`);
            strapi.log.debug(`📧 Request method: ${ctx.request.method}`);
            strapi.log.debug(`📧 Request body: ${JSON.stringify(ctx.request.body, null, 2)}`);

            // Normalize status field if present
            if (ctx.request.body?.status && typeof ctx.request.body.status === 'string') {
                const originalStatus = ctx.request.body.status;
                let normalizedStatus = originalStatus.toLowerCase().trim();

                // Map synonyms to "subscribed"
                if (['active', 'true', '1', 'subscribed'].includes(normalizedStatus)) {
                    normalizedStatus = 'subscribed';
                }

                if (originalStatus !== normalizedStatus) {
                    ctx.request.body.status = normalizedStatus;
                    strapi.log.info(`📧 Newsletter middleware: Normalized status from "${originalStatus}" to "${normalizedStatus}"`);
                }
            }

            // Also check for nested data structure (Content Manager may use different formats)
            if (ctx.request.body?.data?.status && typeof ctx.request.body.data.status === 'string') {
                const originalStatus = ctx.request.body.data.status;
                let normalizedStatus = originalStatus.toLowerCase().trim();

                // Map synonyms to "subscribed"
                if (['active', 'true', '1', 'subscribed'].includes(normalizedStatus)) {
                    normalizedStatus = 'subscribed';
                }

                if (originalStatus !== normalizedStatus) {
                    ctx.request.body.data.status = normalizedStatus;
                    strapi.log.info(`📧 Newsletter middleware: Normalized data.status from "${originalStatus}" to "${normalizedStatus}"`);
                }
            }

            strapi.log.debug(`📧 Request body after normalization: ${JSON.stringify(ctx.request.body, null, 2)}`);
        }

        return next();
    };
};
