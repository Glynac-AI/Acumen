interface SiteConfig {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    email: string;
    links: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    /** Navigation structure for the knowledge system */
    knowledge: {
        /** Whether knowledge routes are enabled */
        enabled: boolean;
        /** Base path for knowledge pages */
        basePath: string;
        /** Label for the knowledge section in navigation */
        navLabel: string;
    };
}

export const siteConfig: SiteConfig = {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'RegulateThis',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
        'Sharp, actionable insights on practice management, wealth management technology, and regulatory compliance.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://regulatethis.com',
    ogImage: process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE || '/opengraph-image.png',
    email: process.env.NEXT_PUBLIC_SITE_EMAIL || 'info@regulatethis.com',
    links: {
        twitter: 'https://twitter.com/regulatethis',
        linkedin: 'https://linkedin.com/company/regulatethis',
    },
    knowledge: {
        enabled: true,
        basePath: '/knowledge',
        navLabel: 'Knowledge',
    },
};

// Helper function to get full URL
export function getBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL;
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    return 'https://regulatethis.com';
}

// Helper to construct full URLs
export function getFullUrl(path: string): string {
    const baseUrl = getBaseUrl();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
}