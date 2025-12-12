'use client';

import { useState, useEffect } from 'react';

interface UseStrapiOptions {
    initialData?: any;
    revalidate?: boolean;
}

/**
 * React hook for fetching data from Strapi API
 * Can be used in Client Components
 * 
 * @param endpoint - Strapi API endpoint (e.g., '/articles')
 * @param options - Optional configuration
 * @returns Object with data, loading state, and error
 */
export function useStrapi<T = any>(
    endpoint: string | null,
    options: UseStrapiOptions = {}
) {
    const { initialData = null, revalidate = false } = options;

    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Skip if no endpoint provided
        if (!endpoint) {
            setLoading(false);
            return;
        }

        // Skip if we have initial data and don't want to revalidate
        if (initialData && !revalidate) {
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://strapi.bastion.glynac.ai:1337/api';
                const response = await fetch(`${strapiUrl}${endpoint}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }

                const json = await response.json();

                if (!cancelled) {
                    // Format the data (Strapi v4 format)
                    const formattedData = formatResponse<T>(json);
                    setData(formattedData);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error('Unknown error'));
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        // Cleanup function
        return () => {
            cancelled = true;
        };
    }, [endpoint, revalidate, initialData]);

    return { data, loading, error };
}

/**
 * Format Strapi v4 API response
 */
function formatResponse<T>(response: any): T {
    if (!response) return response;

    // Handle array responses
    if (response.data && Array.isArray(response.data)) {
        return response.data.map((item: any) => ({
            id: item.id,
            ...item.attributes,
        })) as T;
    }

    // Handle single object responses
    if (response.data && response.data.attributes) {
        return {
            id: response.data.id,
            ...response.data.attributes,
        } as T;
    }

    return response as T;
}
