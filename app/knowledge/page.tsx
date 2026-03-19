import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { KnowledgeBrowser } from '@/components/knowledge/KnowledgeBrowser';
import { getPublicPlaybookPages, getActiveProducts } from '@/lib/knowledge';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
    title: 'Knowledge Base | Acumen',
    description: 'Browse live knowledge pages organized by product, section, and topic.',
};

function KnowledgeLoading() {
    return (
        <section className="bg-white">
            <Container>
                <div className="py-16 md:py-20">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default async function KnowledgePage() {
    const [pages, activeProducts] = await Promise.all([
        getPublicPlaybookPages(),
        getActiveProducts(),
    ]);

    return (
        <Suspense fallback={<KnowledgeLoading />}>
            <KnowledgeBrowser pages={pages} activeProducts={activeProducts} />
        </Suspense>
    );
}
