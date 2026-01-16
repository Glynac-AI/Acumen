// app/use-cases/page.tsx
'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StaggerContainer from '@/components/ui/StaggerContainer';
import { ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function UseCases() {
    const useCases = [
        {
            title: 'Scaling Compliance Operations',
            challenge: 'Mid-sized RIA managing compliance oversight across 40+ advisors with manual review processes and fragmented communication systems.',
            result: 'Implemented unified supervision platform with automated workflows, improving audit readiness while reducing administrative time spent on compliance reviews.',
            accent: 'accent',
            number: '01'
        },
        {
            title: 'Systematic Income Strategies',
            challenge: 'Independent broker-dealer seeking to offer institutional-grade options strategies while maintaining individual client equity positions and avoiding operational complexity.',
            result: 'Deployed automated covered call platform with rules-based execution, enhancing advisor value proposition and attracting significant new assets under management.',
            accent: 'primary',
            number: '02'
        },
        {
            title: 'Modernizing Legacy Operations',
            challenge: 'Established wealth management firm facing rising operational costs and competitive pressure from technology-enabled competitors.',
            result: 'Integrated compliance software and streamlined workflows, reducing overhead while improving scalability and advisor satisfaction.',
            accent: 'accent',
            number: '03'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero - Full Screen Height */}
            <Section background="gradient" padding="lg" className="text-white relative overflow-hidden min-h-screen flex items-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-8"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                                Use Cases
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                How wealth management firms use our solutions to address specific operational and compliance challenges.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-lg text-white/80 leading-relaxed max-w-3xl"
                            >
                                Real examples from RIAs, broker-dealers, and wealth management firms that have implemented our platform to improve efficiency and reduce risk.
                            </motion.p>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Use Cases - Premium Layout */}
            <Section background="white" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">Client Results</h2>
                        <p className="text-xl text-primary/70 max-w-3xl mx-auto text-center">
                            Each engagement demonstrates measurable improvements in operational efficiency and regulatory compliance.
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="space-y-12">
                        {useCases.map((useCase, index) => (
                            <motion.div key={useCase.title} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden relative">
                                    <div className="p-8 lg:p-12">
                                        <div className="flex flex-col lg:flex-row gap-8">
                                            {/* Visual Element & Number */}
                                            <div className="shrink-0 lg:w-32">
                                                <div className="flex flex-col items-start lg:items-center space-y-6">
                                                    {/* Large Number */}
                                                    <div className={`text-6xl lg:text-7xl font-bold text-${useCase.accent}/20 group-hover:text-${useCase.accent}/30 transition-colors duration-300`}>
                                                        {useCase.number}
                                                    </div>

                                                    {/* Visual Icon */}
                                                    <div className={`w-16 h-16 rounded-2xl bg-linear-to-br from-${useCase.accent}/10 to-${useCase.accent}/20 group-hover:from-${useCase.accent}/20 group-hover:to-${useCase.accent}/30 transition-all duration-300 flex items-center justify-center`}>
                                                        <div className={`w-6 h-6 rounded-lg bg-${useCase.accent} group-hover:scale-110 transition-transform duration-300`}></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 space-y-6">
                                                <div className={`w-16 h-1 bg-${useCase.accent} rounded-full group-hover:w-24 transition-all duration-300`}></div>

                                                <h3 className={`text-3xl font-bold text-primary mb-6 group-hover:text-${useCase.accent} transition-colors duration-300`}>
                                                    {useCase.title}
                                                </h3>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <h4 className="text-sm font-semibold text-primary/50 uppercase tracking-wide">
                                                            Challenge
                                                        </h4>
                                                        <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                                            {useCase.challenge}
                                                        </p>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <h4 className="text-sm font-semibold text-primary/50 uppercase tracking-wide">
                                                            Outcome
                                                        </h4>
                                                        <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                                            {useCase.result}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${useCase.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp" className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            Discuss Your Specific Challenges
                        </h2>
                        <p className="text-xl text-primary/70 mb-8 max-w-3xl mx-auto">
                            Every firm faces different operational constraints. Schedule a conversation to explore how our solutions can address your specific needs.
                        </p>
                        <Button href="/contact" variant="accent" size="lg">
                            Get in Touch
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}