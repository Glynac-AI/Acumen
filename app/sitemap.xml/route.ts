import { NextResponse } from 'next/server';
import { generateSitemap } from '@/lib/sitemap';
import { fetchArticles, fetchAuthors, fetchCategories, fetchSubcategories, fetchTags } from '@/lib/api';
import { getPublicPlaybookPages } from '@/lib/knowledge';

export async function GET() {
    try {
        const [articles, authors, categories, subcategories, tags, knowledgePages] = await Promise.all([
            fetchArticles(),
            fetchAuthors(),
            fetchCategories(),
            fetchSubcategories(),
            fetchTags(),
            getPublicPlaybookPages().catch(() => []),
        ]);

        const sitemap = generateSitemap(articles, authors, categories, subcategories, tags, knowledgePages);

        return new NextResponse(sitemap, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour
            },
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return new NextResponse('Error generating sitemap', { status: 500 });
    }
}
