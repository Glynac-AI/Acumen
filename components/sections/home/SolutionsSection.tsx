'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { Target, Brain, TrendingUp, Building2, Palette, Users, ArrowRight } from 'lucide-react';

export default function SolutionsSection() {
    const solutions = [
        {
            icon: Target,
            name: 'Consulting',
            tagline: 'Strategic Advisory & Execution',
            description: 'Diagnose challenges, design compliant roadmaps, and prioritize execution across strategy, compliance, technology, and growth.',
            href: '/solutions/consulting',
        },
        {
            icon: Brain,
            name: 'Glynac',
            tagline: 'Compliance-First AI Workspace',
            description: 'Unified CRM, communications, and portfolio data with supervised AI agents that automate workflows and surface regulatory risk.',
            href: '/solutions/glynac',
        },
        {
            icon: TrendingUp,
            name: 'Tollbooth',
            tagline: 'Automated Options Execution',
            description: 'Rules-based covered call and options automation that generates systematic income while preserving individual equity positions.',
            href: '/solutions/tollbooth',
        },
        {
            icon: Building2,
            name: 'Prairie Hill Holdings',
            tagline: 'Institutional NNN Real Estate',
            description: 'Institutional-quality triple-net lease (NNN) real estate solutions for advisors and high-net-worth clients with tax-efficient structures.',
            href: '/solutions/phh',
        },
        {
            icon: Palette,
            name: 'Acumen Labs',
            tagline: 'Marketing & Brand Implementation',
            description: 'Full-service marketing execution including websites, brand development, content creation, and advisor enablement materials.',
            href: '/solutions/labs',
        },
        {
            icon: Users,
            name: 'Acumen Talent Solutions',
            tagline: 'Recruiting & Executive Search',
            description: 'Specialized talent acquisition for wealth management firms, from advisor recruiting to C-suite executive placements.',
            href: '/solutions/ats',
        }
    ];

    return (
        <Section background="white" padding="lg">
            <Container>
                <div className="max-w-3xl mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Solutions
                    </h2>
                    <p className="text-xl text-primary/70 leading-relaxed">
                        Acumen Strategy activates a suite of products and services only when your strategy requires them. Each solution is designed to integrate seamlessly with your existing operations while maintaining regulatory compliance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((solution) => {
                        const IconComponent = solution.icon;
                        return (
                            <Link
                                key={solution.name}
                                href={solution.href}
                                className="group"
                            >
                                <div className="h-full p-8 rounded-lg border border-primary/10 hover:border-accent/30 hover:bg-muted/30 transition-all">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                            <IconComponent className="h-6 w-6 text-accent" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                        {solution.name}
                                    </h3>

                                    <p className="text-sm font-semibold text-accent mb-3">
                                        {solution.tagline}
                                    </p>

                                    <p className="text-primary/70 leading-relaxed mb-4">
                                        {solution.description}
                                    </p>

                                    <div className="flex items-center text-sm font-medium text-accent group-hover:gap-2 transition-all">
                                        Learn more
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}