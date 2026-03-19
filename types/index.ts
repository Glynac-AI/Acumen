export interface StrapiData<T> {
    id: number;
    attributes: T;
}

// Category Details Component
export interface CategoryDetail {
    id: string;
    detail: string;
}

// Category (formerly Pillar)
export interface Category {
    id: string;
    name: string;
    slug: string;
    subtitle: string;
    description: string;
    order: number;
    details: CategoryDetail[];
}

// Subcategory
export interface Subcategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    category?: Category;
}

// Author
export interface Author {
    id: string;
    name: string;
    slug?: string;
    title: string;
    bio: string;
    photo: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
    isActive?: boolean;
}

// Tag
export interface Tag {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

// SEO Component
export interface SEO {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    ogImage?: string;
    canonicalURL?: string;
    noIndex?: boolean;
}

// Article Status
export type ArticleStatus = 'Draft' | 'Published' | 'Scheduled' | 'Archived';

// Pillar Name (String Union)
export type PillarName =
    | 'Compliance & Regulation'
    | 'Technology & Operations'
    | 'Practice Management'
    | 'Client Strategy'
    | 'Industry Insights';

// Article
export interface Article {
    id: string;
    title: string;
    subtitle?: string;
    slug: string;
    excerpt: string;
    content: string;
    publishDate: string;
    readTime: number;
    isFeatured: boolean;
    articleStatus: ArticleStatus;
    featuredImage: string;
    author: Author;
    pillar: PillarName;
    subcategories?: Subcategory[];
    tags?: Tag[];
    seo?: SEO;
}

// Blog Post Author Relation (for relational author)
export interface BlogPostAuthorRelation {
    data: StrapiData<Author> | null;
}

// Blog Post
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    readTime: string;
    author: BlogPostAuthorRelation;
    tags?: string[];
    publishDate?: string;
}

// Newsletter Subscriber Status
export type SubscriberStatus = 'Active' | 'Unsubscribed';

// Newsletter Subscriber Source
export type SubscriberSource = 'Homepage' | 'Article_Footer' | 'Sidebar' | 'Popup' | 'Other';

// Newsletter Subscriber
export interface NewsletterSubscriber {
    id: string;
    email: string;
    subscribedAt: string;
    status: SubscriberStatus;
    source?: SubscriberSource;
}

// Legacy export for backwards compatibility
export type Pillar = PillarName;

// ─── Knowledge lifecycle ───────────────────────────────────────────────────────

/**
 * Maps the five-stage editorial lifecycle defined in the Strapi + Wiki.js
 * architecture. Only entries in the 'Live' state with sync_to_wiki = true
 * may appear on public-facing pages.
 */
export type KnowledgeLifecycleStatus =
    | 'Draft'
    | 'Under review'
    | 'Approved'
    | 'Live'
    | 'Unpublished';

// ─── Visibility groups ─────────────────────────────────────────────────────────

/**
 * Visibility groups control which internal teams can see a knowledge page.
 * The data layer reads these; auth enforcement is left to the session layer.
 */
export type VisibilityGroup =
    | 'sales-team'
    | 'management'
    | 'product-acumen-strategy'
    | 'product-glynac'
    | 'product-phh'
    | 'product-sylvan'
    | 'product-toll-booth'
    | 'ops';

// ─── PlaybookPage ──────────────────────────────────────────────────────────────

/**
 * PlaybookPage is the main live knowledge page model in Strapi.
 * Source of truth: Strapi 5 → synced one-way to Wiki.js.
 *
 * A page is publicly live only when:
 *   sync_to_wiki === true  AND  approval_status === 'Live'  AND  publishedAt !== null
 *
 * Use `isPublicLive()` in lib/knowledge.ts to enforce this — do not
 * duplicate the guard in individual pages or components.
 */
export interface PlaybookPage {
    /** Internal Strapi record id */
    id: string;
    documentId?: string;
    title: string;
    /** Short description used as Wiki.js page description */
    summary?: string;
    /** Full page body (markdown or rich text) */
    content: string;
    /** Product this page belongs to — maps to first wiki path segment */
    product?: string;
    /** Section within the product — maps to second wiki path segment */
    section?: string;
    /**
     * Canonical wiki path: /{product}/{section}/{sub-topic}
     * Rules: lowercase, hyphens only, no spaces/underscores
     */
    wiki_path?: string;
    /** True = this entry is allowed to sync to Wiki.js */
    sync_to_wiki: boolean;
    /** Editorial lifecycle stage */
    approval_status: KnowledgeLifecycleStatus;
    /** Access-restriction groups — empty means no restriction configured */
    visibility_groups: VisibilityGroup[];
    /** Who is accountable for this page's content quality */
    content_owner?: string;
    /** Strapi user who originally created the entry */
    created_by?: string;
    /** Strapi user who last modified the entry */
    last_updated_by?: string;
    tags?: Tag[];
    /** ISO date of last editorial review */
    last_reviewed?: string;
    /** How often this page should be reviewed (e.g. 'quarterly') */
    review_cadence?: string;
    slug?: string;
    publishedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

// ─── RawMaterial ───────────────────────────────────────────────────────────────

/**
 * RawMaterial is internal source material only.
 * It MUST NEVER appear in any public route, API response, or UI component.
 * It is defined here so the data layer can type it correctly and explicitly
 * exclude it from any public fetch function.
 */
export interface RawMaterial {
    id: string;
    documentId?: string;
    title: string;
    /** Content type — e.g. 'email', 'call-transcript', 'document' */
    type?: string;
    /** Product this material relates to */
    product?: string;
    /** Uploaded file reference URL */
    file?: string;
    /** External source URL */
    external_url?: string;
    /** Internal editorial notes */
    notes?: string;
    /** Which PlaybookPage sections this material should inform */
    sections_to_update?: string[];
    /** Has this material been processed into knowledge pages? */
    processed: boolean;
    /** Which PlaybookPage documentIds were created from this material */
    resulting_pages?: string[];
    /** Date the material was received or created */
    date?: string;
    createdAt?: string;
    updatedAt?: string;
}

// ─── Knowledge grouped entry point ────────────────────────────────────────────

/** A summary card representing a product's knowledge space on the homepage */
export interface KnowledgeProductEntry {
    product: string;
    sectionCount: number;
    pageCount: number;
    /** Slug-safe product name for routing: e.g. 'product-glynac' */
    slug: string;
}