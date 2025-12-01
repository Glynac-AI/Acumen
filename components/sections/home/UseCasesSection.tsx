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
            title: 'RIA Growth & Scaling',
            challenge: 'Mid-sized RIA struggling to scale operations while maintaining compliance oversight across expanding advisor team.',
            result: 'Improved compliance oversight, 40+ advisors onboarded with unified supervision, and enhanced client value proposition through systematic yield strategies.',
            accent: 'accent'
        },
        {
            title: 'Compliance Modernization',
            challenge: 'Legacy wealth management firm facing audit challenges due to fragmented communication systems and manual compliance processes.',
            result: '100% improvement in audit readiness, reduced supervisory burden, and automated risk detection across client communications.',
            accent: 'primary'
        },
        {
            title: 'Advisor Enablement',
            challenge: 'Independent broker-dealer seeking to differentiate value proposition and retain top-producing advisors amid competitive pressures.',
            result: 'Enhanced advisor loyalty through differentiated product offerings, improved recruiting success, and strengthened brand positioning.',
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
                        How wealth management firms use Acumen Strategy to solve complex challenges
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {useCases.map((useCase, index) => (
                        <div
                            key={useCase.title}
                            className="group"
                        >
                            <div className="h-full p-8 rounded-xl border border-primary/10 hover:border-accent/30 hover:bg-muted/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                {/* Number indicator instead of icon */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-8 h-8 rounded-full bg-${useCase.accent}/10 border-2 border-${useCase.accent}/20 flex items-center justify-center`}>
                                        <span className={`text-sm font-bold text-${useCase.accent}`}>
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className={`flex-1 h-px bg-gradient-to-r from-${useCase.accent}/30 to-transparent`}></div>
                                </div>

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