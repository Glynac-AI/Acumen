// components/sections/home/UseCasesSection.tsx
'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function UseCasesSection() {
    const useCases = [
        {
            title: 'AI-Powered Compliance Automation',
            challenge: 'Mid-sized RIA struggling with manual compliance workflows and fragmented communication systems.',
            result: 'Implemented AI workspace reducing compliance burden by 70% while improving audit readiness.',
            accent: 'accent'
        },
        {
            title: 'Systematic Income Generation',
            challenge: 'Broker-dealer seeking differentiated options strategies while preserving individual client holdings.',
            result: 'Deployed automated platform generating consistent income and attracting $200M+ in new assets.',
            accent: 'primary'
        },
        {
            title: 'Technology-Driven Growth',
            challenge: 'Legacy firm facing competitive pressures from modern fintech-enabled competitors.',
            result: 'Integrated technology platform reducing operational costs 40% and accelerating growth 60%.',
            accent: 'accent'
        }
    ];

    return (
        <Section background="white" padding="lg">
            <Container>
                <div className="max-w-3xl mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Real-World Impact
                    </h2>
                    <p className="text-xl text-primary/70 leading-relaxed">
                        How wealth management firms use our technology platform to solve complex operational and compliance challenges
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {useCases.map((useCase, index) => (
                        <div
                            key={useCase.title}
                            className="group"
                        >
                            <div className="h-full p-8 rounded-xl border border-primary/10 hover:border-accent/30 hover:bg-muted/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                {/* Subtle accent bar */}
                                <div className={`w-12 h-1 bg-${useCase.accent} rounded-full mb-6 group-hover:w-16 transition-all duration-300`}></div>

                                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                                    {useCase.title}
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-primary/50 mb-2 uppercase tracking-wide">
                                            Challenge
                                        </p>
                                        <p className="text-sm text-primary/70 leading-relaxed">
                                            {useCase.challenge}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-primary/50 mb-2 uppercase tracking-wide">
                                            Outcome
                                        </p>
                                        <p className="text-sm text-primary/70 leading-relaxed">
                                            {useCase.result}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/use-cases">
                        <Button variant="accent" size="lg">
                            View All Use Cases
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </Container>
        </Section>
    );
}