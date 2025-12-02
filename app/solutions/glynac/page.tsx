// app/solutions/glynac/page.tsx
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

export default function Glynac() {
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
                                Glynac - Compliance-First AI Workspace for Wealth Managers
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Built for regulated environments, Glynac unifies CRM, communications, and investment data into one supervised AI layer. Automate compliance workflows, surface risk, and improve audit readiness.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                            >
                                <Button href="/contact" variant="secondary" size="lg">
                                    Request a Demo
                                </Button>
                                <Button href="/resources" variant="accent" size="lg">
                                    Download Product Brief
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Problem Statement */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">The Challenge</h2>
                        <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                            <p>
                                Wealth management firms operate across fragmented systems—separate platforms for CRM, email, portfolio management, and compliance tracking. This data fragmentation creates massive supervision burdens for compliance teams and exposes firms to regulatory risk.
                            </p>
                            <p>
                                Traditional solutions require advisors to manually log activities, switch between multiple applications, and rely on periodic audits to catch compliance issues. By the time a problem is discovered, it's often too late.
                            </p>
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>

            {/* Solution Features */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">The Glynac Solution</h2>
                        <p className="text-xl text-primary/70 max-w-3xl mx-auto">
                            AI agents that work within your compliance framework, not around it
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Knowledge Agent",
                                description: "Contextual AI that understands your firm's policies, procedures, and compliance requirements",
                                accent: "accent"
                            },
                            {
                                title: "Compliance Monitor",
                                description: "Real-time supervision of communications and transactions with automatic flagging of regulatory risks",
                                accent: "primary"
                            },
                            {
                                title: "CRM Automation",
                                description: "Intelligent data capture and client record management that reduces manual entry by 80%",
                                accent: "accent"
                            },
                            {
                                title: "Risk Alerting",
                                description: "Proactive identification of compliance gaps and regulatory exposure before audits",
                                accent: "primary"
                            }
                        ].map((feature, index) => (
                            <motion.div key={feature.title} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 space-y-6 h-full overflow-hidden relative">
                                    <div className={`w-12 h-1 bg-${feature.accent} rounded-full group-hover:w-16 transition-all duration-300`}></div>

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

            {/* Benefits */}
            <Section background="white" padding="lg">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <AnimatedSection animation="fadeInLeft">
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Benefits</h2>
                            <ul className="space-y-4">
                                {[
                                    'Improved audit readiness with complete data lineage and supervision logs',
                                    'Reduced compliance burden through automated workflow approvals',
                                    'Enhanced advisor productivity with AI-powered client insights',
                                    'Better risk management with real-time regulatory monitoring',
                                    'Centralized data platform eliminating fragmented systems',
                                ].map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                                        <span className="text-lg text-primary/70">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInRight">
                            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-linear-to-br from-primary to-accent text-white space-y-6 overflow-hidden relative">
                                <div className="w-16 h-1 bg-white/30 rounded-full group-hover:w-20 transition-all duration-300"></div>

                                <h3 className="text-2xl font-bold">Deployment Process</h3>

                                <div className="space-y-6">
                                    {[
                                        { phase: 'Pilot', duration: '2-4 weeks', description: 'Deploy with select compliance team members and test supervision workflows' },
                                        { phase: 'Onboarding', duration: '4-8 weeks', description: 'Roll out to advisors with training and integration of existing data sources' },
                                        { phase: 'Production', duration: 'Ongoing', description: 'Full deployment with continuous monitoring, optimization, and support' },
                                    ].map((step, index) => (
                                        <div key={step.phase} className="flex gap-4">
                                            <div className="shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold mb-1">
                                                    {step.phase} <span className="text-sm font-normal text-white/70">({step.duration})</span>
                                                </h4>
                                                <p className="text-sm text-white/80">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Subtle pattern overlay */}
                                <div className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
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
                            Ready to Transform Your Compliance Operations?
                        </h2>
                        <p className="text-xl text-primary/70 mb-8 max-w-3xl mx-auto">
                            Schedule a demo to see Glynac in action and discuss how it can be customized for your firm's specific regulatory requirements.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="accent" size="lg" className="hover:scale-105 transition-transform duration-300">
                                Request a Demo
                            </Button>
                            <Button href="/resources" variant="secondary" size="lg">
                                Download Product Brief
                            </Button>
                        </div>
                    </AnimatedSection>
                </Container>
            </Section>
        </div>
    );
}