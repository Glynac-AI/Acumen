// app/solutions/sylvan/page.tsx
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

export default function Sylvan() {
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
                                Sylvan — Structured Real Estate Income Platform
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Sylvan delivers structured real estate exposure through pre-approved, ring fenced SPVs with lockbox governed rental cash distributions.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                            >
                                <Button href="https://sylvan.com" variant="secondary" size="lg">
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
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">About Sylvan</h2>
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                            <p>
                                Sylvan standardizes how real estate debt is issued and paid. Advisors invest in second-lien notes backed by specific properties held in ring-fenced SPVs, where rental income is lockboxed and distributed through fixed cash-flow waterfalls.
                            </p>
                            <p>
                                With structure and governance held constant across issuances, advisors can focus on asset quality and issuer performance, allocating client capital into multiple portfolios without repeating the full due diligence process each time.
                            </p>
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>

            {/* Key Features */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Key Features</h2>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Repeatable Capital Allocation",
                                description: "Use a single approved framework to deploy capital across multiple issuers and income-producing real estate portfolios.",
                                accent: "accent"
                            },
                            {
                                title: "Lockbox-Protected Cash Flow",
                                description: "Rental income is lockboxed and distributed through a fixed waterfall, ensuring banks and Sylvan investors are paid before any capital reaches the developer.",
                                accent: "primary"
                            },
                            {
                                title: "Ring-Fenced Investment Structure",
                                description: "Each investment is issued through a standalone SPV that isolates assets and cash flows, preventing cross-contamination of risk across portfolios or issuers.",
                                accent: "accent"
                            },
                            {
                                title: "Rental Income Without Ownership Risk",
                                description: "Debt positions on stabilized, income-producing portfolio of properties provide exposure to rental performance without developer equity risk.",
                                accent: "primary"
                            },
                            {
                                title: "Custodian-Native Execution",
                                description: "Sylvan offerings are executed directly through your existing custodian using a unique offering code, eliminating the need for new accounts or bespoke processes.",
                                accent: "accent"
                            }
                        ].map((feature) => (
                            <motion.div key={feature.title} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 h-full overflow-hidden relative">
                                    <div className={`w-12 h-1 bg-${feature.accent} rounded-full group-hover:w-16 transition-all duration-300`}></div>

                                    <h3 className={`text-lg font-bold text-primary group-hover:text-${feature.accent} transition-colors duration-300`}>
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                        {feature.description}
                                    </p>

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${feature.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Who It's For */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Ideal For</h2>
                        <div className="space-y-4">
                            {[
                                'High-net-worth individuals seeking consistent private income beyond traditional stocks and bonds',
                                'Advisors seeking scalable alternative investment solutions',
                                'Clients prioritizing income stability and capital preservation',
                                'Portfolios requiring low-volatility real asset exposure',
                                'Firms seeking institutional-grade real estate income without operational complexity',
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

            {/* CTA */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp" className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            Interested in Adding Sylvan to Your Practice?
                        </h2>
                        <p className="text-xl text-primary/70 mb-8 max-w-3xl mx-auto">
                            Contact us for detailed investor materials, platform overview, and advisor partnership opportunities.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="https://sylvan.com" variant="accent" size="lg" className="hover:scale-105 transition-transform duration-300">
                                Learn About the Platform
                            </Button>
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}
