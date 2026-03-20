import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { getPublicPlaybookPageBySlug, getPublicPlaybookPages } from '@/lib/knowledge';
import { getProductLabel } from '@/lib/knowledge';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 60;

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = await getPublicPlaybookPageBySlug(slug);

    if (!page) {
        return { title: 'Not Found' };
    }

    return {
        title: `${page.title} | Knowledge Base`,
        description: page.summary || `Knowledge page: ${page.title}`,
    };
}

export default async function KnowledgePageDetail({ params }: Props) {
    const { slug } = await params;
    const page = await getPublicPlaybookPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return (
        <>
            {/* Page Header */}
            <section className="bg-white border-b border-gray-100">
                <Container>
                    <div className="py-12 md:py-16">
                        {/* Breadcrumb */}
                        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
                            <Link href="/" className="hover:text-[#49648C] transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/knowledge" className="hover:text-[#49648C] transition-colors">
                                Knowledge
                            </Link>
                            <span>/</span>
                            <Link
                                href={`/knowledge?product=${page.product}`}
                                className="hover:text-[#49648C] transition-colors"
                            >
                                {getProductLabel(page.product)}
                            </Link>
                            <span>/</span>
                            <span className="text-gray-600">{page.section}</span>
                        </nav>

                        <div className="max-w-4xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="px-2.5 py-1 text-xs font-medium tracking-wide bg-[#49648C] text-white" style={{ borderRadius: '2px' }}>
                                    {getProductLabel(page.product)}
                                </span>
                                <span className="text-xs text-gray-400">{page.section}</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#0B1F3B] leading-tight mb-4">
                                {page.title}
                            </h1>

                            {page.summary && (
                                <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
                                    {page.summary}
                                </p>
                            )}

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                {page.contentOwner && (
                                    <span>Owner: <span className="text-gray-600">{page.contentOwner}</span></span>
                                )}
                                {page.lastReviewed && (
                                    <span>
                                        Reviewed:{' '}
                                        <span className="text-gray-600">
                                            {new Date(page.lastReviewed).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </span>
                                )}
                                {page.reviewCadence && (
                                    <span>
                                        Cadence: <span className="text-gray-600 capitalize">{page.reviewCadence}</span>
                                    </span>
                                )}
                            </div>

                            {/* Tags */}
                            {page.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {page.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Content */}
            <section className="bg-white">
                <Container>
                    <div className="py-12 md:py-16">
                        <div className="max-w-4xl prose prose-lg prose-gray">
                            {/* Render content — supports markdown string from Strapi richtext */}
                            <div dangerouslySetInnerHTML={{ __html: page.content }} />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Wiki Path Info */}
            <section className="bg-[#F5F2EA] border-t border-gray-200">
                <Container>
                    <div className="py-8">
                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>
                                Wiki Path: <code className="text-xs bg-white px-2 py-1 rounded">{page.wikiPath}</code>
                            </span>
                            <span>
                                Last updated: {new Date(page.updatedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
