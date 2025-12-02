// app/solutions/page.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StaggerContainer from '@/components/ui/StaggerContainer';
import { ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function Solutions() {
    const solutions = [
        {
            name: 'Consulting',
            tagline: 'Strategic Advisory & Execution',
            description: 'Diagnose challenges, design compliant roadmaps, and prioritize execution across strategy, compliance, technology, and growth.',
            href: '/solutions/consulting',
            accent: 'accent',
        },
        {
            name: 'Glynac',
            tagline: 'Compliance-First AI Workspace',
            description: 'Unified CRM, communications, and portfolio data with supervised AI agents that automate workflows and surface regulatory risk.',
            href: '/solutions/glynac',
            accent: 'primary',
        },
        {
            name: 'Tollbooth',
            tagline: 'Automated Options Execution',
            description: 'Rules-based covered call and options automation that generates systematic income while preserving individual equity positions.',
            href: '/solutions/tollbooth',
            accent: 'accent',
        },
        {
            name: 'Prairie Hill Holdings',
            tagline: 'Institutional NNN Real Estate',
            description: 'Institutional-quality triple-net lease (NNN) real estate solutions for advisors and high-net-worth clients with tax-efficient structures.',
            href: '/solutions/phh',
            accent: 'primary',
        },
        {
            name: 'Acumen Labs',
            tagline: 'Marketing & Brand Implementation',
            description: 'Full-service marketing execution including websites, brand development, content creation, and advisor enablement materials.',
            href: '/solutions/labs',
            accent: 'accent',
        },
        {
            name: 'Acumen Talent Solutions',
            tagline: 'Recruiting & Executive Search',
            description: 'Specialized talent acquisition for wealth management firms, from advisor recruiting to C-suite executive placements.',
            href: '/solutions/ats',
            accent: 'primary',
        },
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
                                Solutions
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Acumen Strategy activates a suite of products and services only when your strategy requires them. Each solution is designed to integrate seamlessly with your existing operations while maintaining regulatory compliance.
                            </motion.p>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Solutions Grid */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Integrated Solutions Portfolio</h2>
                        <p className="text-xl text-primary/70 max-w-3xl mx-auto">
                            Six specialized solutions that work together to transform wealth management operations, enhance compliance, and drive sustainable growth.
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {solutions.map((solution, index) => (
                            <motion.div key={solution.name} variants={fadeInUp}>
                                <Link href={solution.href} className="group block">
                                    <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative h-full">
                                        <div className="p-8 space-y-6">
                                            {/* Accent Bar */}
                                            <div className={`w-12 h-1 bg-${solution.accent} rounded-full group-hover:w-16 transition-all duration-300`}></div>

                                            {/* Content */}
                                            <div>
                                                <h3 className={`text-2xl font-bold text-primary mb-2 group-hover:text-${solution.accent} transition-colors duration-300`}>
                                                    {solution.name}
                                                </h3>
                                                <p className={`text-${solution.accent} font-semibold mb-3 text-sm uppercase tracking-wide`}>
                                                    {solution.tagline}
                                                </p>
                                                <p className="text-primary/70 leading-relaxed mb-6 group-hover:text-primary/80 transition-colors duration-300">
                                                    {solution.description}
                                                </p>
                                                <div className={`inline-flex items-center text-sm font-medium text-${solution.accent} group-hover:gap-2 transition-all duration-300`}>
                                                    Learn more
                                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-r from-${solution.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </StaggerContainer>

                    {/* CTA Section */}
                    <AnimatedSection animation="fadeInUp" className="text-center mt-16">
                        <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative max-w-4xl mx-auto">
                            <div className="p-12 text-center space-y-6">
                                <div className="w-16 h-1 bg-accent rounded-full mx-auto group-hover:w-20 transition-all duration-300"></div>

                                <h3 className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                                    Not Sure Which Solutions Are Right for Your Firm?
                                </h3>

                                <p className="text-lg text-primary/70 leading-relaxed max-w-2xl mx-auto group-hover:text-primary/80 transition-colors duration-300">
                                    Schedule a consultation to discuss how Acumen Strategy can create a custom combination of solutions tailored to your specific needs and growth objectives.
                                </p>

                                <Button href="/contact" variant="accent" size="lg" className="group-hover:scale-105 transition-transform duration-300">
                                    Book a Consultation
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>

                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </Card>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}