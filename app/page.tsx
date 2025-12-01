import HeroSection from '@/components/sections/home/HeroSection';
import SolutionsSection from '@/components/sections/home/SolutionsSection';
import ProcessSection from '@/components/sections/home/ProcessSection';
import UseCasesSection from '@/components/sections/home/UseCasesSection';
import CTASection from '@/components/sections/home/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SolutionsSection />
      <ProcessSection />
      <UseCasesSection />
      <CTASection />
    </div>
  );
}