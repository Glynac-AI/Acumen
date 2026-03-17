/**
 * Strapi API Client — Strapi v5 (flat response format)
 *
 * BREAKING CHANGE FROM v4: Strapi v5 returns flat objects — no .attributes
 * wrapper on items and no .data wrapper on relations.
 *
 * v4 (old, broken):
 *   data[0] = { id, attributes: { title, author: { data: { id, attributes: { name, photo: { data: { attributes: { url } } } } } } } }
 *
 * v5 (correct):
 *   data[0] = { id, documentId, title, author: { id, name, title, photo: { id, url } } }
 *
 * Every transform function has been updated to read the flat v5 structure.
 */

// ─── Runtime config ────────────────────────────────────────────────────────────

let runtimeConfig: { strapiUrl: string } | null = null;

async function getRuntimeConfig(): Promise<{ strapiUrl: string }> {
    if (runtimeConfig) return runtimeConfig;

    if (typeof window === 'undefined') {
        runtimeConfig = {
            strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:5603',
        };
        return runtimeConfig;
    }

    try {
        const response = await fetch('/api/config');
        if (response.ok) {
            runtimeConfig = await response.json();
            return runtimeConfig!;
        }
    } catch (error) {
        console.error('Failed to fetch runtime config:', error);
    }

    runtimeConfig = {
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:5603',
    };
    return runtimeConfig;
}

// ─── Base response types ───────────────────────────────────────────────────────

export interface StrapiMeta {
    pagination?: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export interface StrapiResponse<T> {
    data: T;
    meta: StrapiMeta;
}

// Kept for backwards compatibility with blog-post-api.ts / types/blog-post.ts
export interface StrapiData<T> {
    id: number;
    attributes: T;
}

// Kept for backwards compatibility
export interface StrapiMedia {
    id: number;
    attributes: {
        url: string;
        alternativeText: string;
        width: number;
        height: number;
        formats: {
            thumbnail?: { url: string };
            small?: { url: string };
            medium?: { url: string };
            large?: { url: string };
        };
    };
}

// ─── Strapi v5 flat type interfaces ───────────────────────────────────────────

/**
 * Strapi v5 media — flat, no .data/.attributes wrappers.
 * v4: { data: { id, attributes: { url, ... } } }
 * v5: { id, documentId, url, alternativeText, formats, ... }
 */
export interface StrapiMediaV5 {
    id: number;
    documentId?: string;
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
    };
}

/**
 * Strapi v5 Author — flat relation object.
 * v4: { data: { id, attributes: { name, title, photo: { data: { attributes: { url } } } } } }
 * v5: { id, documentId, name, title, photo: { id, url, ... } }
 */
export interface StrapiAuthorV5 {
    id: number;
    documentId?: string;
    name: string;
    slug: string;
    title: string;
    bio: string;
    photo?: StrapiMediaV5 | null;
    linkedin?: string | null;
    twitter?: string | null;
    email?: string | null;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string | null;
}

export interface StrapiTagV5 {
    id: number;
    documentId?: string;
    name: string;
    slug: string;
}

export interface StrapiPillarV5 {
    id: number;
    documentId?: string;
    name: string;
    slug: string;
    description?: string | null;
}

/**
 * Strapi v5 Article — flat, all relations are flat objects not wrapped.
 * v4: { id, attributes: { title, author: { data: {...} }, tags: { data: [...] } } }
 * v5: { id, documentId, title, author: { id, name, ... }, tags: [{ id, name, ... }] }
 */
export interface StrapiArticleV5 {
    id: number;
    documentId?: string;
    title: string;
    subtitle?: string | null;
    slug: string;
    content: unknown;
    excerpt: string;
    publishDate: string;
    readTime: number;
    isFeatured: boolean;
    articleStatus?: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
    author?: StrapiAuthorV5 | null;
    category?: StrapiPillarV5 | null;
    pillar?: StrapiPillarV5 | null;
    tags?: StrapiTagV5[];
    featuredImage?: StrapiMediaV5 | null;
    seo?: {
        id?: number;
        metaTitle?: string | null;
        metaDescription?: string | null;
        keywords?: string | null;
        canonicalURL?: string | null;
        noIndex?: boolean | null;
        ogImage?: StrapiMediaV5 | null;
    } | null;
}

export interface SiteSettingsV5 {
    id?: number;
    documentId?: string;
    siteName: string;
    siteDescription?: string | null;
    gtmId?: string | null;
    gtmEnabled: boolean;
    googleAnalyticsId?: string | null;
    gaEnabled: boolean;
    metaPixelId?: string | null;
    metaPixelEnabled: boolean;
    customHeadScripts?: string | null;
    customBodyScripts?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    keywords?: string | null;
    ogImage?: StrapiMediaV5 | null;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string | null;
}

// Backwards-compat type aliases — keep existing imports working
export type StrapiAuthorAttributes = StrapiAuthorV5;
export type StrapiTagAttributes = StrapiTagV5;
export type StrapiPillarAttributes = StrapiPillarV5;
export type StrapiArticleAttributes = StrapiArticleV5;
export type SiteSettingsAttributes = SiteSettingsV5;

// ─── Imports ───────────────────────────────────────────────────────────────────

import type { Author, Article, Tag, Pillar, PillarName, ArticleStatus } from '@/types';

// ─── Fetch utility ─────────────────────────────────────────────────────────────

async function fetchStrapi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const config = await getRuntimeConfig();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (typeof window === 'undefined' && process.env.STRAPI_API_TOKEN) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    const response = await fetch(`${config.strapiUrl}/api${endpoint}`, {
        ...options,
        headers,
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export function getStrapiMediaUrl(url: string | undefined | null): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const baseUrl = runtimeConfig?.strapiUrl || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:5603';
    return `${baseUrl}${url}`;
}

// ─── Transform functions — Strapi v5 flat format ───────────────────────────────

/**
 * Transform flat Strapi v5 author → frontend Author.
 *
 * FIXED (was v4):  strapiAuthor.attributes.name  /  attrs.photo.data.attributes.url
 * NOW (v5):        strapiAuthor.name              /  strapiAuthor.photo.url
 */
export function transformAuthor(strapiAuthor: StrapiAuthorV5): Author {
    return {
        id: strapiAuthor.id.toString(),
        name: strapiAuthor.name,
        slug: strapiAuthor.slug,
        title: strapiAuthor.title,
        bio: strapiAuthor.bio,
        // v5: photo is { id, url, ... } — no .data or .attributes wrapper
        photo: strapiAuthor.photo?.url
            ? getStrapiMediaUrl(strapiAuthor.photo.url)
            : 'https://placehold.co/400x400/49648C/FFFFFF?text=Author',
        linkedin: strapiAuthor.linkedin ?? undefined,
        twitter: strapiAuthor.twitter ?? undefined,
        email: strapiAuthor.email ?? undefined,
        isActive: strapiAuthor.isActive,
    };
}

/**
 * Transform flat Strapi v5 tag → frontend Tag.
 *
 * FIXED (was v4):  strapiTag.attributes.name
 * NOW (v5):        strapiTag.name
 */
export function transformTag(strapiTag: StrapiTagV5): Tag {
    return {
        id: strapiTag.id.toString(),
        name: strapiTag.name,
        slug: strapiTag.slug,
    };
}

/**
 * Transform flat Strapi v5 pillar → frontend Pillar.
 *
 * FIXED (was v4):  strapiPillar.attributes.name
 * NOW (v5):        strapiPillar.name
 */
export function transformPillar(strapiPillar: StrapiPillarV5): Pillar {
    return strapiPillar.name as Pillar;
}

/**
 * Transform flat Strapi v5 article → frontend Article.
 *
 * All v4→v5 changes:
 *   strapiArticle.attributes.*           → strapiArticle.*
 *   attrs.author?.data                   → strapiArticle.author   (flat, no wrapper)
 *   attrs.tags?.data                     → strapiArticle.tags     (flat array)
 *   attrs.pillar?.data?.attributes.name  → strapiArticle.pillar?.name
 *   attrs.featuredImage?.data?.attributes.url → strapiArticle.featuredImage?.url
 */
export function transformArticle(strapiArticle: StrapiArticleV5): Article {
    // v5: author is a flat object (or null) — no .data wrapper
    const author: Author = strapiArticle.author
        ? transformAuthor(strapiArticle.author)
        : {
            id: '0',
            name: 'Unknown Author',
            title: '',
            bio: '',
            photo: 'https://placehold.co/400x400/49648C/FFFFFF?text=Author',
        };

    if (!strapiArticle.author) {
        console.warn(
            `[strapi] Article "${strapiArticle.title}" (id: ${strapiArticle.id}) has no author linked. ` +
            `Fix: Strapi Admin → Articles → this post → set the Author relation field and Publish it.`
        );
    }

    // v5: tags is a flat array — no .data wrapper
    const tags: Tag[] = strapiArticle.tags
        ? strapiArticle.tags.map(transformTag)
        : [];

    // v5: pillar/category are flat objects — no .data or .attributes wrapper
    let pillar: Pillar = 'Industry Insights';
    if (strapiArticle.pillar?.name) {
        pillar = strapiArticle.pillar.name as PillarName;
    } else if (strapiArticle.category?.name) {
        pillar = strapiArticle.category.name as Pillar;
    }

    // v5: featuredImage is a flat object — no .data or .attributes wrapper
    const featuredImageUrl = strapiArticle.featuredImage?.url
        ? getStrapiMediaUrl(strapiArticle.featuredImage.url)
        : 'https://placehold.co/1200x600/0B1F3B/FFFFFF?text=Article';

    return {
        id: strapiArticle.id.toString(),
        title: strapiArticle.title,
        subtitle: strapiArticle.subtitle ?? undefined,
        slug: strapiArticle.slug,
        content: typeof strapiArticle.content === 'string'
            ? strapiArticle.content
            : JSON.stringify(strapiArticle.content),
        excerpt: strapiArticle.excerpt,
        pillar,
        tags,
        author,
        featuredImage: featuredImageUrl,
        publishDate: strapiArticle.publishDate,
        readTime: strapiArticle.readTime,
        isFeatured: strapiArticle.isFeatured,
        articleStatus: (strapiArticle.articleStatus as ArticleStatus) || 'Published',
    };
}

// ─── API functions ─────────────────────────────────────────────────────────────

export async function getArticles(params?: {
    limit?: number;
    sort?: string;
    filters?: Record<string, unknown>;
    populate?: string | string[];
}): Promise<StrapiResponse<StrapiArticleV5[]>> {
    const searchParams = new URLSearchParams();

    if (params?.limit) searchParams.set('pagination[pageSize]', params.limit.toString());
    if (params?.sort) searchParams.set('sort', params.sort);

    if (params?.populate) {
        if (Array.isArray(params.populate)) {
            params.populate.forEach((p, i) => searchParams.set(`populate[${i}]`, p));
        } else {
            searchParams.set('populate', params.populate);
        }
    } else {
        // Backend article controller (ARTICLE_POPULATE) overrides this anyway
        searchParams.set('populate', '*');
    }

    if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                Object.entries(value as Record<string, unknown>).forEach(([op, val]) => {
                    searchParams.set(`filters[${key}][${op}]`, String(val));
                });
            } else {
                searchParams.set(`filters[${key}]`, String(value));
            }
        });
    }

    const query = searchParams.toString();
    return fetchStrapi(`/articles${query ? `?${query}` : ''}`);
}

export async function getArticleBySlug(slug: string): Promise<StrapiResponse<StrapiArticleV5[]>> {
    const searchParams = new URLSearchParams();
    searchParams.set('filters[slug][$eq]', slug);
    searchParams.set('populate', '*');
    return fetchStrapi(`/articles?${searchParams.toString()}`);
}

export async function getFeaturedArticle(): Promise<StrapiArticleV5 | null> {
    const response = await getArticles({ filters: { isFeatured: { $eq: true } }, limit: 1 });
    return response.data[0] || null;
}

export async function getRecentArticles(limit: number = 9): Promise<StrapiArticleV5[]> {
    const response = await getArticles({ sort: 'publishDate:desc', limit });
    return response.data;
}

export async function getArticlesByPillar(pillarSlug: string): Promise<StrapiArticleV5[]> {
    const response = await getArticles({
        filters: { category: { slug: { $eq: pillarSlug } } },
        sort: 'publishDate:desc',
    });
    return response.data;
}

export async function getAuthors(): Promise<StrapiResponse<StrapiAuthorV5[]>> {
    return fetchStrapi('/authors?populate=*');
}

export async function getTags(): Promise<StrapiResponse<StrapiTagV5[]>> {
    return fetchStrapi('/tags');
}

export async function getPillars(): Promise<StrapiResponse<StrapiPillarV5[]>> {
    return fetchStrapi('/pillars');
}

export async function getSiteSettings(): Promise<SiteSettingsV5 | null> {
    try {
        const response = await fetchStrapi<StrapiResponse<SiteSettingsV5>>(
            '/site-setting?populate=ogImage'
        );
        if (response.data) {
            // v5: response.data is the flat settings object — not response.data.attributes
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch site settings:', error);
        return null;
    }
}
