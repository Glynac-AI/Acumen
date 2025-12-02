// app/solutions/page.tsx
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

const solutions = [
    {
        name: 'Consulting',
        tagline: 'Strategic Advisory & Execution',
        description: 'Diagnose challenges, design compliant roadmaps, and prioritize execution across strategy, compliance, technology, and growth.',
        href: '/solutions/consulting',
        accent: 'accent',
    },
    {
        name: 'Glynac',
        tagline: 'Compliance-First AI Workspace',
        description: 'Unified CRM, communications, and portfolio data with supervised AI agents that automate workflows and surface regulatory risk.',
        href: '/solutions/glynac',
        accent: 'primary',
    },
    {
        name: 'Tollbooth',
        tagline: 'Automated Options Execution',
        description: 'Rules-based covered call and options automation that generates systematic income while preserving individual equity positions.',
        href: '/solutions/tollbooth',
        accent: 'accent',
    },
    {
        name: 'Prairie Hill Holdings',
        tagline: 'Institutional NNN Real Estate',
        description: 'Institutional-quality triple-net lease (NNN) real estate solutions for advisors and high-net-worth clients with tax-efficient structures.',
        href: '/solutions/phh',
        accent: 'primary',
    },
    {
        name: 'Acumen Labs',
        tagline: 'Marketing & Brand Implementation',
        description: 'Full-service marketing execution including websites, brand development, content creation, and advisor enablement materials.',
        href: '/solutions/labs',
        accent: 'accent',
    },
    {
        name: 'Acumen Talent Solutions',
        tagline: 'Recruiting & Executive Search',
        description: 'Specialized talent acquisition for wealth management firms, from advisor recruiting to C-suite executive placements.',
        href: '/solutions/ats',
        accent: 'primary',
    },
];

export default function Solutions() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Solutions</h1>
                    <p className="text-xl leading-relaxed">
                        Acumen Strategy activates a suite of products and services only when your strategy requires them. Each solution is designed to integrate seamlessly with your existing operations while maintaining regulatory compliance.
                    </p>
                </Container>
            </Section>

            {/* Solutions Grid */}
            <Section background="muted" padding="lg">
                <Container>
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {solutions.map((solution) => (
                            <Card key={solution.name} hover className="space-y-6">
                                <div className={`w-12 h-1 bg-${solution.accent} rounded-full`}></div>
                                <div>
                                    <h3 className="text-2xl font-bold text-primary mb-2">{solution.name}</h3>
                                    <p className={`text-${solution.accent} font-semibold mb-3`}>{solution.tagline}</p>
                                    <p className="text-primary/70 leading-relaxed mb-6">
                                        {solution.description}
                                    </p>
                                    <Link
                                        href={solution.href}
                                        className={`inline-flex items-center text-sm font-medium text-${solution.accent} hover:text-${solution.accent}/80 transition-colors`}
                                    >
                                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-lg text-primary/70 mb-6">
                            Not sure which solutions are right for your firm?
                        </p>
                        <Button href="/contact" variant="accent" size="lg">
                            Book a Consultation
                        </Button>
                    </div>
                </Container>
            </Section>
        </div>
    );
}