import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { BlogContent } from '@/components/blog/BlogContent';
import { fetchCategories, fetchBlogPosts } from '@/lib/api';
import type { Metadata } from 'next';

// Revalidate data every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
    title: 'Blog - Latest Insights | Glynac AI',
    description: 'Sharp analysis on practice management, software, and compliance. Published when we have something worth saying.',
};

function BlogLoading() {
    return (
        <section className="bg-white">
            <Container>
                <div className="py-16 md:py-20">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default async function BlogPage() {
    // Fetch categories and blog posts from Strapi (tenant-scoped via X-Tenant-Slug header)
    const categories = await fetchCategories();
    const allArticles = await fetchBlogPosts();

    return (
        <Suspense fallback={<BlogLoading />}>
            <BlogContent categories={categories} articles={allArticles} />
        </Suspense>
    );
}
