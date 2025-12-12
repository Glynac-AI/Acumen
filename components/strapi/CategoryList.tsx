import { fetchAPI, formatStrapiData, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    articles?: {
        id: number;
        title: string;
    }[];
}

export async function CategoryList() {
    let categories: Category[] = [];
    let error: string | null = null;

    try {
        const response = await fetchAPI('/categories?populate=*');
        categories = formatStrapiData<Category[]>(response);
    } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">Failed to load categories: {error}</p>
            </div>
        );
    }

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                <p>No categories found</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.name}
                    </h3>
                    {category.description && (
                        <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    )}
                    {category.articles && category.articles.length > 0 && (
                        <p className="text-xs text-gray-500">
                            {category.articles.length} article{category.articles.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
