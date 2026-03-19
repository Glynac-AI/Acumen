import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { WhoThisIsForSection } from '@/components/home/WhoThisIsForSection';
import { KnowledgeEntrySection } from '@/components/home/KnowledgeEntrySection';
import { IndustryInsightsSection } from '@/components/home/IndustryInsightsSection';
import { RecentArticlesSection } from '@/components/home/RecentArticlesSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhoThisIsForSection />
      {/* Knowledge portal entry — shows live PlaybookPage products. Hidden if none exist. */}
      <KnowledgeEntrySection />
      <IndustryInsightsSection />
      <RecentArticlesSection />
      <NewsletterSection />
    </>
  );
}