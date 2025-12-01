'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { TrendingUp, Shield, Users, Zap, ArrowRight } from 'lucide-react';

export default function UseCasesSection() {
    const useCases = [
        {
            icon: TrendingUp,
            title: 'RIA Growth & Scaling',
            challenge: 'Mid-sized RIA struggling to scale operations while maintaining compliance oversight across expanding advisor team.',
            result: 'Improved compliance oversight, 40+ advisors onboarded with unified supervision, and enhanced client value proposition through systematic yield strategies.'
        },
        {
            icon: Shield,
            title: 'Compliance Modernization',
            challenge: 'Legacy wealth management firm facing audit challenges due to fragmented communication systems and manual compliance processes.',
            result: '100% improvement in audit readiness, reduced supervisory burden, and automated risk detection across client communications.'
        },
        {
            icon: Users,
            title: 'Advisor Enablement',
            challenge: 'Independent broker-dealer seeking to differentiate value proposition and retain top-producing advisors amid competitive pressures.',
            result: 'Enhanced advisor loyalty through differentiated product offerings, improved recruiting success, and strengthened brand positioning.'
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
                    {useCases.map((useCase) => {
                        const IconComponent = useCase.icon;
                        return (
                            <div
                                key={useCase.title}
                                className="p-8 rounded-lg border border-primary/10"
                            >
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                                    <IconComponent className="h-6 w-6 text-accent" />
                                </div>

                                <h3 className="text-xl font-bold text-primary mb-4">
                                    {useCase.title}
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-primary/50 mb-2">Challenge</p>
                                        <p className="text-sm text-primary/70 leading-relaxed">
                                            {useCase.challenge}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-primary/50 mb-2">Outcome</p>
                                        <p className="text-sm text-primary/70 leading-relaxed">
                                            {useCase.result}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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