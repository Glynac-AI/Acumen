'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getRecentPlaybookPages } from '@/lib/data-service';
import { getProductLabel } from '@/lib/knowledge';
import type { PlaybookPage } from '@/types/knowledge';

export const RecentKnowledgeSection: React.FC = () => {
    const [pages, setPages] = useState<PlaybookPage[]>([]);

    useEffect(() => {
        getRecentPlaybookPages(6)
            .then(setPages)
            .catch(() => {});
    }, []);

    if (pages.length === 0) return null;

    const featured = pages[0];
    const rest = pages.slice(1);

    return (
        <section className="relative bg-white overflow-hidden">
            <Container>
                <div className="py-20 md:py-28">
                    {/* Section Header */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="h-px w-12 bg-[#49648C]"></div>
                                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                        Recently Updated
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-light text-[#0B1F3B]">
                                    Latest Knowledge
                                </h2>
                            </div>
                            <Link
                                href="/knowledge"
                                className="hidden md:inline-flex items-center space-x-2 text-sm font-medium text-[#0B1F3B] hover:text-[#49648C] transition-colors"
                            >
                                <span>View All</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Featured Knowledge Page */}
                        <div className="lg:col-span-7">
                            <Link href={`/knowledge/${featured.slug}`} className="group block">
                                <article className="h-full">
                                    <div className="bg-[#0B1F3B] p-8 md:p-12 mb-6 relative overflow-hidden">
                                        {/* Subtle grid pattern */}
                                        <div className="absolute inset-0 opacity-5">
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    backgroundImage: `linear-gradient(#49648C 1px, transparent 1px), linear-gradient(90deg, #49648C 1px, transparent 1px)`,
                                                    backgroundSize: '30px 30px',
                                                }}
                                            ></div>
                                        </div>

                                        <div className="relative">
                                            <div className="flex items-center space-x-3 mb-4">
                                                <span className="px-2.5 py-1 text-xs font-medium tracking-wide bg-[#49648C] text-white" style={{ borderRadius: '2px' }}>
                                                    {getProductLabel(featured.product)}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {featured.section}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-light text-white leading-tight group-hover:text-[#49648C] transition-colors mb-4">
                                                {featured.title}
                                            </h3>

                                            {featured.summary && (
                                                <p className="text-base text-gray-300 leading-relaxed line-clamp-3">
                                                    {featured.summary}
                                                </p>
                                            )}

                                            <div className="flex items-center space-x-4 mt-6 text-xs text-gray-400">
                                                {featured.contentOwner && (
                                                    <span>Owner: {featured.contentOwner}</span>
                                                )}
                                                {featured.lastReviewed && (
                                                    <>
                                                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                                        <span>
                                                            Reviewed: {new Date(featured.lastReviewed).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </div>

                        {/* Recent Knowledge Pages List */}
                        <div className="lg:col-span-5 space-y-6">
                            {rest.map((page) => (
                                <Link
                                    key={page.id}
                                    href={`/knowledge/${page.slug}`}
                                    className="group block"
                                >
                                    <article className="flex gap-4 items-start">
                                        {/* Indicator */}
                                        <div className="flex-shrink-0 mt-1.5">
                                            <div className="w-2 h-2 rounded-full bg-[#49648C] opacity-40 group-hover:opacity-100 transition-opacity"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow space-y-1.5">
                                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                                                <span className="font-medium text-[#49648C]">
                                                    {getProductLabel(page.product)}
                                                </span>
                                                <span>&middot;</span>
                                                <span>{page.section}</span>
                                            </div>

                                            <h4 className="text-base font-medium text-[#0B1F3B] leading-tight group-hover:text-[#49648C] transition-colors line-clamp-2">
                                                {page.title}
                                            </h4>

                                            {page.summary && (
                                                <p className="text-sm text-gray-500 line-clamp-1">
                                                    {page.summary}
                                                </p>
                                            )}

                                            {page.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {page.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
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
