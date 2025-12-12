'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

export default function ProcessSection() {
    const steps = [
        {
            number: '01',
            title: 'Diagnose',
            description: 'Deep discovery across compliance, operations, and technology to identify gaps and opportunities.'
        },
        {
            number: '02',
            title: 'Design',
            description: 'Build a regulatory-aligned roadmap and operating model tailored to your firm\'s unique needs.'
        },
        {
            number: '03',
            title: 'Deliver',
            description: 'Activate the right Acumen products and services, then measure results against defined outcomes.'
        }
    ];

    return (
        <Section background="muted" padding="lg">
            <Container>
                <div className="max-w-3xl mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        How We Work
                    </h2>
                    <p className="text-xl text-primary/70 leading-relaxed">
                        A proven three-step approach to transformation
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 max-w-6xl">
                    {steps.map((step) => (
                        <div key={step.number} className="relative">
                            <div className="text-7xl font-bold text-accent/10 mb-4">
                                {step.number}
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-3">
                                {step.title}
                            </h3>
                            <p className="text-primary/70 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}