export default {
    async beforeCreate(event) {
        const { data } = event.params;

        // Debug logging to help diagnose validation issues
        console.log('📧 Regulatethis Subscriber beforeCreate hook triggered');
        console.log('📧 Incoming data:', JSON.stringify(data, null, 2));

        // Safely check for tenant in event state (only available for API requests, not admin panel)
        const eventState = event?.state;
        const tenantContext = eventState?.tenant;
        console.log('📧 Event has state:', !!eventState);
        console.log('📧 Tenant context available:', !!tenantContext);

        // Auto-assign tenant from context if available and not already set
        // Note: Admin panel requests may not have tenant context - this is OK
        if (!data.tenant && tenantContext) {
            // Use documentId for Strapi 5.x (not id)
            data.tenant = tenantContext.documentId || tenantContext.id;
            console.log('📧 Auto-assigned tenant:', data.tenant);
        }

        // Set default subscribedAt if not provided
        if (!data.subscribedAt) {
            data.subscribedAt = new Date().toISOString();
            console.log('📧 Set subscribedAt:', data.subscribedAt);
        }

        // Normalize subscriptionMethod (Map legacy values to "Email")
        if (data.subscriptionMethod && typeof data.subscriptionMethod === 'string') {
            const invalidMethods = ['Free', 'CreditCard', 'PayPal', 'BankTransfer', 'Manual', 'Cryptocurrency'];
            if (invalidMethods.includes(data.subscriptionMethod)) {
                console.log(`📧 Normalizing legacy subscriptionMethod from "${data.subscriptionMethod}" to "Email"`);
                data.subscriptionMethod = 'Email';
            }
        }

        // Normalize status
        if (data.status && typeof data.status === 'string') {
            const originalStatus = data.status;
            let normalizedStatus = originalStatus.toLowerCase().trim();

            if (['unactive', 'inactive', 'unsubscribe', 'unsubscribed'].includes(normalizedStatus)) {
                normalizedStatus = 'unsubscribed';
            } else if (['active', 'subscribed'].includes(normalizedStatus)) {
                normalizedStatus = 'subscribed';
            }

            if (normalizedStatus !== data.status) {
                console.log(`📧 Normalizing status from "${data.status}" to "${normalizedStatus}"`);
                data.status = normalizedStatus;
            }
        }

        // Default status
        if (!data.status) {
            data.status = 'subscribed';
            console.log('📧 Set default status:', data.status);
        }

        console.log('📧 Final data before validation:', JSON.stringify(data, null, 2));
    },

    async beforeUpdate(event) {
        const { data } = event.params;

        console.log('📧 Regulatethis Subscriber beforeUpdate hook triggered');
        console.log('📧 Update data:', JSON.stringify(data, null, 2));

        // Normalize status if being updated
        if (data.status && typeof data.status === 'string') {
            const originalStatus = data.status;
            let normalizedStatus = originalStatus.toLowerCase().trim();

            if (['unactive', 'inactive', 'unsubcribe', 'unsubscribe', 'unsubscribed'].includes(normalizedStatus)) {
                normalizedStatus = 'unsubscribed';
            } else if (['active', 'subscribed'].includes(normalizedStatus)) {
                normalizedStatus = 'subscribed';
            }

            if (normalizedStatus !== data.status) {
                console.log(`📧 Normalizing status from "${data.status}" to "${normalizedStatus}"`);
                data.status = normalizedStatus;
            }
        }

        // If status is being changed to unsubscribed, set unsubscribeAt
        if (data.status === 'unsubscribed' && !data.unsubscribeAt) {
            data.unsubscribeAt = new Date().toISOString();
            console.log('📧 Set unsubscribeAt:', data.unsubscribeAt);
        }
    },
};
