import path from 'path';

export default ({ env }) => {
    const databaseUrl = env('DATABASE_URL');

    // If DATABASE_URL is set, use PostgreSQL (production)
    if (databaseUrl) {
        return {
            connection: {
                client: 'postgres',
                connection: databaseUrl,
                pool: {
                    min: 2,
                    max: 10,
                },
                acquireConnectionTimeout: 60000,
            },
        };
    }

    // Fallback to SQLite for local development
    return {
        connection: {
            client: 'sqlite',
            connection: {
                filename: path.join(__dirname, '..', '..', '.tmp', 'data.db'),
            },
            useNullAsDefault: true,
        },
    };
};
