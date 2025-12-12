// components/sections/home/CTASection.tsx
'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    return (
        <Section background="muted" padding="lg">
            <Container maxWidth="lg">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Ready to Modernize Your Operations?
                    </h2>
                    <p className="text-xl text-primary/70 mb-8 leading-relaxed">
                        Request platform access to see how our technology solutions can transform your wealth management practice.
                    </p>
                    <Button href="/contact" variant="accent" size="lg">
                        Request Platform Access
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </Container>
        </Section>
    );
}