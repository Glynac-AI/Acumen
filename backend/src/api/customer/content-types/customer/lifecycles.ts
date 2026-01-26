export default {
    async beforeCreate(event) {
        const { data } = event.params;

        // Auto-assign tenant from context if available
        const eventState = event?.state;
        const tenantContext = eventState?.tenant;

        if (!data.tenant && tenantContext) {
            data.tenant = tenantContext.documentId || tenantContext.id;
        }

        // Default status
        if (!data.subscriptionStatus) {
            data.subscriptionStatus = 'Active';
        }

        // Default method
        if (!data.subscriptionMethod) {
            data.subscriptionMethod = 'Free';
        }
    },

    async beforeUpdate(event) {
        // Add specific update logic here if needed
    },
};
