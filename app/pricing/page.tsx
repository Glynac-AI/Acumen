// app/pricing/page.tsx
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

export default function Pricing() {
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
                                Pricing & Engagements
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Flexible engagement models designed to align with your firm's needs and growth trajectory.
                            </motion.p>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Consulting Engagements */}
            <Section background="white" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Advisory & Consulting</h2>
                        <p className="text-xl text-primary/70">
                            Strategic engagements tailored to your transformation goals
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <motion.div variants={fadeInUp}>
                            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 h-full">
                                <div className="w-12 h-1 bg-accent rounded-full group-hover:w-16 transition-all duration-300"></div>
                                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">Project-Based</h3>
                                <div className="text-4xl font-bold text-accent">$25k–$75k</div>
                                <p className="text-sm text-primary/70 group-hover:text-primary/80 transition-colors duration-300">
                                    Defined scope, timeline, and deliverables
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                        <span className="text-sm text-primary/70">Discovery & diagnosis</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                        <span className="text-sm text-primary/70">Strategic roadmap</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                        <span className="text-sm text-primary/70">Implementation plan</span>
                                    </li>
                                </ul>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 border-accent space-y-6 h-full relative overflow-hidden">
                                <div className="text-xs font-semibold text-accent uppercase tracking-wide bg-accent/10 px-3 py-1 rounded-full inline-block">Most Popular</div>
                                <div className="w-12 h-1 bg-accent rounded-full group-hover:w-16 transition-all duration-300"></div>
                                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">Retainer</h3>
                                <div className="text-4xl font-bold text-accent">$10k–$25k/mo</div>
                                <p className="text-sm text-primary/70 group-hover:text-primary/80 transition-colors duration-300">
                                    Ongoing strategic advisory
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                        <span className="text-sm text-primary/70">Continuous support</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                        <span className="text-sm text-primary/70">Priority access</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                        <span className="text-sm text-primary/70">Product integration</span>
                                    </li>
                                </ul>

                                {/* Popular Badge Glow */}
                                <div className="absolute inset-0 bg-linear-to-r from-accent/5 to-transparent opacity-50 pointer-events-none"></div>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 h-full">
                                <div className="w-12 h-1 bg-primary rounded-full group-hover:w-16 transition-all duration-300"></div>
                                <h3 className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">Enterprise</h3>
                                <div className="text-4xl font-bold text-accent">Custom</div>
                                <p className="text-sm text-primary/70 group-hover:text-primary/80 transition-colors duration-300">
                                    Comprehensive transformation programs
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                        <span className="text-sm text-primary/70">Full-service support</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                        <span className="text-sm text-primary/70">Dedicated team</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                        <span className="text-sm text-primary/70">Custom solutions</span>
                                    </li>
                                </ul>
                            </Card>
                        </motion.div>
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Product Pricing */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Product Solutions</h2>
                        <p className="text-xl text-primary/70">
                            Subscription-based pricing scaled to your firm size
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="space-y-6 max-w-5xl mx-auto">
                        {[
                            {
                                name: "Glynac",
                                description: "Compliance-first AI workspace",
                                price: "Contact for pricing",
                                detail: "Based on firm size & user count",
                                accent: "accent"
                            },
                            {
                                name: "Tollbooth",
                                description: "Automated options execution",
                                price: "Custom pricing",
                                detail: "Per-account or revenue-share models",
                                accent: "primary"
                            },
                            {
                                name: "Prairie Hill Holdings",
                                description: "Institutional real estate investments",
                                price: "Investment-based",
                                detail: "Contact for offering details",
                                accent: "accent"
                            },
                            {
                                name: "Labs & ATS",
                                description: "Marketing and talent services",
                                price: "Project-based",
                                detail: "Custom quotes per engagement",
                                accent: "primary"
                            }
                        ].map((product, index) => (
                            <motion.div key={product.name} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-8">
                                        <div className="flex-1">
                                            <div className={`w-12 h-1 bg-${product.accent} rounded-full mb-4 group-hover:w-16 transition-all duration-300`}></div>
                                            <h3 className={`text-xl font-bold text-primary mb-2 group-hover:text-${product.accent} transition-colors duration-300`}>
                                                {product.name}
                                            </h3>
                                            <p className="text-primary/70 group-hover:text-primary/80 transition-colors duration-300">
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-accent group-hover:scale-105 transition-transform duration-300">
                                                {product.price}
                                            </div>
                                            <p className="text-sm text-primary/70 mt-1">
                                                {product.detail}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${product.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>

                    <AnimatedSection animation="fadeInUp" className="text-center mt-16">
                        <Button href="/contact" variant="accent" size="lg" className="hover:scale-105 transition-transform duration-300">
                            Discuss Pricing
                        </Button>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}