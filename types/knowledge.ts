/**
 * Knowledge System Types
 *
 * Defines the PlaybookPage and RawMaterial models aligned with the
 * Strapi + Wiki.js knowledge architecture.
 *
 * Architecture rules:
 * - Strapi 5 is the single source of truth
 * - Wiki.js is the read-only display layer
 * - Sync is one-way: Strapi → Wiki.js
 * - PlaybookPage is the main live knowledge page model
 * - RawMaterial is internal-only source material (never public)
 */

// ─── Visibility Groups ────────────────────────────────────────────────────────

export const VISIBILITY_GROUPS = [
  'sales-team',
  'management',
  'product-acumen-strategy',
  'product-glynac',
  'product-phh',
  'product-sylvan',
  'product-toll-booth',
  'ops',
] as const;

export type VisibilityGroup = (typeof VISIBILITY_GROUPS)[number];

// ─── Approval / Lifecycle Status ──────────────────────────────────────────────

export const APPROVAL_STATUSES = [
  'draft',
  'under-review',
  'approved',
  'live',
  'unpublished',
] as const;

export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number];

// ─── Product Identifiers ──────────────────────────────────────────────────────

export const PRODUCTS = [
  'acumen-strategy',
  'glynac',
  'phh',
  'sylvan',
  'toll-booth',
] as const;

export type Product = (typeof PRODUCTS)[number];

// ─── Review Cadence ───────────────────────────────────────────────────────────

export type ReviewCadence = 'monthly' | 'quarterly' | 'biannual' | 'annual' | 'as-needed';

// ─── Raw Material Type ────────────────────────────────────────────────────────

export type RawMaterialType =
  | 'meeting-notes'
  | 'research'
  | 'email-thread'
  | 'document'
  | 'recording'
  | 'other';

// ─── Wiki Path Utilities ──────────────────────────────────────────────────────

/**
 * Validates a wiki path against the naming rules:
 * - Starts with /
 * - Lowercase only
 * - Hyphens for multi-word segments
 * - No spaces, underscores, or redundant segments
 * - Pattern: /{product}/{section}/{sub-topic}
 */
export function isValidWikiPath(path: string): boolean {
  if (!path || !path.startsWith('/')) return false;
  // lowercase, hyphens, forward slashes only
  if (!/^\/[a-z0-9\-\/]+$/.test(path)) return false;
  // no double slashes or trailing slash
  if (/\/\//.test(path) || (path.length > 1 && path.endsWith('/'))) return false;
  // no underscores
  if (path.includes('_')) return false;
  return true;
}

/**
 * Normalizes a string into a valid wiki path segment.
 */
export function toWikiPathSegment(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-\/]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ─── PlaybookPage — Main Knowledge Page Model ─────────────────────────────────

/**
 * Strapi v5 flat response shape for a PlaybookPage entry.
 * This is what comes back from the Strapi REST API.
 */
export interface StrapiPlaybookPageV5 {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  product: Product;
  section: string;
  wiki_path: string;
  sync_to_wiki: boolean;
  approval_status: ApprovalStatus;
  visibility_groups: VisibilityGroup[];
  content_owner?: string | null;
  created_by?: string | null;
  last_updated_by?: string | null;
  tags?: string[];
  last_reviewed?: string | null;
  review_cadence?: ReviewCadence | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

/**
 * Frontend-ready PlaybookPage after transformation.
 */
export interface PlaybookPage {
  id: string;
  documentId?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  product: Product;
  section: string;
  wikiPath: string;
  syncToWiki: boolean;
  approvalStatus: ApprovalStatus;
  visibilityGroups: VisibilityGroup[];
  contentOwner?: string;
  createdBy?: string;
  lastUpdatedBy?: string;
  tags: string[];
  lastReviewed?: string;
  reviewCadence?: ReviewCadence;
  createdAt: string;
  updatedAt: string;
}

// ─── RawMaterial — Internal Source Material (Never Public) ─────────────────────

/**
 * Strapi v5 flat response shape for a RawMaterial entry.
 */
export interface StrapiRawMaterialV5 {
  id: number;
  documentId?: string;
  title: string;
  type: RawMaterialType;
  product: Product;
  file?: { id: number; url: string; name: string } | null;
  external_url?: string | null;
  notes?: string | null;
  sections_to_update?: string[] | null;
  processed: boolean;
  resulting_pages?: string[] | null;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

/**
 * Frontend-ready RawMaterial after transformation.
 * This type exists for internal admin tooling only.
 * It must NEVER be exposed in public-facing routes or components.
 */
export interface RawMaterial {
  id: string;
  documentId?: string;
  title: string;
  type: RawMaterialType;
  product: Product;
  fileUrl?: string;
  fileName?: string;
  externalUrl?: string;
  notes?: string;
  sectionsToUpdate: string[];
  processed: boolean;
  resultingPages: string[];
  date: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Public Content Filter ────────────────────────────────────────────────────

/**
 * Determines if a PlaybookPage should be visible in public-facing routes.
 *
 * A page is publicly live when:
 * 1. approval_status is 'live'
 * 2. sync_to_wiki is true
 * 3. It is published (publishedAt is set)
 *
 * This is the single reusable gate for all public rendering.
 */
export function isPublicLiveContent(page: StrapiPlaybookPageV5): boolean {
  if (page.approval_status !== 'live') return false;
  if (!page.sync_to_wiki) return false;
  if (!page.publishedAt) return false;
  return true;
}

/**
 * Same filter but for the frontend-transformed type.
 */
export function isLivePlaybookPage(page: PlaybookPage): boolean {
  if (page.approvalStatus !== 'live') return false;
  if (!page.syncToWiki) return false;
  return true;
}

/**
 * Checks if a user with given visibility groups can access a page.
 * If the page has no visibility groups defined, it is accessible to all.
 */
export function canAccessContent(
  page: PlaybookPage,
  userGroups: VisibilityGroup[]
): boolean {
  if (!page.visibilityGroups || page.visibilityGroups.length === 0) return true;
  return page.visibilityGroups.some((g) => userGroups.includes(g));
}

/**
 * Filters a list of pages to only those that are publicly live.
 */
export function filterPublicLivePages(pages: StrapiPlaybookPageV5[]): StrapiPlaybookPageV5[] {
  return pages.filter(isPublicLiveContent);
}

/**
 * Groups playbook pages by product.
 */
export function groupByProduct(pages: PlaybookPage[]): Record<Product, PlaybookPage[]> {
  const grouped = {} as Record<Product, PlaybookPage[]>;
  for (const product of PRODUCTS) {
    grouped[product] = [];
  }
  for (const page of pages) {
    if (grouped[page.product]) {
      grouped[page.product].push(page);
    }
  }
  return grouped;
}

/**
 * Groups playbook pages by section.
 */
export function groupBySection(pages: PlaybookPage[]): Record<string, PlaybookPage[]> {
  const grouped: Record<string, PlaybookPage[]> = {};
  for (const page of pages) {
    const section = page.section || 'general';
    if (!grouped[section]) {
      grouped[section] = [];
    }
    grouped[section].push(page);
  }
  return grouped;
}

/**
 * Extracts the wiki path hierarchy from a set of pages.
 * Returns a tree structure for navigation.
 */
export interface WikiPathNode {
  segment: string;
  fullPath: string;
  pages: PlaybookPage[];
  children: Record<string, WikiPathNode>;
}

export function buildWikiPathTree(pages: PlaybookPage[]): WikiPathNode {
  const root: WikiPathNode = {
    segment: '',
    fullPath: '/',
    pages: [],
    children: {},
  };

  for (const page of pages) {
    const segments = page.wikiPath.split('/').filter(Boolean);
    let current = root;

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      const fullPath = '/' + segments.slice(0, i + 1).join('/');

      if (!current.children[seg]) {
        current.children[seg] = {
          segment: seg,
          fullPath,
          pages: [],
          children: {},
        };
      }
      current = current.children[seg];
    }

    current.pages.push(page);
  }

  return root;
}
