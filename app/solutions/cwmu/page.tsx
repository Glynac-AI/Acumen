// app/solutions/cwmu/page.tsx
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

export default function CWMU() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white relative overflow-hidden min-h-screen flex items-center">
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
                                Compliance Wealth Management University
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Professional education for wealth management firms—covering compliance, operations, technology, and advisory practice management.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                            >
                                <Button href="/contact" variant="secondary" size="lg">
                                    Learn More
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Overview */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">About CWMU</h2>
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                            <p>
                                Compliance Wealth Management University provides practical training for professionals across all functions of wealth management firms—from compliance and operations to technology and advisory practice.
                            </p>
                            <p>
                                Our programs address the full spectrum of wealth management operations, recognizing that compliance, technology, client service, and business development are interconnected disciplines that require integrated understanding.
                            </p>
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>

            {/* Training Programs */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Training Programs</h2>
                        <p className="text-xl text-primary/70 max-w-3xl mx-auto">
                            Comprehensive education across all aspects of wealth management operations
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Compliance & Regulatory",
                                description: "SEC, FINRA, and state requirements, supervision frameworks, audit preparation, and regulatory filing procedures.",
                                accent: "accent"
                            },
                            {
                                title: "Operations & Workflows",
                                description: "Client onboarding, account management, trading supervision, transaction processing, and operational efficiency.",
                                accent: "primary"
                            },
                            {
                                title: "Technology Integration",
                                description: "CRM systems, portfolio management platforms, compliance software, data management, and automation tools.",
                                accent: "accent"
                            },
                            {
                                title: "Advisory Practice",
                                description: "Client communication, portfolio construction, investment policy statements, and financial planning integration.",
                                accent: "primary"
                            },
                            {
                                title: "Business Development",
                                description: "Practice growth strategies, marketing compliance, referral networks, and client acquisition frameworks.",
                                accent: "accent"
                            },
                            {
                                title: "Risk Management",
                                description: "Cybersecurity, business continuity planning, error resolution, and proactive risk identification.",
                                accent: "primary"
                            }
                        ].map((program, index) => (
                            <motion.div key={program.title} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 h-full overflow-hidden relative">
                                    <div className={`w-12 h-1 bg-${program.accent} rounded-full group-hover:w-16 transition-all duration-300`}></div>

                                    <h3 className={`text-lg font-bold text-primary group-hover:text-${program.accent} transition-colors duration-300`}>
                                        {program.title}
                                    </h3>

                                    <p className="text-sm text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                        {program.description}
                                    </p>

                                    <div className={`absolute inset-0 bg-linear-to-r from-${program.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Who Should Attend */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Who Should Attend</h2>
                        <div className="space-y-4">
                            {[
                                'Chief Compliance Officers and compliance staff at RIAs and broker-dealers',
                                'Operations managers and administrative professionals',
                                'Financial advisors seeking deeper understanding of firm operations',
                                'Technology leads responsible for systems integration',
                                'Practice management and business development professionals',
                                'Firm principals and partners building scalable operations',
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                                    <span className="text-lg text-primary/70">{item}</span>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>

            {/* Learning Approach */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Learning Approach</h2>
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                            <p>
                                CWMU programs emphasize practical application over theoretical concepts. Training includes real-world scenarios, case studies from actual wealth management firms, and hands-on experience with industry-standard software and tools.
                            </p>
                            <p>
                                Sessions are designed for working professionals, with flexible scheduling and content tailored to the specific operational models of RIAs, broker-dealers, and hybrid firms.
                            </p>
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>

            {/* CTA */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp" className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            Interested in CWMU Training?
                        </h2>
                        <p className="text-xl text-primary/70 mb-8 max-w-3xl mx-auto">
                            Contact us to discuss training programs, scheduling, and custom curriculum development for your firm.
                        </p>
                        <Button href="/contact" variant="accent" size="lg" className="hover:scale-105 transition-transform duration-300">
                            Get Information
                        </Button>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}