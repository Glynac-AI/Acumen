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
            ctx.url.includes('regulatethis-subscriber') ||
            ctx.url.includes('customer');

        const isWriteRequest = ['POST', 'PUT', 'PATCH'].includes(ctx.request.method);

        // Allow if it's a subscriber request, is a write op, AND is either content manager OR api
        if ((isContentManagerRequest || isApiRequest) && isNewsletterRequest && isWriteRequest) {
            strapi.log.debug('📧 Newsletter middleware: Intercepting Content Manager request');
            strapi.log.debug(`📧 Request URL: ${ctx.url}`);
            strapi.log.debug(`📧 Request method: ${ctx.request.method}`);
            strapi.log.debug(`📧 Request body: ${JSON.stringify(ctx.request.body, null, 2)}`);

            // Helper to normalize a specific field
            const normalizeField = (body: any, fieldName: string, targetValue: string, validSynonyms: string[]) => {
                if (body && body[fieldName] !== undefined) {
                    const originalValue = String(body[fieldName]); // Convert/Cast to string (handles boolean/number)
                    const normalizedInput = originalValue.toLowerCase().trim();

                    if (validSynonyms.includes(normalizedInput)) {
                        body[fieldName] = targetValue;
                        strapi.log.info(`📧 Middleware: Normalized ${fieldName} from "${originalValue}" to "${targetValue}"`);
                    }
                }
            };

            // Unified Status Handling for ALL collections (Newsletter, Regulatethis, Customer)
            // They all use 'status' now, and map 'active' -> 'subscribed'
            const subscriberSynonyms = ['active', 'true', '1', 'subscribed'];

            normalizeField(ctx.request.body, 'status', 'subscribed', subscriberSynonyms);
            if (ctx.request.body?.data) {
                normalizeField(ctx.request.body.data, 'status', 'subscribed', subscriberSynonyms);
            }

            strapi.log.debug(`📧 Request body after normalization: ${JSON.stringify(ctx.request.body, null, 2)}`);
        }

        return next();
    };
};
