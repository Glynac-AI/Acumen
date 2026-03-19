/**
 * KnowledgeEntrySection
 *
 * Server component — fetches live PlaybookPage product entry points from Strapi
 * and renders them as navigation cards on the homepage.
 *
 * Returns null silently if:
 *  - No playbook-pages collection exists in Strapi yet
 *  - No pages are currently live (sync_to_wiki + approval_status = Live)
 *
 * Wiki path pattern: /{product}/{section}/{sub-topic}
 */

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getKnowledgeEntryPoints } from '@/lib/data-service';

export const KnowledgeEntrySection: React.FC = async () => {
    const entries = await getKnowledgeEntryPoints();

    // Silently hide if no live knowledge pages exist yet
    if (!entries || entries.length === 0) {
        return null;
    }

    return (
        <section className="relative bg-[#F8F9FC] overflow-hidden border-t border-gray-100">
            <Container>
                <div className="py-16 md:py-20">
                    {/* Section header */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="h-px w-12 bg-[#49648C]" />
                                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49648C]">
                                        Knowledge Base
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B]">
                                    Product Knowledge Hub
                                </h2>
                                <p className="mt-3 text-gray-500 text-base max-w-xl">
                                    Live playbooks, guides, and operational knowledge — grouped by product.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {entries.map((entry) => (
                            <Link
                                key={entry.slug}
                                href={`/knowledge/${entry.slug}`}
                                className="group block"
                            >
                                <article className="h-full bg-white border border-gray-100 hover:border-[#49648C] transition-colors duration-200 p-6 flex flex-col justify-between">
                                    {/* Product icon placeholder */}
                                    <div className="mb-4">
                                        <div
                                            className="w-10 h-10 rounded-sm flex items-center justify-center bg-[#0B1F3B] group-hover:bg-[#49648C] transition-colors duration-200"
                                            aria-hidden="true"
                                        >
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Product name */}
                                    <h3 className="text-base font-semibold text-[#0B1F3B] group-hover:text-[#49648C] transition-colors capitalize leading-snug mb-3">
                                        {entry.product}
                                    </h3>

                                    {/* Metadata */}
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
                                        <span>
                                            {entry.pageCount}{' '}
                                            {entry.pageCount === 1 ? 'page' : 'pages'}
                                        </span>
                                        {entry.sectionCount > 0 && (
                                            <>
                                                <span>·</span>
                                                <span>
                                                    {entry.sectionCount}{' '}
                                                    {entry.sectionCount === 1 ? 'section' : 'sections'}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* Arrow indicator */}
                                    <div className="mt-4 flex items-center text-xs font-medium text-[#49648C] opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Browse</span>
                                        <svg
                                            className="ml-1 w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};
