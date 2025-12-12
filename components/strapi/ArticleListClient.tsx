'use client';

import { useStrapi } from '@/hooks/use-strapi';
import { getStrapiMedia } from '@/lib/strapi';
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

export function ArticleListClient() {
    const { data: articles, loading, error } = useStrapi<Article[]>('/articles?populate=*');

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
                    <p className="text-gray-600">Loading articles...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-red-800 font-semibold mb-2">Failed to load articles</h3>
                <p className="text-red-600 text-sm">{error.message}</p>
                <div className="mt-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!articles || articles.length === 0) {
        return (
            <div className="text-center text-gray-500 py-12">
                <p className="text-lg">No articles found</p>
                <p className="text-sm mt-2">Create some articles in your Strapi admin panel</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <article
                    key={article.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
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
                        <p className="text-sm text-gray-500 mb-2">Slug: {article.slug}</p>
                        <div
                            className="text-gray-700 line-clamp-3 prose prose-sm"
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
    );
}
