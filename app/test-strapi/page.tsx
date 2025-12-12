import { fetchAPI, formatStrapiData, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';

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
        name: string;
        slug: string;
    };
    createdAt: string;
}

export default async function TestStrapiPage() {
    let articles: Article[] = [];
    let error: string | null = null;
    let connectionTest = null;

    // Test 1: Connection test
    try {
        const testResponse = await fetch('http://strapi.bastion.glynac.ai:1337');
        connectionTest = {
            success: testResponse.ok,
            status: testResponse.status,
            statusText: testResponse.statusText,
        };
    } catch (err) {
        connectionTest = {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error',
        };
    }

    // Test 2: Fetch articles
    try {
        const response = await fetchAPI('/articles?populate=*');
        articles = formatStrapiData<Article[]>(response);
    } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Strapi Integration Test
                    </h1>
                    <p className="text-lg text-gray-600">
                        Testing connection to Strapi CMS
                    </p>
                </div>

                {/* Connection Status */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Connection Status</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Status:</span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${connectionTest?.success
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {connectionTest?.success ? '✓ Connected' : '✗ Failed'}
                            </span>
                        </div>
                        <div className="text-sm text-gray-600">
                            <strong>URL:</strong> http://strapi.bastion.glynac.ai:1337
                        </div>
                        {connectionTest?.status && (
                            <div className="text-sm text-gray-600">
                                <strong>HTTP Status:</strong> {connectionTest.status} -{' '}
                                {connectionTest.statusText}
                            </div>
                        )}
                        {connectionTest?.error && (
                            <div className="text-sm text-red-600">
                                <strong>Error:</strong> {connectionTest.error}
                            </div>
                        )}
                    </div>
                </div>

                {/* Articles Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-6">Articles from Strapi</h2>

                    {error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h3 className="text-red-800 font-semibold mb-2">
                                Failed to fetch articles
                            </h3>
                            <p className="text-red-600 text-sm">{error}</p>
                            <div className="mt-4 text-sm text-gray-600">
                                <strong>Troubleshooting:</strong>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>Verify Strapi is running on Digital Ocean</li>
                                    <li>Check port 1337 is open in firewall</li>
                                    <li>Ensure public permissions are enabled for Articles</li>
                                </ul>
                            </div>
                        </div>
                    ) : articles.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <article
                                    key={article.id}
                                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    {article.coverImage && (
                                        <div className="relative h-48 bg-gray-200">
                                            <Image
                                                src={getStrapiMedia(article.coverImage.url)}
                                                alt={article.coverImage.alternativeText || article.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        {article.category && (
                                            <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded mb-2">
                                                {article.category.name}
                                            </span>
                                        )}
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2">
                                            Slug: {article.slug}
                                        </p>
                                        <div
                                            className="text-gray-700 line-clamp-3"
                                            dangerouslySetInnerHTML={{
                                                __html: article.content?.substring(0, 150) + '...',
                                            }}
                                        />
                                        <p className="text-xs text-gray-400 mt-3">
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            <p className="text-lg">No articles found</p>
                            <p className="text-sm mt-2">
                                Create some articles in your Strapi admin panel
                            </p>
                        </div>
                    )}
                </div>

                {/* API Information */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        📘 Integration Info
                    </h3>
                    <div className="text-sm text-blue-800 space-y-1">
                        <p>
                            <strong>Server Component:</strong> This page uses{' '}
                            <code className="bg-blue-100 px-2 py-1 rounded">fetchAPI()</code>{' '}
                            for server-side rendering
                        </p>
                        <p>
                            <strong>Data Fetching:</strong> Articles are fetched at build time
                            and on-demand
                        </p>
                        <p>
                            <strong>Type Safety:</strong> Full TypeScript support with proper
                            interfaces
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
