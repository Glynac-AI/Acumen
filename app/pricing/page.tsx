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
                                Pricing
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Flexible pricing models designed to scale with your firm's growth and technology needs.
                            </motion.p>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Platform Pricing */}
            <Section background="white" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Platform Solutions</h2>
                        <p className="text-xl text-primary/70">
                            Subscription-based pricing for our technology platform and products
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="space-y-6 max-w-5xl mx-auto">
                        {[
                            {
                                name: "Glynac",
                                description: "Compliance-first AI workspace",
                                price: "Contact for pricing",
                                detail: "Based on firm size, user count, and feature requirements",
                                accent: "accent",
                                features: [
                                    "AI-powered compliance monitoring",
                                    "Unified CRM and communications",
                                    "Real-time risk assessment",
                                    "Integrated reporting and analytics"
                                ]
                            },
                            {
                                name: "Tollbooth",
                                description: "Automated options execution",
                                price: "Custom pricing",
                                detail: "Per-account fees or revenue-share models available",
                                accent: "primary",
                                features: [
                                    "Rules-based automation",
                                    "Individual position preservation",
                                    "Advisor-level overlays",
                                    "Custodian integration"
                                ]
                            },
                            {
                                name: "Prairie Hill Holdings",
                                description: "Institutional real estate investments",
                                price: "Investment-based",
                                detail: "Minimum investment requirements apply",
                                accent: "accent",
                                features: [
                                    "Triple-net lease properties",
                                    "Tax-efficient structures",
                                    "Quarterly distributions",
                                    "Institutional-grade assets"
                                ]
                            },
                            {
                                name: "Acumen Compliance Institute",
                                description: "Education and certification programs",
                                price: "Program-based",
                                detail: "Contact for course catalog and pricing",
                                accent: "primary",
                                features: [
                                    "Professional certifications",
                                    "Compliance training",
                                    "Technology workshops",
                                    "Continuing education credits"
                                ]
                            }
                        ].map((product, index) => (
                            <motion.div key={product.name} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
                                    <div className="p-8">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                                            <div className="flex-1">
                                                <div className={`w-12 h-1 bg-${product.accent} rounded-full mb-4 group-hover:w-16 transition-all duration-300`}></div>
                                                <h3 className={`text-2xl font-bold text-primary mb-2 group-hover:text-${product.accent} transition-colors duration-300`}>
                                                    {product.name}
                                                </h3>
                                                <p className="text-primary/70 mb-6 group-hover:text-primary/80 transition-colors duration-300">
                                                    {product.description}
                                                </p>

                                                {/* Features */}
                                                <ul className="space-y-2">
                                                    {product.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-center gap-2 text-sm text-primary/70">
                                                            <CheckCircle2 className={`h-4 w-4 text-${product.accent} shrink-0`} />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="lg:text-right shrink-0">
                                                <div className="text-3xl font-bold text-accent group-hover:scale-105 transition-transform duration-300 mb-2">
                                                    {product.price}
                                                </div>
                                                <p className="text-sm text-primary/70 max-w-xs">
                                                    {product.detail}
                                                </p>
                                            </div>
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
                            Request Custom Quote
                        </Button>
                    </AnimatedSection>
                </Container>
            </Section>

            {/* Enterprise Solutions */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                            <div className="p-12 text-center space-y-6">
                                <div className="w-16 h-1 bg-accent rounded-full mx-auto group-hover:w-20 transition-all duration-300"></div>

                                <h3 className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                                    Enterprise & Custom Solutions
                                </h3>

                                <p className="text-lg text-primary/70 leading-relaxed max-w-2xl mx-auto group-hover:text-primary/80 transition-colors duration-300">
                                    Need a custom integration, multi-product deployment, or enterprise-wide implementation? We offer tailored solutions with dedicated support, custom development, and volume pricing.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    <Button href="/contact" variant="accent" size="lg" className="group-hover:scale-105 transition-transform duration-300">
                                        Contact Sales
                                    </Button>
                                    <Button href="/solutions" variant="secondary" size="lg">
                                        View Platform
                                    </Button>
                                </div>
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