import {
    BlogPost,
    BlogPostsResponse,
    BlogPostResponse,
    BlogPostFilters,
    BlogPostPreview,
    toBlogPostPreview,
    searchPosts
} from '../types/blog-post';
import qs from 'qs';

// Configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:5603';

/**
 * Helper function to handle fetch requests with proper error handling and headers.
 */
async function fetchAPI<T>(path: string, urlParamsObject = {}, options = {}): Promise<T> {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        // Server-side only: Use the private token
        if (typeof window === 'undefined' && process.env.STRAPI_API_TOKEN) {
            headers['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
        }

        // Merge default and user options
        const mergedOptions = {
            headers,
            ...options,
        };

        // Build request URL
        const queryString = qs.stringify(urlParamsObject, { arrayFormat: 'brackets' });
        const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

        // Trigger API call
        const response = await fetch(requestUrl, mergedOptions);

        // Handle response
        if (!response.ok) {
            console.error(response.statusText);
            throw new Error(`An error occurred please try again`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Fetch API Error for path ${path}:`, error);
        throw error;
    }
}

/**
 * 1. Get all blog posts with pagination and optional filters.
 * @param page Page number
 * @param pageSize Items per page
 * @param filters Optional filters object
 */
export async function getBlogPosts(
    page = 1,
    pageSize = 10,
    filters: BlogPostFilters = {}
): Promise<BlogPostsResponse> {
    const queryParams = {
        populate: {
            coverImage: true,
            author: true,
        },
        pagination: {
            page,
            pageSize,
        },
        sort: ['publishedAt:desc'],
        filters: {
            ...(filters.category && { category: { $eq: filters.category } }),
        },
    };

    return await fetchAPI<BlogPostsResponse>('/blog-posts', queryParams);
}

/**
 * 2. Get a single blog post by numeric ID.
 * @param id The blog post ID
 */
export async function getBlogPostById(id: number): Promise<BlogPostResponse> {
    const queryParams = {
        populate: {
            coverImage: true,
            author: true,
        },
    };

    return await fetchAPI<BlogPostResponse>(`/blog-posts/${id}`, queryParams);
}

/**
 * 3. Get a single blog post by Slug.
 * @param slug The blog post slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const queryParams = {
        filters: {
            slug: { $eq: slug },
        },
        populate: {
            coverImage: true,
            author: true,
        },
    };

    const response = await fetchAPI<BlogPostsResponse>('/blog-posts', queryParams);

    if (!response.data || response.data.length === 0) {
        return null;
    }

    return response.data[0];
}

/**
 * 4. Get featured blog posts (logic can be customized, currently most recent).
 * @param limit Number of posts to return
 */
export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
    const response = await getBlogPosts(1, limit);
    return response.data;
}

/**
 * 5. Get blog posts by specific category.
 * @param category Category name
 * @param page Page number
 * @param pageSize Items per page
 */
export async function getBlogPostsByCategory(
    category: string,
    page = 1,
    pageSize = 10
): Promise<BlogPostsResponse> {
    return await getBlogPosts(page, pageSize, { category });
}

/**
 * 6. Get blog posts by tag (server-side filtering).
 * @param tag Tag string
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
    const queryParams = {
        populate: {
            coverImage: true,
            author: true,
        },
        filters: {
            tags: {
                $contains: tag
            }
        },
        sort: ['publishedAt:desc'],
    };

    const res = await fetchAPI<BlogPostsResponse>('/blog-posts', queryParams);
    return res.data;
}

/**
 * 7. Get blog posts by author name.
 * @param authorName Author's full name
 */
export async function getBlogPostsByAuthor(authorName: string): Promise<BlogPostsResponse> {
    const queryParams = {
        populate: {
            coverImage: true,
            author: true,
        },
        filters: {
            author: {
                name: { $eq: authorName },
            },
        },
        sort: ['publishedAt:desc'],
    };

    return await fetchAPI<BlogPostsResponse>('/blog-posts', queryParams);
}

/**
 * 8. Get recent blog posts (alias for default get).
 * @param limit Number of posts
 */
export async function getRecentBlogPosts(limit = 5): Promise<BlogPost[]> {
    const response = await getBlogPosts(1, limit);
    return response.data;
}

/**
 * 9. Get unique list of all blog categories.
 */
export async function getBlogCategories(): Promise<string[]> {
    const response = await getBlogPosts(1, 100); // Fetch enough to sample
    const categories = new Set<string>();

    response.data.forEach(post => {
        if (post.attributes.category) {
            categories.add(post.attributes.category);
        }
    });

    return Array.from(categories);
}

/**
 * 10. Get unique list of all blog tags.
 */
export async function getBlogTags(): Promise<string[]> {
    const response = await getBlogPosts(1, 100);
    const tags = new Set<string>();

    response.data.forEach(post => {
        const postTags = post.attributes.tags;
        if (Array.isArray(postTags)) {
            postTags.forEach(tag => tags.add(tag));
        }
    });

    return Array.from(tags).sort();
}

/**
 * 11. Search blog posts.
 * Uses client-side filtering helper for basic search if full-text search backend isn't set up.
 * @param query Search term
 */
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
    const response = await getBlogPosts(1, 100);
    return searchPosts(response.data, query);
}

/**
 * 12. Get related blog posts based on category.
 * Excludes the current post.
 * @param currentPostId ID of the current post
 * @param category Category to match
 * @param limit Limit of related posts
 */
export async function getRelatedBlogPosts(
    currentPostId: number,
    category: string,
    limit = 3
): Promise<BlogPost[]> {
    const response = await getBlogPostsByCategory(category, 1, limit + 1);

    return response.data
        .filter(post => post.id !== currentPostId)
        .slice(0, limit);
}

/**
 * 13. Prefetch all blog post slugs for static site generation.
 */
export async function prefetchBlogPostSlugs(): Promise<string[]> {
    const queryParams = {
        fields: ['slug'],
        pagination: {
            pageSize: 1000,
        },
    };

    const response = await fetchAPI<BlogPostsResponse>('/blog-posts', queryParams);
    return response.data.map(post => post.attributes.slug);
}

/**
 * 14. Get count of posts per category.
 */
export async function getBlogPostCountByCategory(): Promise<Record<string, number>> {
    const response = await getBlogPosts(1, 1000);
    const counts: Record<string, number> = {};

    response.data.forEach(post => {
        const cat = post.attributes.category;
        counts[cat] = (counts[cat] || 0) + 1;
    });

    return counts;
}
