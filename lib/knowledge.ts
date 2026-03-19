/**
 * Knowledge Service
 *
 * Unified data access layer for the PlaybookPage knowledge system.
 * Reuses the Strapi fetch utility from lib/strapi.ts.
 *
 * Architecture rules enforced here:
 * - Public routes ONLY see pages where approval_status=live AND sync_to_wiki=true
 * - RawMaterial is NEVER fetched or exposed through this module
 * - Visibility group filtering is prepared but requires auth context
 */

import type { StrapiResponse, StrapiMeta } from './strapi';
import type {
  StrapiPlaybookPageV5,
  PlaybookPage,
  Product,
  ApprovalStatus,
  VisibilityGroup,
  ReviewCadence,
} from '@/types/knowledge';
import {
  isPublicLiveContent,
  filterPublicLivePages,
  groupByProduct,
  groupBySection,
} from '@/types/knowledge';

// ─── Runtime config (mirrors strapi.ts pattern) ──────────────────────────────

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

// ─── Fetch utility (consistent with strapi.ts) ──────────────────────────────

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
    (headers as Record<string, string>)['Authorization'] =
      `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG;
  if (typeof window === 'undefined' && tenantSlug) {
    (headers as Record<string, string>)['X-Tenant-Slug'] = tenantSlug;
  }

  const response = await fetch(`${config.strapiUrl}/api${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `Strapi API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// ─── Transform: Strapi v5 flat → frontend PlaybookPage ─────────────────────

export function transformPlaybookPage(
  raw: StrapiPlaybookPageV5
): PlaybookPage {
  return {
    id: raw.id.toString(),
    documentId: raw.documentId,
    title: raw.title,
    slug: raw.slug,
    summary: raw.summary || '',
    content: typeof raw.content === 'string' ? raw.content : JSON.stringify(raw.content),
    product: raw.product,
    section: raw.section,
    wikiPath: raw.wiki_path,
    syncToWiki: raw.sync_to_wiki,
    approvalStatus: raw.approval_status,
    visibilityGroups: Array.isArray(raw.visibility_groups)
      ? (raw.visibility_groups as VisibilityGroup[])
      : [],
    contentOwner: raw.content_owner ?? undefined,
    createdBy: raw.created_by ?? undefined,
    lastUpdatedBy: raw.last_updated_by ?? undefined,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    lastReviewed: raw.last_reviewed ?? undefined,
    reviewCadence: (raw.review_cadence as ReviewCadence) ?? undefined,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

// ─── Public API: PlaybookPage fetchers ──────────────────────────────────────

/**
 * Fetch all publicly live playbook pages.
 * Applies server-side filters for approval_status=live and sync_to_wiki=true,
 * then double-checks client-side with isPublicLiveContent.
 */
export async function getPublicPlaybookPages(params?: {
  product?: Product;
  section?: string;
  limit?: number;
}): Promise<PlaybookPage[]> {
  const searchParams = new URLSearchParams();

  // Server-side filters for live content
  searchParams.set('filters[approval_status][$eq]', 'live');
  searchParams.set('filters[sync_to_wiki][$eq]', 'true');
  searchParams.set('filters[publishedAt][$notNull]', 'true');
  searchParams.set('sort', 'updatedAt:desc');
  searchParams.set('populate', '*');

  if (params?.product) {
    searchParams.set('filters[product][$eq]', params.product);
  }
  if (params?.section) {
    searchParams.set('filters[section][$eq]', params.section);
  }
  if (params?.limit) {
    searchParams.set('pagination[pageSize]', params.limit.toString());
  } else {
    searchParams.set('pagination[pageSize]', '100');
  }

  try {
    const response = await fetchStrapi<StrapiResponse<StrapiPlaybookPageV5[]>>(
      `/playbook-pages?${searchParams.toString()}`
    );

    // Double-check: client-side filter to ensure nothing leaks
    const livePages = filterPublicLivePages(response.data);
    return livePages.map(transformPlaybookPage);
  } catch (error) {
    console.error('Failed to fetch public playbook pages:', error);
    return [];
  }
}

/**
 * Fetch a single playbook page by slug.
 * Enforces public-live gate.
 */
export async function getPublicPlaybookPageBySlug(
  slug: string
): Promise<PlaybookPage | null> {
  const searchParams = new URLSearchParams();
  searchParams.set('filters[slug][$eq]', slug);
  searchParams.set('filters[approval_status][$eq]', 'live');
  searchParams.set('filters[sync_to_wiki][$eq]', 'true');
  searchParams.set('filters[publishedAt][$notNull]', 'true');
  searchParams.set('populate', '*');

  try {
    const response = await fetchStrapi<StrapiResponse<StrapiPlaybookPageV5[]>>(
      `/playbook-pages?${searchParams.toString()}`
    );

    if (!response.data || response.data.length === 0) return null;

    const page = response.data[0];
    if (!isPublicLiveContent(page)) return null;

    return transformPlaybookPage(page);
  } catch (error) {
    console.error(`Failed to fetch playbook page by slug: ${slug}`, error);
    return null;
  }
}

/**
 * Fetch a playbook page by wiki_path.
 * Enforces public-live gate.
 */
export async function getPublicPlaybookPageByWikiPath(
  wikiPath: string
): Promise<PlaybookPage | null> {
  const searchParams = new URLSearchParams();
  searchParams.set('filters[wiki_path][$eq]', wikiPath);
  searchParams.set('filters[approval_status][$eq]', 'live');
  searchParams.set('filters[sync_to_wiki][$eq]', 'true');
  searchParams.set('filters[publishedAt][$notNull]', 'true');
  searchParams.set('populate', '*');

  try {
    const response = await fetchStrapi<StrapiResponse<StrapiPlaybookPageV5[]>>(
      `/playbook-pages?${searchParams.toString()}`
    );

    if (!response.data || response.data.length === 0) return null;

    const page = response.data[0];
    if (!isPublicLiveContent(page)) return null;

    return transformPlaybookPage(page);
  } catch (error) {
    console.error(
      `Failed to fetch playbook page by wiki path: ${wikiPath}`,
      error
    );
    return null;
  }
}

/**
 * Get all public live pages grouped by product.
 * Used for the homepage knowledge entry points.
 */
export async function getPublicPagesByProduct(): Promise<
  Record<Product, PlaybookPage[]>
> {
  const pages = await getPublicPlaybookPages();
  return groupByProduct(pages);
}

/**
 * Get all public live pages grouped by section.
 */
export async function getPublicPagesBySection(): Promise<
  Record<string, PlaybookPage[]>
> {
  const pages = await getPublicPlaybookPages();
  return groupBySection(pages);
}

/**
 * Get the most recently updated live playbook pages.
 */
export async function getRecentlyUpdatedPages(
  limit: number = 5
): Promise<PlaybookPage[]> {
  return getPublicPlaybookPages({ limit });
}

/**
 * Get featured/latest live pages for a specific product.
 */
export async function getProductPages(
  product: Product,
  limit: number = 10
): Promise<PlaybookPage[]> {
  return getPublicPlaybookPages({ product, limit });
}

/**
 * Get all distinct products that have at least one live page.
 */
export async function getActiveProducts(): Promise<Product[]> {
  const byProduct = await getPublicPagesByProduct();
  return (Object.entries(byProduct) as [Product, PlaybookPage[]][])
    .filter(([, pages]) => pages.length > 0)
    .map(([product]) => product);
}

/**
 * Get all distinct sections for a given product that have at least one live page.
 */
export async function getProductSections(
  product: Product
): Promise<string[]> {
  const pages = await getPublicPlaybookPages({ product });
  const sections = new Set(pages.map((p) => p.section));
  return Array.from(sections).sort();
}

// ─── Visibility-aware filtering (ready for auth integration) ────────────────

/**
 * Filter pages by user visibility groups.
 * Pass the user's groups from auth context.
 * If userGroups is empty/undefined, only pages with no visibility restrictions are shown.
 */
export function filterByVisibility(
  pages: PlaybookPage[],
  userGroups?: VisibilityGroup[]
): PlaybookPage[] {
  if (!userGroups || userGroups.length === 0) {
    // No auth context: only show pages with no visibility restrictions
    return pages.filter(
      (p) => !p.visibilityGroups || p.visibilityGroups.length === 0
    );
  }

  return pages.filter((p) => {
    if (!p.visibilityGroups || p.visibilityGroups.length === 0) return true;
    return p.visibilityGroups.some((g) => userGroups.includes(g));
  });
}

// ─── Product display helpers ────────────────────────────────────────────────

const PRODUCT_LABELS: Record<Product, string> = {
  'acumen-strategy': 'Acumen Strategy',
  glynac: 'Glynac',
  phh: 'PHH',
  sylvan: 'Sylvan',
  'toll-booth': 'Toll Booth',
};

export function getProductLabel(product: Product): string {
  return PRODUCT_LABELS[product] || product;
}

export { groupByProduct, groupBySection } from '@/types/knowledge';
