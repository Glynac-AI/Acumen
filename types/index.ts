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
    slug: string;
    title: string;
    bio: string;
    photo: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
    isActive: boolean;
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
    category: Category;
    subcategories: Subcategory[];
    tags?: Tag[];
    seo?: SEO;
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
export type Pillar = Category;