// app/solutions/ats/page.tsx
'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StaggerContainer from '@/components/ui/StaggerContainer';
import { CheckCircle2 } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function ATS() {
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
                                Acumen Talent Solutions — Recruiting & Executive Search
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Specialized talent acquisition for wealth management firms, from advisor recruiting to C-suite executive placements.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="pt-4"
                            >
                                <Button href="/contact" variant="secondary" size="lg">
                                    Schedule a Call
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Talent Services */}
            <Section background="white" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">Talent Services</h2>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Advisor Recruiting",
                                description: "Identify and recruit experienced financial advisors who align with your firm's culture and growth strategy.",
                                accent: "accent"
                            },
                            {
                                title: "Executive Search",
                                description: "C-suite and senior leadership placements for RIAs, broker-dealers, and wealth management firms.",
                                accent: "primary"
                            },
                            {
                                title: "Practice Transitions",
                                description: "Support for advisor practice acquisitions, succession planning, and team integrations.",
                                accent: "accent"
                            },
                            {
                                title: "Talent Strategy",
                                description: "Build organizational structures, compensation models, and retention programs for sustainable growth.",
                                accent: "primary"
                            }
                        ].map((service, index) => (
                            <motion.div key={service.title} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 h-full overflow-hidden relative">
                                    <div className={`w-12 h-1 bg-${service.accent} rounded-full group-hover:w-16 transition-all duration-300`}></div>

                                    <h3 className={`text-xl font-bold text-primary group-hover:text-${service.accent} transition-colors duration-300`}>
                                        {service.title}
                                    </h3>

                                    <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                        {service.description}
                                    </p>

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${service.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Our Process */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">Our Process</h2>
                    </AnimatedSection>

                    <StaggerContainer className="space-y-6 max-w-5xl mx-auto">
                        {[
                            {
                                step: "Discovery & Scoping",
                                description: "Understand your firm's culture, growth plans, and ideal candidate profile.",
                                number: "01",
                                accent: "accent"
                            },
                            {
                                step: "Search & Outreach",
                                description: "Leverage our network and proprietary database to identify qualified candidates.",
                                number: "02",
                                accent: "primary"
                            },
                            {
                                step: "Screening & Presentation",
                                description: "Conduct thorough interviews and due diligence before presenting shortlisted candidates.",
                                number: "03",
                                accent: "accent"
                            },
                            {
                                step: "Placement & Onboarding",
                                description: "Support offer negotiation, transition planning, and successful integration.",
                                number: "04",
                                accent: "primary"
                            }
                        ].map((process, index) => (
                            <motion.div key={process.step} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
                                    <div className="flex items-start gap-8 p-8">
                                        {/* Number */}
                                        <div className={`text-6xl font-bold text-${process.accent}/20 group-hover:text-${process.accent}/30 transition-colors duration-300 shrink-0`}>
                                            {process.number}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 space-y-4">
                                            <div className={`w-12 h-1 bg-${process.accent} rounded-full group-hover:w-16 transition-all duration-300`}></div>

                                            <h3 className={`text-xl font-bold text-primary group-hover:text-${process.accent} transition-colors duration-300`}>
                                                {process.step}
                                            </h3>

                                            <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                                {process.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${process.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Why Choose ATS */}
            <Section background="white" padding="lg">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <AnimatedSection animation="fadeInLeft">
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Why Choose ATS</h2>
                            <ul className="space-y-4">
                                {[
                                    'Deep industry expertise in wealth management recruiting',
                                    'Extensive network of qualified advisors and executives',
                                    'Proven track record of successful placements',
                                    'Understanding of regulatory and compliance requirements',
                                    'Customized search strategies for each engagement',
                                    'Ongoing support through transition and onboarding'
                                ].map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                                        <span className="text-lg text-primary/70">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInRight">
                            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 overflow-hidden relative">
                                <div className="w-12 h-1 bg-accent rounded-full group-hover:w-16 transition-all duration-300"></div>

                                <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                                    Specialized Focus Areas
                                </h3>

                                <div className="space-y-4">
                                    {[
                                        'Registered Investment Advisors (RIAs)',
                                        'Independent Broker-Dealers',
                                        'Wealth Management Firms',
                                        'Family Offices',
                                        'FinTech Companies',
                                        'Financial Planning Practices'
                                    ].map((focus, index) => (
                                        <div key={focus} className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-accent rounded-full shrink-0"></div>
                                            <span className="text-primary/70">{focus}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-linear-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </Card>
                        </AnimatedSection>
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp" className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            Ready to Build Your Team?
                        </h2>
                        <p className="text-xl text-primary/70 mb-8 max-w-3xl mx-auto">
                            Contact us to discuss your talent needs and learn how we can help you find the right people for your organization.
                        </p>
                        <Button href="/contact" variant="accent" size="lg" className="hover:scale-105 transition-transform duration-300">
                            Schedule a Call
                        </Button>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}