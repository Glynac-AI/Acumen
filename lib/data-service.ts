/**
 * Data Service
 * 
 * Unified data access layer that fetches from Strapi CMS.
 * Always attempts to fetch from Strapi first.
 */

import type { Author, Article, Tag, Pillar, KnowledgeProductEntry, PlaybookPage } from '@/types';
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
    getProductEntryPoints,
    fetchRecentLivePlaybookPages,
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
        // Strapi v5 returns flat objects — no .attributes wrapper
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

// ─── Knowledge system helpers ───────────────────────────────────────────────────

/**
 * Get the N most recently updated live PlaybookPages.
 * Returns empty array gracefully if the playbook-pages collection
 * does not exist in Strapi yet.
 */
export async function getFeaturedPlaybookPages(
    limit: number = 6
): Promise<PlaybookPage[]> {
    return fetchRecentLivePlaybookPages(limit);
}

/**
 * Get product-level entry points for the knowledge portal homepage section.
 * Each entry represents one product with its live page count and section count.
 * Returns empty array gracefully if no live knowledge pages exist yet.
 */
export async function getKnowledgeEntryPoints(): Promise<KnowledgeProductEntry[]> {
    return getProductEntryPoints();
}
