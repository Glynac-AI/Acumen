'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getPlaybookPagesByProduct } from '@/lib/data-service';
import type { PlaybookPage, Product } from '@/types/knowledge';
import { getProductLabel } from '@/lib/knowledge';
import { PRODUCTS } from '@/types/knowledge';

export const KnowledgeByProductSection: React.FC = () => {
    const [pagesByProduct, setPagesByProduct] = useState<Record<Product, PlaybookPage[]> | null>(null);

    useEffect(() => {
        getPlaybookPagesByProduct()
            .then(setPagesByProduct)
            .catch(() => {});
    }, []);

    if (!pagesByProduct) return null;

    // Only show products that have live pages
    const activeProducts = PRODUCTS.filter((p) => pagesByProduct[p]?.length > 0);

    if (activeProducts.length === 0) return null;

    return (
        <section className="relative bg-[#F5F2EA] overflow-hidden">
            <Container>
                <div className="py-20 md:py-28">
                    {/* Section Header */}
                    <div className="mb-12">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="h-px w-12 bg-[#49648C]"></div>
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                Knowledge Base
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-4xl md:text-5xl font-light text-[#0B1F3B]">
                                Browse by Product
                            </h2>
                            <Link
                                href="/knowledge"
                                className="hidden md:inline-flex items-center space-x-2 text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors"
                            >
                                <span>View All Knowledge</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Product Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeProducts.map((product) => {
                            const pages = pagesByProduct[product];
                            const latestPages = pages.slice(0, 3);

                            return (
                                <div
                                    key={product}
                                    className="group bg-white border border-gray-200 hover:border-[#49648C] transition-all duration-300 overflow-hidden"
                                >
                                    {/* Top accent line */}
                                    <div className="h-1 bg-[#49648C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                                    <div className="p-8">
                                        {/* Product Header */}
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-medium text-[#0B1F3B] group-hover:text-[#49648C] transition-colors">
                                                {getProductLabel(product)}
                                            </h3>
                                            <span className="text-xs text-gray-400 font-medium">
                                                {pages.length} {pages.length === 1 ? 'page' : 'pages'}
                                            </span>
                                        </div>

                                        {/* Latest Pages */}
                                        <div className="space-y-3 mb-6">
                                            {latestPages.map((page) => (
                                                <Link
                                                    key={page.id}
                                                    href={`/knowledge/${page.slug}`}
                                                    className="block group/link"
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#49648C] mt-2 flex-shrink-0 opacity-40 group-hover/link:opacity-100 transition-opacity"></div>
                                                        <div>
                                                            <p className="text-sm font-medium text-[#0B1F3B] group-hover/link:text-[#49648C] transition-colors line-clamp-1">
                                                                {page.title}
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-0.5">
                                                                {page.section}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Browse Link */}
                                        <Link
                                            href={`/knowledge?product=${product}`}
                                            className="inline-flex items-center space-x-1.5 text-xs font-medium tracking-wide uppercase text-[#49648C] hover:text-[#0B1F3B] transition-colors"
                                        >
                                            <span>Browse all</span>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile View All */}
                    <div className="md:hidden mt-8 text-center">
                        <Link
                            href="/knowledge"
                            className="inline-flex items-center space-x-2 text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors"
                        >
                            <span>View All Knowledge</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};
