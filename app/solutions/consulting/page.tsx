// app/solutions/consulting/page.tsx
'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StaggerContainer from '@/components/ui/StaggerContainer';

import { fadeInUp } from '@/lib/animations';

export default function Consulting() {
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
                                Consulting & Strategic Advisory
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Diagnose core challenges. Design roadmaps. Prioritize execution for compliance and growth.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="pt-4"
                            >
                                <Button href="/contact" variant="secondary" size="lg">
                                    Book a Consultation
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Our Approach - Enhanced Cards */}
            <Section background="white" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">Our Consulting Approach</h2>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Diagnose",
                                description: "Deep discovery across compliance, operations, and technology to identify gaps and opportunities.",
                                accent: "accent",
                                number: "01"
                            },
                            {
                                title: "Design",
                                description: "Build a regulatory-aligned roadmap and operating model tailored to your firm's unique needs.",
                                accent: "primary",
                                number: "02"
                            },
                            {
                                title: "Deliver",
                                description: "Activate the right Acumen products and services, then measure results against defined outcomes.",
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

            {/* Service Areas - Premium Layout */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">Strategic Advisory Services</h2>
                        <p className="text-xl text-primary/70 text-center max-w-3xl mx-auto">
                            Comprehensive support across strategy, compliance, technology, and growth
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="space-y-6 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Compliance & Regulatory Strategy",
                                description: "Navigate regulatory requirements, build audit-ready processes, and implement supervision frameworks.",
                                accent: "accent"
                            },
                            {
                                title: "Technology Integration & Implementation",
                                description: "Integrate and optimize technology solutions for CRM, portfolio management, and communications through our Glynac platform.",
                                accent: "primary"
                            },
                            {
                                title: "Growth & Distribution Strategy",
                                description: "Design advisor enablement programs, product distribution models, and client acquisition strategies.",
                                accent: "accent"
                            },
                            {
                                title: "Operational Transformation",
                                description: "Streamline workflows, improve efficiency, and build scalable operating models for growth.",
                                accent: "primary"
                            }
                        ].map((service, index) => (
                            <motion.div key={service.title} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
                                    <div className="p-8">
                                        <div className={`w-12 h-1 bg-${service.accent} rounded-full mb-6 group-hover:w-16 transition-all duration-300`}></div>

                                        <h3 className={`text-xl font-bold text-primary mb-3 group-hover:text-${service.accent} transition-colors duration-300`}>
                                            {service.title}
                                        </h3>

                                        <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${service.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>

                    <AnimatedSection animation="fadeInUp" className="text-center mt-16">
                        <Button href="/contact" variant="accent" size="lg" className="hover:scale-105 transition-transform duration-300">
                            Book a Consultation
                        </Button>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}