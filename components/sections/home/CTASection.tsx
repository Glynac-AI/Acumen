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
                        Let's Discuss Your Needs
                    </h2>
                    <p className="text-xl text-primary/70 mb-8 leading-relaxed">
                        Schedule a conversation to explore how our solutions can address your firm's compliance and operational challenges.
                    </p>
                    <Button href="/contact" variant="accent" size="lg">
                        Get in Touch
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </Container>
        </Section>
    );
}