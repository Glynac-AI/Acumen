export default {
    async beforeCreate(event) {
        const { data } = event.params;

        // Auto-assign tenant from context if available
        const eventState = event?.state;
        const tenantContext = eventState?.tenant;

        if (!data.tenant && tenantContext) {
            data.tenant = tenantContext.documentId || tenantContext.id;
        }

        // Normalize status
        if (data.status && typeof data.status === 'string') {
            const originalStatus = data.status;
            let normalizedStatus = originalStatus.toLowerCase().trim();

            if (['unactive', 'inactive', 'unsubscribe', 'unsubscribed', 'canceled', 'cancelled'].includes(normalizedStatus)) {
                normalizedStatus = 'unsubscribed';
            } else if (['active', 'subscribed', 'true', '1'].includes(normalizedStatus)) {
                normalizedStatus = 'subscribed';
            }

            if (normalizedStatus !== data.status) {
                console.log(`📧 Customer: Normalizing status from "${data.status}" to "${normalizedStatus}"`);
                data.status = normalizedStatus;
            }
        }

        // Default status
        if (!data.status) {
            data.status = 'subscribed'; // Default for customers (or pending, but aligns with others now)
        }

        // Default method
        if (!data.subscriptionMethod) {
            data.subscriptionMethod = 'Email';
        }
    },

    async beforeUpdate(event) {
        const { data } = event.params;

        // Normalize status if being updated
        if (data.status && typeof data.status === 'string') {
            const originalStatus = data.status;
            let normalizedStatus = originalStatus.toLowerCase().trim();

            if (['unactive', 'inactive', 'unsubscribe', 'unsubscribed', 'canceled', 'cancelled'].includes(normalizedStatus)) {
                normalizedStatus = 'unsubscribed';
            } else if (['active', 'subscribed', 'true', '1'].includes(normalizedStatus)) {
                normalizedStatus = 'subscribed';
            }

            if (normalizedStatus !== data.status) {
                console.log(`📧 Customer: Normalizing status from "${data.status}" to "${normalizedStatus}"`);
                data.status = normalizedStatus;
            }
        }
    },
};
