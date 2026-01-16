// app/resources/page.tsx
'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StaggerContainer from '@/components/ui/StaggerContainer';
import { FileText, Video, BookOpen, ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function Resources() {
    const resources = [
        {
            type: 'Whitepaper',
            icon: FileText,
            title: 'Compliance-First AI: A Framework for Regulated Firms',
            description: 'Comprehensive guide to implementing supervised AI in wealth management environments.',
            date: '2024',
            accent: 'accent'
        },
        {
            type: 'Case Study',
            icon: BookOpen,
            title: 'RIA Scale Study: 40-Advisor Supervision Model',
            description: 'How a mid-sized RIA achieved scalable compliance oversight using integrated technology.',
            date: '2024',
            accent: 'primary'
        },
        {
            type: 'Webinar',
            icon: Video,
            title: 'Systematic Income Generation for Advisors',
            description: 'Overview of covered call automation and options strategies for client portfolios.',
            date: '2024',
            accent: 'accent'
        },
        {
            type: 'Whitepaper',
            icon: FileText,
            title: 'Triple-Net Real Estate for Wealth Advisors',
            description: 'Guide to institutional-quality real estate investments in advisory portfolios.',
            date: '2024',
            accent: 'primary'
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
                                Resources
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Insights, guides, and case studies to help you navigate wealth management transformation.
                            </motion.p>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Resources Grid */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Expert Insights & Guidance</h2>
                        <p className="text-xl text-primary/70 max-w-3xl mx-auto">
                            Practical resources designed to help wealth management firms implement compliance-first transformation strategies.
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                        {resources.map((resource, index) => {
                            const Icon = resource.icon;
                            return (
                                <motion.div key={resource.title} variants={fadeInUp}>
                                    <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative h-full">
                                        <div className="p-8">
                                            <div className="flex items-start gap-6">
                                                {/* Icon */}
                                                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br from-${resource.accent}/10 to-${resource.accent}/20 group-hover:from-${resource.accent}/20 group-hover:to-${resource.accent}/30 transition-all duration-300 flex items-center justify-center shrink-0`}>
                                                    <Icon className={`h-8 w-8 text-${resource.accent} group-hover:scale-110 transition-transform duration-300`} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 space-y-4">
                                                    <div className={`w-12 h-1 bg-${resource.accent} rounded-full group-hover:w-16 transition-all duration-300`}></div>

                                                    <div className={`text-sm text-${resource.accent} font-semibold uppercase tracking-wide`}>
                                                        {resource.type}
                                                    </div>

                                                    <h3 className={`text-xl font-bold text-primary group-hover:text-${resource.accent} transition-colors duration-300`}>
                                                        {resource.title}
                                                    </h3>

                                                    <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                                        {resource.description}
                                                    </p>

                                                    <div className="text-xs text-primary/50 mb-4">
                                                        Published {resource.date}
                                                    </div>

                                                    <button className={`inline-flex items-center text-sm font-medium text-${resource.accent} hover:text-${resource.accent}/80 transition-colors group-hover:gap-2`}>
                                                        Download <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Gradient */}
                                        <div className={`absolute inset-0 bg-linear-to-r from-${resource.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </StaggerContainer>

                    {/* Custom Case Study CTA */}
                    <AnimatedSection animation="fadeInUp">
                        <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative max-w-4xl mx-auto">
                            <div className="p-12 text-center space-y-6">
                                <div className="w-16 h-1 bg-accent rounded-full mx-auto group-hover:w-20 transition-all duration-300"></div>

                                <h3 className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                                    Request a Custom Case Study
                                </h3>

                                <p className="text-lg text-primary/70 leading-relaxed max-w-2xl mx-auto group-hover:text-primary/80 transition-colors duration-300">
                                    Looking for specific information about how Acumen Strategy can help your firm? Request a tailored case study or consultation.
                                </p>

                                <Button href="/contact" variant="accent" size="lg" className="group-hover:scale-105 transition-transform duration-300">
                                    Request Case Study
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>

                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-linear-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </Card>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}