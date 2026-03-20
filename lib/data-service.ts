/**
 * Data Service
 * 
 * Unified data access layer that fetches from Strapi CMS.
 * Always attempts to fetch from Strapi first.
 *
 * Also exposes knowledge system functions from lib/knowledge.ts
 * for homepage and knowledge portal components.
 */

import type { Author, Article, Tag, Pillar } from '@/types';
import type { PlaybookPage, Product } from '@/types/knowledge';
import {
    getRecentArticles as getStrapiRecentArticles,
    getFeaturedArticle as getStrapiFeaturedArticle,
    getArticlesByPillar as getStrapiArticlesByPillar,
    getArticleBySlug as getStrapiArticleBySlug,
    getAuthors as getStrapiAuthors,
    getTags as getStrapiTags,
    getPillars as getStrapiPillars,
    transformArticle,
    transformAuthor,
    transformTag,
} from './strapi';
import {
    getPublicPlaybookPages,
    getPublicPlaybookPageBySlug,
    getPublicPagesByProduct,
    getRecentlyUpdatedPages,
    getProductPages,
    getActiveProducts,
    getProductSections,
} from './knowledge';

/**
 * Get the featured article
 */
export async function getFeaturedArticle(): Promise<Article | undefined> {
    try {
        const strapiData = await getStrapiFeaturedArticle();
        if (strapiData) {
            return transformArticle(strapiData);
        }
    } catch (error) {
        console.error('Failed to fetch featured article from Strapi:', error);
    }
    return undefined;
}

/**
 * Get recent articles
 */
export async function getRecentArticles(limit: number = 9): Promise<Article[]> {
    try {
        const strapiData = await getStrapiRecentArticles(limit);
        return strapiData.map(transformArticle);
    } catch (error) {
        console.error('Failed to fetch recent articles from Strapi:', error);
    }
    return [];
}

/**
 * Get articles by pillar
 */
export async function getArticlesByPillar(pillar: Pillar): Promise<Article[]> {
    try {
        // Convert pillar name to slug format for Strapi query
        const pillarSlug = pillar.toLowerCase().replace(/[&\s]+/g, '-');
        const strapiData = await getStrapiArticlesByPillar(pillarSlug);
        return strapiData.map(transformArticle);
    } catch (error) {
        console.error('Failed to fetch articles by pillar from Strapi:', error);
    }
    return [];
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
    try {
        const response = await getStrapiArticleBySlug(slug);
        if (response.data.length > 0) {
            return transformArticle(response.data[0]);
        }
    } catch (error) {
        console.error('Failed to fetch article from Strapi:', error);
    }
    return undefined;
}

/**
 * Get industry insights articles
 */
export async function getIndustryInsightsArticles(limit: number = 3): Promise<Article[]> {
    try {
        const pillarSlug = 'industry-insights';
        const strapiData = await getStrapiArticlesByPillar(pillarSlug);
        return strapiData.slice(0, limit).map(transformArticle);
    } catch (error) {
        console.error('Failed to fetch industry insights from Strapi:', error);
    }
    return [];
}

/**
 * Get all authors
 */
export async function getAuthors(): Promise<Author[]> {
    try {
        const response = await getStrapiAuthors();
        return response.data.map(transformAuthor);
    } catch (error) {
        console.error('Failed to fetch authors from Strapi:', error);
    }
    return [];
}

/**
 * Get all tags
 */
export async function getTags(): Promise<Tag[]> {
    try {
        const response = await getStrapiTags();
        return response.data.map(transformTag);
    } catch (error) {
        console.error('Failed to fetch tags from Strapi:', error);
    }
    return [];
}

/**
 * Get all pillars
 */
export async function getPillars(): Promise<Pillar[]> {
    try {
        const response = await getStrapiPillars();
        // v5: flat objects — no .attributes wrapper
        return response.data.map(p => p.name as Pillar);
    } catch (error) {
        console.error('Failed to fetch pillars from Strapi:', error);
    }
    // Return default pillars if Strapi fails
    return [
        'Compliance & Regulation',
        'Technology & Operations',
        'Practice Management',
        'Client Strategy',
        'Industry Insights',
    ];
}

/**
 * Get all articles
 */
export async function getAllArticles(): Promise<Article[]> {
    try {
        const strapiData = await getStrapiRecentArticles(100);
        return strapiData.map(transformArticle);
    } catch (error) {
        console.error('Failed to fetch all articles from Strapi:', error);
    }
    return [];
}

// ─── Knowledge System Functions ───────────────────────────────────────────────
// These delegate to lib/knowledge.ts which enforces public-live content gates.
// RawMaterial is intentionally NOT exposed here or anywhere in the public layer.

/**
 * Get all publicly live playbook pages.
 */
export async function getLivePlaybookPages(): Promise<PlaybookPage[]> {
    try {
        return await getPublicPlaybookPages();
    } catch (error) {
        console.error('Failed to fetch live playbook pages:', error);
    }
    return [];
}

/**
 * Get a single publicly live playbook page by slug.
 */
export async function getPlaybookPageBySlug(slug: string): Promise<PlaybookPage | undefined> {
    try {
        const page = await getPublicPlaybookPageBySlug(slug);
        return page ?? undefined;
    } catch (error) {
        console.error('Failed to fetch playbook page by slug:', error);
    }
    return undefined;
}

/**
 * Get live playbook pages grouped by product.
 */
export async function getPlaybookPagesByProduct(): Promise<Record<Product, PlaybookPage[]>> {
    try {
        return await getPublicPagesByProduct();
    } catch (error) {
        console.error('Failed to fetch playbook pages by product:', error);
    }
    // Return empty product map
    return {
        'acumen-strategy': [],
        'glynac': [],
        'phh': [],
        'sylvan': [],
        'toll-booth': [],
    };
}

/**
 * Get the most recently updated live playbook pages.
 */
export async function getRecentPlaybookPages(limit: number = 5): Promise<PlaybookPage[]> {
    try {
        return await getRecentlyUpdatedPages(limit);
    } catch (error) {
        console.error('Failed to fetch recent playbook pages:', error);
    }
    return [];
}

/**
 * Get live playbook pages for a specific product.
 */
export async function getPlaybookPagesForProduct(product: Product, limit: number = 10): Promise<PlaybookPage[]> {
    try {
        return await getProductPages(product, limit);
    } catch (error) {
        console.error(`Failed to fetch playbook pages for product ${product}:`, error);
    }
    return [];
}

/**
 * Get products that have at least one live playbook page.
 */
export async function getActiveProductList(): Promise<Product[]> {
    try {
        return await getActiveProducts();
    } catch (error) {
        console.error('Failed to fetch active products:', error);
    }
    return [];
}

/**
 * Get sections within a product that have live playbook pages.
 */
export async function getPlaybookSectionsForProduct(product: Product): Promise<string[]> {
    try {
        return await getProductSections(product);
    } catch (error) {
        console.error(`Failed to fetch sections for product ${product}:`, error);
    }
    return [];
}
