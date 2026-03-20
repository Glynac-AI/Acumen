'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getProductLabel } from '@/lib/knowledge';
import type { PlaybookPage, Product } from '@/types/knowledge';
import { PRODUCTS, groupBySection } from '@/types/knowledge';

interface KnowledgeBrowserProps {
    pages: PlaybookPage[];
    activeProducts: Product[];
}

export const KnowledgeBrowser: React.FC<KnowledgeBrowserProps> = ({
    pages,
    activeProducts,
}) => {
    const searchParams = useSearchParams();
    const productParam = searchParams.get('product') as Product | null;

    const [selectedProduct, setSelectedProduct] = useState<Product | 'all'>(
        productParam && PRODUCTS.includes(productParam as Product) ? productParam : 'all'
    );

    // Filter pages by selected product
    const filteredPages = useMemo(() => {
        if (selectedProduct === 'all') return pages;
        return pages.filter((p) => p.product === selectedProduct);
    }, [pages, selectedProduct]);

    // Group filtered pages by section
    const bySection = useMemo(() => groupBySection(filteredPages), [filteredPages]);
    const sections = Object.keys(bySection).sort();

    return (
        <>
            {/* Page Header */}
            <section className="bg-white border-b border-gray-100">
                <Container>
                    <div className="py-16 md:py-20">
                        <div className="max-w-3xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="h-px w-12 bg-[#49648C]"></div>
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                    Knowledge Base
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1F3B] leading-tight mb-6">
                                {selectedProduct === 'all'
                                    ? 'All Knowledge'
                                    : getProductLabel(selectedProduct)}
                            </h1>
                            <p className="text-xl text-gray-600 font-light leading-relaxed">
                                Live knowledge pages organized by product and section.
                                All content synced from Strapi to Wiki.js.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Filters & Content */}
            <section className="bg-white">
                <Container>
                    <div className="py-12 md:py-16">
                        {/* Product Filter Tabs */}
                        <div className="flex flex-wrap gap-3 mb-12">
                            <button
                                onClick={() => setSelectedProduct('all')}
                                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded ${
                                    selectedProduct === 'all'
                                        ? 'bg-[#0B1F3B] text-white'
                                        : 'bg-white text-[#0B1F3B] border border-gray-300 hover:border-[#49648C]'
                                }`}
                            >
                                All Products
                            </button>
                            {activeProducts.map((product) => (
                                <button
                                    key={product}
                                    onClick={() => setSelectedProduct(product)}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded ${
                                        selectedProduct === product
                                            ? 'bg-[#0B1F3B] text-white'
                                            : 'bg-white text-[#0B1F3B] border border-gray-300 hover:border-[#49648C]'
                                    }`}
                                >
                                    {getProductLabel(product)}
                                </button>
                            ))}
                        </div>

                        {/* Sections and Pages */}
                        {sections.length > 0 ? (
                            <div className="space-y-12">
                                {sections.map((section) => (
                                    <div key={section}>
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="h-px w-8 bg-[#49648C]"></div>
                                            <h2 className="text-2xl font-light text-[#0B1F3B] capitalize">
                                                {section}
                                            </h2>
                                            <span className="text-xs text-gray-400">
                                                ({bySection[section].length})
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {bySection[section].map((page) => (
                                                <Link
                                                    key={page.id}
                                                    href={`/knowledge/${page.slug}`}
                                                    className="group block"
                                                >
                                                    <article className="border border-gray-200 hover:border-[#49648C] transition-all duration-300 p-6 h-full">
                                                        <div className="flex items-center space-x-2 mb-3">
                                                            <span className="text-xs font-medium text-[#49648C]">
                                                                {getProductLabel(page.product)}
                                                            </span>
                                                            <span className="text-xs text-gray-300">&middot;</span>
                                                            <span className="text-xs text-gray-400">
                                                                {page.section}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-lg font-medium text-[#0B1F3B] group-hover:text-[#49648C] transition-colors mb-2 line-clamp-2">
                                                            {page.title}
                                                        </h3>

                                                        {page.summary && (
                                                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                                                                {page.summary}
                                                            </p>
                                                        )}

                                                        <div className="flex items-center justify-between mt-auto">
                                                            {page.tags.length > 0 && (
                                                                <div className="flex flex-wrap gap-1">
                                                                    {page.tags.slice(0, 2).map((tag) => (
                                                                        <span
                                                                            key={tag}
                                                                            className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded"
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            <span className="text-xs text-gray-400">
                                                                {new Date(page.updatedAt).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                })}
                                                            </span>
                                                        </div>
                                                    </article>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-xl text-gray-500">
                                    No knowledge pages found
                                    {selectedProduct !== 'all' && ` for ${getProductLabel(selectedProduct)}`}.
                                </p>
                            </div>
                        )}

                        {/* Count */}
                        <div className="mt-12 text-center">
                            <p className="text-sm text-gray-400">
                                Showing {filteredPages.length} live knowledge{' '}
                                {filteredPages.length === 1 ? 'page' : 'pages'}
                                {selectedProduct !== 'all' &&
                                    ` in ${getProductLabel(selectedProduct)}`}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};
