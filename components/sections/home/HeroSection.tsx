// components/sections/home/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <Section
            background="gradient"
            padding="lg"
            className="text-white relative overflow-hidden min-h-screen flex items-center pt-24"
        >
            <Container className="relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                            Modern solutions for wealth management and compliance
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl">
                            Software, institutional products, and professional education designed to help firms navigate regulatory requirements and scale operations.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button href="/contact" variant="secondary" size="lg">
                                Connect with Relationship Manager
                            </Button>
                            <Button href="/solutions" variant="accent" size="lg">
                                Explore Solutions
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </Container>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        </Section>
    );
}