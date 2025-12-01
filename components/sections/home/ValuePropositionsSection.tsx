'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import AnimatedCard from '@/components/ui/AnimatedCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StaggerContainer from '@/components/ui/StaggerContainer';
import { Target, Zap, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function ValuePropositionsSection() {
    const propositions = [
        {
            icon: Target,
            title: 'Strategy First',
            subtitle: 'Consulting & Strategic Advisory',
            description: 'Diagnose core challenges. Design roadmaps. Prioritize execution for compliance and growth.',
            href: '/solutions/consulting',
            color: 'accent'
        },
        {
            icon: Zap,
            title: 'Technology & Automation',
            subtitle: 'Glynac — Compliance-first AI',
            description: 'Unified CRM, communications, and portfolio data with supervised AI agents that automate workflows and surface regulatory risk.',
            href: '/solutions/glynac',
            color: 'primary'
        },
        {
            icon: Shield,
            title: 'Products & Distribution',
            subtitle: 'Tollbooth • PHH • ATS',
            description: 'Income-generation automation, institutional real estate products, and talent solutions to scale advisors and product distribution.',
            href: '/solutions',
            color: 'accent'
        }
    ];

    return (
        <Section background="muted" padding="lg">
            <Container>
                <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Comprehensive Solutions for Wealth Management
                    </h2>
                    <p className="text-lg text-primary/70 max-w-3xl mx-auto">
                        From strategic consulting to cutting-edge technology and innovative products
                    </p>
                </AnimatedSection>

                <StaggerContainer className="grid md:grid-cols-3 gap-8">
                    {propositions.map((prop, index) => {
                        const IconComponent = prop.icon;
                        return (
                            <motion.div key={prop.title} variants={fadeInUp}>
                                <AnimatedCard className="h-full flex flex-col">
                                    <div className="space-y-4 flex-1">
                                        <div className={`w-12 h-12 bg-${prop.color}/10 rounded-lg flex items-center justify-center`}>
                                            <IconComponent className={`h-6 w-6 text-${prop.color}`} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-primary">{prop.title}</h3>
                                        <p className={`text-sm font-semibold text-${prop.color}`}>{prop.subtitle}</p>
                                        <p className="text-primary/70 leading-relaxed flex-1">
                                            {prop.description}
                                        </p>
                                    </div>
                                    <Link
                                        href={prop.href}
                                        className={`inline-flex items-center text-sm font-medium text-${prop.color} hover:text-${prop.color}/80 transition-colors mt-4 group`}
                                    >
                                        Learn more
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </AnimatedCard>
                            </motion.div>
                        );
                    })}
                </StaggerContainer>
            </Container>
        </Section>
    );
}