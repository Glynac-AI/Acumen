export default {
    async beforeCreate(event) {
        const { data } = event.params;

        // Debug logging to help diagnose validation issues
        console.log('📧 Newsletter Subscriber beforeCreate hook triggered');
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

        // Ensure status is set to default if not provided
        // IMPORTANT: status must be lowercase to match schema enum values
        if (!data.status) {
            data.status = 'active';
            console.log('📧 Set default status:', data.status);
        } else if (typeof data.status === 'string') {
            // Normalize status to lowercase to prevent validation errors
            const normalizedStatus = data.status.toLowerCase();
            if (normalizedStatus !== data.status) {
                console.log(`📧 Normalizing status from "${data.status}" to "${normalizedStatus}"`);
                data.status = normalizedStatus;
            }
        }

        console.log('📧 Final data before validation:', JSON.stringify(data, null, 2));
    },

    async beforeUpdate(event) {
        const { data } = event.params;

        console.log('📧 Newsletter Subscriber beforeUpdate hook triggered');
        console.log('📧 Update data:', JSON.stringify(data, null, 2));

        // Normalize status if being updated
        if (data.status && typeof data.status === 'string') {
            const normalizedStatus = data.status.toLowerCase();
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
