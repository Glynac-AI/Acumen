import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { WhoThisIsForSection } from '@/components/home/WhoThisIsForSection';
import { RecentKnowledgeSection } from '@/components/home/RecentKnowledgeSection';
import { KnowledgeByProductSection } from '@/components/home/KnowledgeByProductSection';
import { IndustryInsightsSection } from '@/components/home/IndustryInsightsSection';
import { RecentArticlesSection } from '@/components/home/RecentArticlesSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhoThisIsForSection />
      {/* Knowledge system entry points — live playbook pages grouped by product and recency */}
      <RecentKnowledgeSection />
      <KnowledgeByProductSection />
      {/* Existing blog content sections */}
      <IndustryInsightsSection />
      <RecentArticlesSection />
      <NewsletterSection />
    </>
  );
}