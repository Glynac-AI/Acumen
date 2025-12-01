'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    return (
        <Section background="gradient" padding="lg" className="text-white">
            <Container maxWidth="lg">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Transform Your Practice?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">
                        Schedule a consultation to discuss how Acumen Strategy can help you achieve your compliance and growth objectives.
                    </p>
                    <Button href="/contact" variant="secondary" size="lg">
                        Book a Consultation
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </Container>
        </Section>
    );
}