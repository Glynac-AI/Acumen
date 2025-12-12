/**
 * Strapi API Configuration and Utilities
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://strapi.bastion.glynac.ai:1337';
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://strapi.bastion.glynac.ai:1337/api';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Fetch data from Strapi API
 * @param path - API endpoint path (e.g., '/articles', '/articles/1')
 * @param options - Additional fetch options
 */
export async function fetchAPI(path: string, options: RequestInit = {}) {
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
        },
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    const url = `${STRAPI_API_URL}${path}`;

    try {
        const response = await fetch(url, mergedOptions);

        if (!response.ok) {
            console.error(`Strapi API error: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching from Strapi:', error);
        throw error;
    }
}

/**
 * Get the full URL for a Strapi media file
 * @param url - Relative or absolute URL from Strapi
 */
export function getStrapiMedia(url: string | null | undefined): string {
    if (!url) return '';

    // Return the URL as-is if it's already absolute
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // Prepend the Strapi URL for relative URLs
    return `${STRAPI_URL}${url}`;
}

/**
 * Format Strapi API response to get the data
 * Strapi v4 returns data in a nested structure
 */
export function formatStrapiData<T>(response: any): T {
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

/**
 * Helper to build query string for Strapi API
 * @param params - Query parameters
 */
export function buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value !== undefined && value !== null) {
            if (typeof value === 'object') {
                searchParams.append(key, JSON.stringify(value));
            } else {
                searchParams.append(key, String(value));
            }
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
}

// Export base URLs for reference
export { STRAPI_URL, STRAPI_API_URL };
