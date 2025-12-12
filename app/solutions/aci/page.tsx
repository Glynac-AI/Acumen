// app/solutions/aci/page.tsx
'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StaggerContainer from '@/components/ui/StaggerContainer';
import { CheckCircle2, Award, Users, BookOpen } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function ACI() {
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
                                Acumen Compliance Institute
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Professional development, compliance training, and certification programs designed to elevate expertise in wealth management compliance and technology.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                            >
                                <Button href="/contact" variant="secondary" size="lg">
                                    Enroll Now
                                </Button>
                                <Button href="/resources" variant="accent" size="lg">
                                    View Programs
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
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">About ACI</h2>
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                            <p>
                                The Acumen Compliance Institute (ACI) provides industry-leading education and certification programs for wealth management professionals seeking to master modern compliance practices and technology solutions.
                            </p>
                            <p>
                                Our curriculum combines regulatory expertise, practical application, and hands-on technology training to prepare compliance officers, operations leaders, and advisors for the evolving regulatory landscape.
                            </p>
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>

            {/* Programs */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Education Programs</h2>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Compliance Fundamentals",
                                description: "Core regulatory requirements, supervision frameworks, and audit preparation for wealth management firms",
                                icon: BookOpen,
                                accent: "accent"
                            },
                            {
                                title: "Technology Integration",
                                description: "Hands-on training with AI-powered compliance tools, CRM systems, and data management platforms",
                                icon: Users,
                                accent: "primary"
                            },
                            {
                                title: "Advanced Certification",
                                description: "Professional certification programs for compliance officers and operations leaders seeking specialized credentials",
                                icon: Award,
                                accent: "accent"
                            }
                        ].map((program, index) => {
                            const Icon = program.icon;
                            return (
                                <motion.div key={program.title} variants={fadeInUp}>
                                    <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 h-full overflow-hidden relative">
                                        <div className={`w-12 h-12 rounded-xl bg-${program.accent}/10 flex items-center justify-center mb-4 group-hover:bg-${program.accent}/20 transition-all duration-300`}>
                                            <Icon className={`h-6 w-6 text-${program.accent} group-hover:scale-110 transition-transform duration-300`} />
                                        </div>

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
                            );
                        })}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Benefits */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Program Benefits</h2>
                        <div className="space-y-4">
                            {[
                                'Industry-recognized certification credentials',
                                'Practical, hands-on training with real compliance scenarios',
                                'Access to Acumen technology platform during coursework',
                                'Continuing education credits for professional development',
                                'Network with compliance professionals across the industry',
                                'Ongoing support and updated training materials',
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
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp" className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            Ready to Advance Your Compliance Expertise?
                        </h2>
                        <p className="text-xl text-primary/70 mb-8 max-w-3xl mx-auto">
                            Contact us to learn more about enrollment, program schedules, and certification requirements.
                        </p>
                        <Button href="/contact" variant="accent" size="lg" className="hover:scale-105 transition-transform duration-300">
                            Enroll Now
                        </Button>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}