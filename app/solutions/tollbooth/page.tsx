// app/solutions/tollbooth/page.tsx
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

export default function Tollbooth() {
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
                                Tollbooth — Advisor-Focused Options Strategy Automation
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Automate covered-call and options strategies with rules-based execution. Preserve individual equity positions while generating systematic income through advisor-level portfolio overlays.
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

            {/* What It Does */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">What Tollbooth Does</h2>
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                            <p>
                                Tollbooth is a rules-based covered call and options automation platform designed for advisors seeking to generate systematic income for client portfolios without building an in-house trading desk.
                            </p>
                            <p>
                                The platform delivers <strong>automated options execution</strong>, <strong>preservation of individual equity positions</strong>, <strong>rules-based trade automation</strong>, and <strong>advisor-level portfolio overlays</strong>—enabling advisors to implement sophisticated options strategies while maintaining full control over client holdings.
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

                    <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Automated Options Execution",
                                description: "Rules-based automation executes covered calls and cash-secured puts across multiple accounts with precision and consistency",
                                accent: "accent"
                            },
                            {
                                title: "Preserve Equity Positions",
                                description: "Maintain individual client equity positions and holdings while implementing systematic income strategies through advisor-level overlays",
                                accent: "primary"
                            },
                            {
                                title: "Rules-Based Trade Automation",
                                description: "Built-in controls for position sizing, strike selection, portfolio concentration, and integrated reporting FROM custodians",
                                accent: "accent"
                            }
                        ].map((feature, index) => (
                            <motion.div key={feature.title} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 h-full text-center overflow-hidden relative">
                                    <div className={`w-12 h-1 bg-${feature.accent} rounded-full mx-auto group-hover:w-16 transition-all duration-300`}></div>

                                    <h3 className={`text-xl font-bold text-primary group-hover:text-${feature.accent} transition-colors duration-300`}>
                                        {feature.title}
                                    </h3>

                                    <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
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

            {/* Who Benefits */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Who Benefits</h2>
                        <div className="space-y-4">
                            {[
                                'RIAs seeking to add income strategies without hiring dedicated options traders',
                                'Advisors managing portfolios for yield-focused clients who want to maintain existing equity positions',
                                'Wealth management firms wanting systematic options execution with rules-based automation',
                                'Practices looking to differentiate with specialized income strategies and advisor-level portfolio overlays',
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                                    <span className="text-lg text-primary/70">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>

            {/* Deployment Process */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Deployment Process</h2>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                phase: 'Pilot',
                                description: 'Test strategies with select accounts to establish rules and performance baselines',
                                number: "01"
                            },
                            {
                                phase: 'Managed',
                                description: 'Roll out to additional accounts with ongoing strategy refinement and monitoring',
                                number: "02"
                            },
                            {
                                phase: 'Scale',
                                description: 'Expand across firm with full automation and integrated reporting FROM custodians',
                                number: "03"
                            },
                        ].map((step, index) => (
                            <motion.div key={step.phase} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 h-full text-center overflow-hidden relative">
                                    <div className="text-6xl font-bold text-accent/20 group-hover:text-accent/30 transition-colors duration-300 mb-4">
                                        {step.number}
                                    </div>

                                    <div className="w-12 h-1 bg-accent rounded-full mx-auto group-hover:w-16 transition-all duration-300"></div>

                                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                                        {step.phase}
                                    </h3>

                                    <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                        {step.description}
                                    </p>

                                    {/* Hover Gradient */}
                                    <div className="absolute inset-0 bg-linear-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* CTA */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp" className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            Ready to Add Options Income to Your Practice?
                        </h2>
                        <p className="text-xl text-primary/70 mb-8 max-w-3xl mx-auto">
                            Contact us to discuss custom pricing based on your firm's assets and execution volume.
                        </p>
                        <Button href="/contact" variant="accent" size="lg" className="hover:scale-105 transition-transform duration-300">
                            Request a Demo
                        </Button>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}