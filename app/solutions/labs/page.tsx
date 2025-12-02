// app/solutions/labs/page.tsx
'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StaggerContainer from '@/components/ui/StaggerContainer';
import { fadeInUp } from '@/lib/animations';

export default function Labs() {
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
                                Acumen Labs — Marketing & Brand Implementation
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Full-service marketing execution including websites, brand development, content creation, and advisor enablement materials.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="pt-4"
                            >
                                <Button href="/contact" variant="secondary" size="lg">
                                    Request Services
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Marketing Services */}
            <Section background="white" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">Marketing Services</h2>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Website Development",
                                description: "Custom websites designed for wealth management firms with compliance-friendly content management and lead capture.",
                                accent: "accent"
                            },
                            {
                                title: "Brand Development",
                                description: "Logo design, brand guidelines, and visual identity systems that build trust and credibility.",
                                accent: "primary"
                            },
                            {
                                title: "Content Creation",
                                description: "Whitepapers, case studies, blog posts, and educational content to position your firm as a thought leader.",
                                accent: "accent"
                            },
                            {
                                title: "Advisor Enablement",
                                description: "Sales collateral, presentation templates, and marketing materials designed for advisor use and compliance review.",
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

            {/* Our Approach */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">Our Approach</h2>
                        <p className="text-xl text-primary/70 text-center max-w-3xl mx-auto">
                            Marketing that combines creative excellence with compliance expertise
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Compliance-First Design",
                                description: "Every marketing piece is designed with regulatory requirements in mind, ensuring your materials pass compliance review.",
                                accent: "accent",
                                number: "01"
                            },
                            {
                                title: "Industry Expertise",
                                description: "Deep understanding of wealth management marketing challenges and what resonates with your target audience.",
                                accent: "primary",
                                number: "02"
                            },
                            {
                                title: "Brand Consistency",
                                description: "Cohesive visual identity across all touchpoints that builds trust and recognition in the marketplace.",
                                accent: "accent",
                                number: "03"
                            }
                        ].map((approach, index) => (
                            <motion.div key={approach.title} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 h-full text-center overflow-hidden relative">
                                    <div className={`text-6xl font-bold text-${approach.accent}/20 group-hover:text-${approach.accent}/30 transition-colors duration-300 mb-4`}>
                                        {approach.number}
                                    </div>

                                    <div className={`w-16 h-1 bg-${approach.accent} rounded-full mx-auto group-hover:w-20 transition-all duration-300`}></div>

                                    <h3 className={`text-xl font-bold text-primary group-hover:text-${approach.accent} transition-colors duration-300`}>
                                        {approach.title}
                                    </h3>

                                    <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                        {approach.description}
                                    </p>

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${approach.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Deliverables */}
            <Section background="white" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">What You Get</h2>
                        <p className="text-xl text-primary/70 text-center max-w-3xl mx-auto">
                            Professional marketing assets designed for the wealth management industry
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="space-y-6 max-w-5xl mx-auto">
                        {[
                            {
                                category: "Digital Presence",
                                items: "Professional websites, landing pages, email templates, social media assets",
                                accent: "accent"
                            },
                            {
                                category: "Brand Identity",
                                items: "Logo design, brand guidelines, color palettes, typography systems, business cards",
                                accent: "primary"
                            },
                            {
                                category: "Sales Materials",
                                items: "Pitch decks, one-pagers, brochures, case studies, product sheets",
                                accent: "accent"
                            },
                            {
                                category: "Educational Content",
                                items: "Whitepapers, market updates, blog posts, webinar materials, thought leadership pieces",
                                accent: "primary"
                            }
                        ].map((deliverable, index) => (
                            <motion.div key={deliverable.category} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
                                    <div className="p-8">
                                        <div className={`w-12 h-1 bg-${deliverable.accent} rounded-full mb-6 group-hover:w-16 transition-all duration-300`}></div>

                                        <h3 className={`text-xl font-bold text-primary mb-3 group-hover:text-${deliverable.accent} transition-colors duration-300`}>
                                            {deliverable.category}
                                        </h3>

                                        <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                            {deliverable.items}
                                        </p>
                                    </div>

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${deliverable.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* CTA */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp" className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Ready to Elevate Your Brand?</h2>
                        <p className="text-xl text-primary/70 mb-8 max-w-3xl mx-auto">
                            Partner with Acumen Labs for marketing that combines creative excellence with compliance expertise.
                        </p>
                        <Button href="/contact" variant="accent" size="lg" className="hover:scale-105 transition-transform duration-300">
                            Request Services
                        </Button>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}