import { fetchAPI, formatStrapiData, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    coverImage?: {
        url: string;
        alternativeText?: string;
    };
    category?: {
        id: number;
        name: string;
        slug: string;
    };
    createdAt: string;
    publishedAt: string;
}

async function getArticle(slug: string): Promise<Article | null> {
    try {
        const response = await fetchAPI(
            `/articles?filters[slug][$eq]=${slug}&populate=*`
        );
        const articles = formatStrapiData<Article[]>(response);
        return articles[0] || null;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
                    >
                        ← Back to Blog
                    </Link>

                    {article.category && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full mb-4">
                            {article.category.name}
                        </span>
                    )}

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {article.title}
                    </h1>

                    <time
                        dateTime={article.publishedAt}
                        className="text-blue-100"
                    >
                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                </div>
            </div>

            {/* Cover Image */}
            {article.coverImage && (
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                    <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src={getStrapiMedia(article.coverImage.url)}
                            alt={article.coverImage.alternativeText || article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div
                    className="prose prose-lg max-w-none
            prose-headings:text-gray-900 
            prose-p:text-gray-700 
            prose-a:text-blue-600 hover:prose-a:text-blue-800
            prose-strong:text-gray-900
            prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-img:rounded-lg prose-img:shadow-md
          "
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>

            {/* Back to Blog */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    ← Back to Blog
                </Link>
            </div>
        </div>
    );
}

// Generate static params for all articles (optional, for better performance)
export async function generateStaticParams() {
    try {
        const response = await fetchAPI('/articles?fields[0]=slug');
        const articles = formatStrapiData<{ slug: string }[]>(response);

        return articles.map((article) => ({
            slug: article.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}
