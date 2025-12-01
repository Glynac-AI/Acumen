'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <Section background="gradient" padding="lg" className="text-white relative overflow-hidden min-h-[85vh] flex items-center">
            <Container className="relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                            Compliance-First Transformation for Wealth Managers
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl">
                            A single partner for advisory-led transformation and compliant product activation for wealth managers.
                        </p>

                        <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
                            We diagnose your business challenges, design a regulatory-aligned roadmap, and activate proven technology, product, and marketing capabilities to deliver measurable impact.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button href="/contact" variant="secondary" size="lg">
                                Book a Consultation
                            </Button>
                            <Button href="/solutions" variant="accent" size="lg">
                                Explore Solutions
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}