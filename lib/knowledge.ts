/**
 * lib/knowledge.ts
 *
 * Canonical fetch + transform layer for the PlaybookPage knowledge model.
 *
 * Architecture constraints this file enforces:
 *  - Strapi 5 is the single source of truth
 *  - Wiki.js is read-only; this file never writes to it
 *  - sync is one-way Strapi → Wiki.js
 *  - PlaybookPage is the only public-facing knowledge model
 *  - RawMaterial types are defined here but NO public export exposes raw material data
 *  - `isPublicLive()` is the single reusable lifecycle gate — use it everywhere
 *
 * Wiki path taxonomy: /{product}/{section}/{sub-topic}
 * Naming rules: lowercase, hyphens only, no spaces, no underscores
 */

import type {
    PlaybookPage,
    RawMaterial,
    KnowledgeLifecycleStatus,
    VisibilityGroup,
    KnowledgeProductEntry,
    Tag,
} from '@/types';

// ─── Runtime config ────────────────────────────────────────────────────────────

function getStrapiUrl(): string {
    return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:5603';
}

// ─── Raw Strapi v5 shapes (internal, not exported publicly) ───────────────────

interface StrapiTagFlat {
    id: number;
    documentId?: string;
    name: string;
    slug: string;
}

/**
 * Raw Strapi v5 PlaybookPage record — flat, no .attributes wrapper.
 * Field names match the Strapi schema definition for api::playbook-page.playbook-page
 */
interface StrapiPlaybookPage {
    id: number;
    documentId?: string;
    title: string;
    summary?: string | null;
    content: string;
    product?: string | null;
    section?: string | null;
    wiki_path?: string | null;
    sync_to_wiki: boolean;
    approval_status: KnowledgeLifecycleStatus;
    visibility_groups?: VisibilityGroup[] | null;
    content_owner?: string | null;
    created_by?: string | null;
    last_updated_by?: string | null;
    tags?: StrapiTagFlat[];
    last_reviewed?: string | null;
    review_cadence?: string | null;
    slug?: string | null;
    publishedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Raw Strapi v5 RawMaterial record — INTERNAL ONLY.
 * This type is never returned from any public function.
 */
interface StrapiRawMaterial {
    id: number;
    documentId?: string;
    title: string;
    type?: string | null;
    product?: string | null;
    file?: { url: string } | null;
    external_url?: string | null;
    notes?: string | null;
    sections_to_update?: string[] | null;
    processed: boolean;
    resulting_pages?: string[] | null;
    date?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

interface StrapiListResponse<T> {
    data: T[];
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

// ─── Fetch utility ─────────────────────────────────────────────────────────────

async function fetchKnowledge<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const baseUrl = getStrapiUrl();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (typeof window === 'undefined' && process.env.STRAPI_API_TOKEN) {
        (headers as Record<string, string>)['Authorization'] =
            `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    const url = `${baseUrl}/api${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers,
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(
            `[knowledge] Strapi API error ${response.status} on ${url}: ${response.statusText}`
        );
    }

    return response.json() as Promise<T>;
}

// ─── Lifecycle gate ────────────────────────────────────────────────────────────

/**
 * The single reusable public lifecycle guard.
 *
 * A PlaybookPage is publicly live only when ALL three conditions hold:
 *  1. sync_to_wiki === true    (editorial publish gate)
 *  2. approval_status === 'Live'  (editorial approval)
 *  3. publishedAt !== null     (Strapi draft/publish gate)
 *
 * Use this function everywhere instead of repeating the logic.
 * Never expose content that fails this check on any public route.
 */
export function isPublicLive(page: StrapiPlaybookPage): boolean {
    return (
        page.sync_to_wiki === true &&
        page.approval_status === 'Live' &&
        page.publishedAt !== null &&
        page.publishedAt !== undefined
    );
}

// ─── Visibility guard ──────────────────────────────────────────────────────────

/**
 * Returns true if the page is visible to the given group, or if the page has
 * no visibility restrictions configured (empty array = unrestricted).
 *
 * Full auth enforcement lives at the session/middleware layer.
 * This helper is for data-layer pre-filtering only.
 */
export function isVisibleToGroup(
    page: PlaybookPage,
    group: VisibilityGroup | null
): boolean {
    if (!page.visibility_groups || page.visibility_groups.length === 0) {
        return true; // no restriction configured
    }
    if (!group) return false;
    return page.visibility_groups.includes(group);
}

// ─── Wiki path utilities ───────────────────────────────────────────────────────

/**
 * Normalizes a wiki path segment to the naming rules:
 *   - lowercase only
 *   - hyphens for multi-word segments
 *   - no spaces, no underscores
 *   - no redundant separators
 */
export function normalizeWikiSegment(segment: string): string {
    return segment
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-z0-9-/]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Derives an expected wiki path from product + section + title if wiki_path
 * is not explicitly set. Follows the /{product}/{section}/{sub-topic} pattern.
 */
export function deriveWikiPath(
    product?: string | null,
    section?: string | null,
    title?: string | null
): string {
    const segments = [product, section, title]
        .filter((s): s is string => Boolean(s))
        .map(normalizeWikiSegment)
        .filter(Boolean);
    return '/' + segments.join('/');
}

// ─── Transform ─────────────────────────────────────────────────────────────────

function transformTag(t: StrapiTagFlat): Tag {
    return { id: t.id.toString(), name: t.name, slug: t.slug };
}

function transformPlaybookPage(raw: StrapiPlaybookPage): PlaybookPage {
    return {
        id: raw.id.toString(),
        documentId: raw.documentId,
        title: raw.title,
        summary: raw.summary ?? undefined,
        content: raw.content,
        product: raw.product ?? undefined,
        section: raw.section ?? undefined,
        wiki_path:
            raw.wiki_path ??
            deriveWikiPath(raw.product, raw.section, raw.title),
        sync_to_wiki: raw.sync_to_wiki,
        approval_status: raw.approval_status,
        visibility_groups: raw.visibility_groups ?? [],
        content_owner: raw.content_owner ?? undefined,
        created_by: raw.created_by ?? undefined,
        last_updated_by: raw.last_updated_by ?? undefined,
        tags: raw.tags ? raw.tags.map(transformTag) : [],
        last_reviewed: raw.last_reviewed ?? undefined,
        review_cadence: raw.review_cadence ?? undefined,
        slug: raw.slug ?? undefined,
        publishedAt: raw.publishedAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
    };
}

// ─── Build Strapi filter params for live pages ─────────────────────────────────

function livePagesParams(extra: Record<string, string> = {}): URLSearchParams {
    const params = new URLSearchParams({
        'filters[sync_to_wiki][$eq]': 'true',
        'filters[approval_status][$eq]': 'Live',
        'filters[publishedAt][$notNull]': 'true',
        'populate[0]': 'tags',
        'sort[0]': 'updatedAt:desc',
        ...extra,
    });
    return params;
}

// ─── Public fetch functions ────────────────────────────────────────────────────

/**
 * Fetch live PlaybookPages with optional pagination and product/section filters.
 * Only returns pages that pass `isPublicLive()` — enforced both server-side via
 * query params and client-side via post-filter for safety.
 */
export async function fetchLivePlaybookPages(opts: {
    limit?: number;
    page?: number;
    product?: string;
    section?: string;
} = {}): Promise<PlaybookPage[]> {
    try {
        const extra: Record<string, string> = {};
        if (opts.limit) extra['pagination[pageSize]'] = opts.limit.toString();
        if (opts.page) extra['pagination[page]'] = opts.page.toString();
        if (opts.product) extra['filters[product][$eq]'] = opts.product;
        if (opts.section) extra['filters[section][$eq]'] = opts.section;

        const params = livePagesParams(extra);
        const response = await fetchKnowledge<StrapiListResponse<StrapiPlaybookPage>>(
            `/playbook-pages?${params.toString()}`
        );

        return response.data
            .filter(isPublicLive) // double-check — never trust filters alone
            .map(transformPlaybookPage);
    } catch (error) {
        console.error('[knowledge] fetchLivePlaybookPages failed:', error);
        return [];
    }
}

/**
 * Fetch a single live PlaybookPage by its exact wiki_path.
 * Returns null if the page does not exist or is not publicly live.
 */
export async function fetchPlaybookPageByWikiPath(
    wikiPath: string
): Promise<PlaybookPage | null> {
    try {
        const params = new URLSearchParams({
            'filters[wiki_path][$eq]': wikiPath,
            'filters[publishedAt][$notNull]': 'true',
            'populate[0]': 'tags',
        });

        const response = await fetchKnowledge<StrapiListResponse<StrapiPlaybookPage>>(
            `/playbook-pages?${params.toString()}`
        );

        const raw = response.data.find(isPublicLive);
        return raw ? transformPlaybookPage(raw) : null;
    } catch (error) {
        console.error(
            `[knowledge] fetchPlaybookPageByWikiPath(${wikiPath}) failed:`,
            error
        );
        return null;
    }
}

/**
 * Fetch all live PlaybookPages for a given product slug.
 */
export async function fetchPlaybookPagesByProduct(
    product: string
): Promise<PlaybookPage[]> {
    return fetchLivePlaybookPages({ product, limit: 100 });
}

/**
 * Returns one entry per distinct product that has at least one live page,
 * with the count of live pages and distinct sections per product.
 *
 * Used by the homepage KnowledgeEntrySection to build product nav cards.
 * Returns an empty array gracefully if no playbook-pages collection exists yet.
 */
export async function getProductEntryPoints(): Promise<KnowledgeProductEntry[]> {
    try {
        // Fetch a broad set — enough for homepage aggregation
        const pages = await fetchLivePlaybookPages({ limit: 500 });

        const map = new Map<string, { sections: Set<string>; count: number }>();
        for (const page of pages) {
            const product = page.product;
            if (!product) continue;
            if (!map.has(product)) {
                map.set(product, { sections: new Set(), count: 0 });
            }
            const entry = map.get(product)!;
            entry.count += 1;
            if (page.section) entry.sections.add(page.section);
        }

        return Array.from(map.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([product, { sections, count }]) => ({
                product,
                sectionCount: sections.size,
                pageCount: count,
                slug: normalizeWikiSegment(product),
            }));
    } catch (error) {
        console.error('[knowledge] getProductEntryPoints failed:', error);
        return [];
    }
}

/**
 * Fetch the N most recently updated live PlaybookPages.
 * Suitable for "latest knowledge" sections on the homepage.
 */
export async function fetchRecentLivePlaybookPages(
    limit: number = 6
): Promise<PlaybookPage[]> {
    return fetchLivePlaybookPages({ limit });
}

// ─── RawMaterial — INTERNAL ONLY, no public export ───────────────────────────
//
// The RawMaterial type is defined in types/index.ts for completeness.
// No public function in this file fetches or returns RawMaterial data.
// If internal admin tooling needs raw material access it must use a
// server-side-only route with authentication, never a public page.
//
// The type alias below exists only to satisfy the TypeScript compiler when
// internal utilities reference it — it intentionally produces no runtime code.
type _RawMaterialInternal = RawMaterial; // eslint-disable-line @typescript-eslint/no-unused-vars
type _StrapiRawMaterialInternal = StrapiRawMaterial; // eslint-disable-line @typescript-eslint/no-unused-vars
