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
    const software = [
        {
            name: 'Glynac',
            tagline: 'Compliance-First AI Workspace',
            description: 'Unified CRM, communications, and portfolio data with supervised AI agents that automate workflows and surface regulatory risk.',
            href: '/solutions/glynac',
            accent: 'primary'
        }
    ];

    const education = [
        {
            name: 'WMCI',
            tagline: 'Education & Certification',
            description: 'Professional development, compliance training, and certification programs designed for wealth management professionals.',
            href: '/solutions/wmci',
            accent: 'accent'
        }
    ];

    const investmentProducts = [
        {
            name: 'Tollbooth',
            tagline: 'Automated Options Execution',
            description: 'Rules-based covered call and options automation that generates systematic income while preserving individual equity positions.',
            href: '/solutions/tollbooth',
            accent: 'primary'
        },
        {
            name: 'Prairie Hill Holdings',
            tagline: 'Institutional NNN Real Estate',
            description: 'Institutional-quality triple-net lease (NNN) real estate solutions for advisors and high-net-worth clients with tax-efficient structures.',
            href: '/solutions/phh',
            accent: 'accent'
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
                                Solutions
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Software, products, and services designed to help wealth management firms navigate compliance requirements and scale their operations.
                            </motion.p>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Why Different Section */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Built for Wealth Management</h2>
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                            <p>
                                Every product we build is designed specifically for wealth management firms—RIAs, broker-dealers, and family offices. This focus allows us to solve problems that generic platforms ignore, from supervised AI that understands advisor-client communications to options automation that preserves individual client holdings.
                            </p>
                            <p>
                                Our solutions work together when needed, but each stands on its own. You're not forced into an all-or-nothing platform decision.
                            </p>
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>

            {/* Education Section */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Education</h2>
                        <p className="text-xl text-primary/70 max-w-3xl">
                            Professional development and certification
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="max-w-2xl mx-auto">
                        {education.map((solution, index) => (
                            <motion.div key={solution.name} variants={fadeInUp}>
                                <Link href={solution.href} className="group block">
                                    <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative h-full">
                                        <div className="p-8 space-y-6">
                                            <div className={`w-12 h-1 bg-${solution.accent} rounded-full group-hover:w-16 transition-all duration-300`}></div>

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

                                        <div className={`absolute inset-0 bg-linear-to-r from-${solution.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Software Section */}
            <Section background="white" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Software</h2>
                        <p className="text-xl text-primary/70 max-w-3xl">
                            Compliance and operational technology
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="max-w-2xl mx-auto">
                        {software.map((solution, index) => (
                            <motion.div key={solution.name} variants={fadeInUp}>
                                <Link href={solution.href} className="group block">
                                    <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative h-full">
                                        <div className="p-8 space-y-6">
                                            <div className={`w-12 h-1 bg-${solution.accent} rounded-full group-hover:w-16 transition-all duration-300`}></div>

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

                                        <div className={`absolute inset-0 bg-linear-to-r from-${solution.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Investment Products Section */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Investment Products</h2>
                        <p className="text-xl text-primary/70 max-w-3xl">
                            Institutional-grade investment solutions
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {investmentProducts.map((solution, index) => (
                            <motion.div key={solution.name} variants={fadeInUp}>
                                <Link href={solution.href} className="group block">
                                    <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative h-full">
                                        <div className="p-8 space-y-6">
                                            <div className={`w-12 h-1 bg-${solution.accent} rounded-full group-hover:w-16 transition-all duration-300`}></div>

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

                                        <div className={`absolute inset-0 bg-linear-to-r from-${solution.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Key Benefits */}
            <Section background="white" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Why Firms Choose Acumen</h2>
                        <p className="text-xl text-primary/70 max-w-3xl mx-auto">
                            Benefits that matter when selecting compliance and operational solutions
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Regulatory Expertise",
                                description: "Built by people who understand SEC, FINRA, and state requirements. Our solutions reflect real-world compliance workflows, not theoretical frameworks.",
                                accent: "accent"
                            },
                            {
                                title: "Rapid Deployment",
                                description: "Most implementations take weeks, not months. We prioritize getting you operational quickly with incremental improvements over time.",
                                accent: "primary"
                            },
                            {
                                title: "Dedicated Support",
                                description: "You work with people who know your firm and understand your challenges. No generic help desk tickets or offshore support centers.",
                                accent: "accent"
                            }
                        ].map((benefit, index) => (
                            <motion.div key={benefit.title} variants={fadeInUp}>
                                <Card className="space-y-6 h-full group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                                    <div className={`w-16 h-1 bg-${benefit.accent} rounded-full group-hover:w-20 transition-all duration-300`}></div>

                                    <h3 className={`text-xl font-bold text-primary group-hover:text-${benefit.accent} transition-colors duration-300`}>
                                        {benefit.title}
                                    </h3>

                                    <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                        {benefit.description}
                                    </p>

                                    <div className={`absolute inset-0 bg-linear-to-br from-${benefit.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* How We Work */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">How We Work</h2>
                        <div className="space-y-8">
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    {
                                        number: "01",
                                        title: "Discovery",
                                        description: "We start by understanding your current compliance workflows, technology stack, and operational constraints. This helps us identify where our solutions provide the most value."
                                    },
                                    {
                                        number: "02",
                                        title: "Pilot",
                                        description: "Deploy with a small group—typically your compliance team or a subset of advisors. This validates the approach and builds internal champions before broader rollout."
                                    },
                                    {
                                        number: "03",
                                        title: "Scale",
                                        description: "Expand to additional users and integrate with existing systems. We provide ongoing training, support, and updates as your needs evolve."
                                    }
                                ].map((step) => (
                                    <div key={step.number} className="group">
                                        <div className="text-6xl font-bold text-accent/10 mb-4 group-hover:text-accent/20 transition-colors duration-300">
                                            {step.number}
                                        </div>
                                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-primary/70 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp" className="text-center">
                        <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                            <div className="p-12 text-center space-y-6">
                                <div className="w-16 h-1 bg-accent rounded-full mx-auto group-hover:w-20 transition-all duration-300"></div>

                                <h3 className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                                    Need Help Choosing?
                                </h3>

                                <p className="text-lg text-primary/70 leading-relaxed max-w-2xl mx-auto group-hover:text-primary/80 transition-colors duration-300">
                                    Not sure which solutions are right for your firm? Schedule a conversation to discuss your specific needs and operational constraints.
                                </p>

                                <Button href="/contact" variant="accent" size="lg" className="group-hover:scale-105 transition-transform duration-300">
                                    Connect with Relationship Manager
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>

                            <div className="absolute inset-0 bg-linear-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </Card>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}