// components/sections/home/SolutionsSection.tsx
'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';

export default function SolutionsSection() {
    const solutions = [
        {
            name: 'Consulting',
            tagline: 'Strategic Advisory & Execution',
            description: 'Diagnose challenges, design compliant roadmaps, and prioritize execution across strategy, compliance, technology, and growth.',
            href: '/solutions/consulting',
            accent: 'accent'
        },
        {
            name: 'Glynac',
            tagline: 'Compliance-First AI Workspace',
            description: 'Unified CRM, communications, and portfolio data with supervised AI agents that automate workflows and surface regulatory risk.',
            href: '/solutions/glynac',
            accent: 'primary'
        },
        {
            name: 'Tollbooth',
            tagline: 'Automated Options Execution',
            description: 'Rules-based covered call and options automation that generates systematic income while preserving individual equity positions.',
            href: '/solutions/tollbooth',
            accent: 'accent'
        },
        {
            name: 'Prairie Hill Holdings',
            tagline: 'Institutional NNN Real Estate',
            description: 'Institutional-quality triple-net lease (NNN) real estate solutions for advisors and high-net-worth clients with tax-efficient structures.',
            href: '/solutions/phh',
            accent: 'primary'
        },
        {
            name: 'Acumen Labs',
            tagline: 'Marketing & Brand Implementation',
            description: 'Full-service marketing execution including websites, brand development, content creation, and advisor enablement materials.',
            href: '/solutions/labs',
            accent: 'accent'
        },
        {
            name: 'Acumen Talent Solutions',
            tagline: 'Recruiting & Executive Search',
            description: 'Specialized talent acquisition for wealth management firms, from advisor recruiting to C-suite executive placements.',
            href: '/solutions/ats',
            accent: 'primary'
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutions.map((solution) => (
                        <Link
                            key={solution.name}
                            href={solution.href}
                            className="group block"
                        >
                            <div className="h-full p-8 rounded-xl border border-primary/10 hover:border-accent/30 hover:bg-muted/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                {/* Color accent bar */}
                                <div className={`w-12 h-1 bg-${solution.accent} rounded-full mb-6 group-hover:w-16 transition-all duration-300`}></div>

                                <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                                    {solution.name}
                                </h3>

                                <p className={`text-sm font-semibold text-${solution.accent} mb-4 opacity-80`}>
                                    {solution.tagline}
                                </p>

                                <p className="text-primary/70 leading-relaxed mb-6 line-clamp-3">
                                    {solution.description}
                                </p>

                                <div className="flex items-center text-sm font-medium text-accent group-hover:gap-2 transition-all duration-300">
                                    Learn more
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </Section>
    );
}