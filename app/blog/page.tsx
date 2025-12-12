import { fetchAPI, formatStrapiData, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';

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

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

async function getArticles(): Promise<Article[]> {
    try {
        const response = await fetchAPI('/articles?populate=*&sort=publishedAt:desc');
        return formatStrapiData<Article[]>(response);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetchAPI('/categories');
        return formatStrapiData<Category[]>(response);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export default async function BlogPage() {
    const [articles, categories] = await Promise.all([
        getArticles(),
        getCategories(),
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-bold mb-4">Blog</h1>
                    <p className="text-xl text-blue-100">
                        Insights, updates, and thought leadership
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Categories */}
                {categories.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/blog/category/${category.slug}`}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Articles Grid */}
                {articles.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <article
                                key={article.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                {article.coverImage && (
                                    <div className="relative h-56 bg-gray-200">
                                        <Image
                                            src={getStrapiMedia(article.coverImage.url)}
                                            alt={article.coverImage.alternativeText || article.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    {article.category && (
                                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-3">
                                            {article.category.name}
                                        </span>
                                    )}

                                    <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                                        <Link href={`/blog/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                    </h2>

                                    <div
                                        className="text-gray-600 mb-4 line-clamp-3"
                                        dangerouslySetInnerHTML={{
                                            __html: article.content?.substring(0, 150) + '...',
                                        }}
                                    />

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <time dateTime={article.publishedAt}>
                                            {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>

                                        <Link
                                            href={`/blog/${article.slug}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-2xl mx-auto">
                            <h3 className="text-xl font-semibold text-yellow-900 mb-3">
                                No Articles Available
                            </h3>
                            <p className="text-yellow-700 mb-4">
                                Unable to fetch articles from Strapi CMS. This could be because:
                            </p>
                            <ul className="text-left text-yellow-700 space-y-2 mb-6">
                                <li>• Strapi server is not running</li>
                                <li>• Public permissions are not enabled for Articles</li>
                                <li>• No articles have been published yet</li>
                            </ul>
                            <Link
                                href="/test-strapi"
                                className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                            >
                                Test Strapi Connection
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
