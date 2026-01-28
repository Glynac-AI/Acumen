export default {
    async beforeCreate(event) {
        const { data } = event.params;

        // Auto-assign tenant from context if available
        const eventState = event?.state;
        const tenantContext = eventState?.tenant;

        if (!data.tenant && tenantContext) {
            data.tenant = tenantContext.documentId || tenantContext.id;
        }

        // Normalize subscriptionMethod (Map legacy values to "Email")
        if (data.subscriptionMethod && typeof data.subscriptionMethod === 'string') {
            const invalidMethods = ['Free', 'CreditCard', 'PayPal', 'BankTransfer', 'Manual', 'Cryptocurrency'];
            if (invalidMethods.includes(data.subscriptionMethod)) {
                console.log(`📧 Customer: Normalizing legacy subscriptionMethod from "${data.subscriptionMethod}" to "Email"`);
                data.subscriptionMethod = 'Email';
            }
        }

        // Normalize subscriptionStatus
        if (data.subscriptionStatus && typeof data.subscriptionStatus === 'string') {
            const originalStatus = data.subscriptionStatus;
            let normalizedStatus = originalStatus.toLowerCase().trim();

            if (['unactive', 'inactive', 'unsubscribe', 'unsubscribed', 'canceled', 'cancelled'].includes(normalizedStatus)) {
                normalizedStatus = 'unsubscribed';
            } else if (['active', 'subscribed', 'true', '1'].includes(normalizedStatus)) {
                normalizedStatus = 'subscribed';
            }

            if (normalizedStatus !== data.subscriptionStatus) {
                console.log(`📧 Customer: Normalizing subscriptionStatus from "${data.subscriptionStatus}" to "${normalizedStatus}"`);
                data.subscriptionStatus = normalizedStatus;
            }
        }

        // Default subscriptionStatus
        if (!data.subscriptionStatus) {
            data.subscriptionStatus = 'subscribed'; // Default for customers (or pending, but aligns with others now)
        }

        // Default method
        if (!data.subscriptionMethod) {
            data.subscriptionMethod = 'Email';
        }
    },

    async beforeUpdate(event) {
        const { data } = event.params;

        // Normalize subscriptionStatus if being updated
        if (data.subscriptionStatus && typeof data.subscriptionStatus === 'string') {
            const originalStatus = data.subscriptionStatus;
            let normalizedStatus = originalStatus.toLowerCase().trim();

            if (['unactive', 'inactive', 'unsubscribe', 'unsubscribed', 'canceled', 'cancelled'].includes(normalizedStatus)) {
                normalizedStatus = 'unsubscribed';
            } else if (['active', 'subscribed', 'true', '1'].includes(normalizedStatus)) {
                normalizedStatus = 'subscribed';
            }

            if (normalizedStatus !== data.subscriptionStatus) {
                console.log(`📧 Customer: Normalizing status from "${data.subscriptionStatus}" to "${normalizedStatus}"`);
                data.subscriptionStatus = normalizedStatus;
            }
        }
    },
};
