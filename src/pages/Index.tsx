// src/pages/Index.tsx
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import CTASection from "@/components/home/CTASection";
import CuratedExpertise from "@/components/home/CuratedExpertise";
import Philosophy from "@/components/home/Philosophy";
import AcumenExperience from "@/components/home/AcumenExperience";
import TailoredSolutions from "@/components/home/TailoredSolutions";
import ClientPerspectives from "@/components/home/ClientPerspectives";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <CuratedExpertise />
      <Philosophy />
      <AcumenExperience />
      <TailoredSolutions />
      <ClientPerspectives /> 
      <CTASection />
    </div>
  );
};

export default Index;