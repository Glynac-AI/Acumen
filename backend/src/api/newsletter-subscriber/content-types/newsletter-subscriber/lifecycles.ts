export default {
    async beforeCreate(event) {
        const { data } = event.params;

        // Auto-assign tenant from context if available and not already set
        if (!data.tenant && event.state?.tenant) {
            data.tenant = event.state.tenant.id;
        }

        // Set default subscribedAt if not provided
        if (!data.subscribedAt) {
            data.subscribedAt = new Date().toISOString();
        }

        // Ensure status is set to default if not provided
        if (!data.status) {
            data.status = 'active';
        }
    },

    async beforeUpdate(event) {
        const { data } = event.params;

        // If status is being changed to unsubscribed, set unsubscribeAt
        if (data.status === 'unsubscribed' && !data.unsubscribeAt) {
            data.unsubscribeAt = new Date().toISOString();
        }
    },
};
