// src/pages/Index.tsx
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ValueProposition from "@/components/home/ValueProposition";
import DatabaseShowcase from "@/components/home/DatabaseShowcase";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TeamExpertise from "@/components/home/TeamExpertise";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ValueProposition />
      <DatabaseShowcase />
      <ProcessTimeline />
      <TestimonialsSection />
      <TeamExpertise />
      <CTASection />
    </div>
  );
};

export default Index;