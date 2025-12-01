import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Target, Brain, TrendingUp, Building2, Palette, Users, ArrowRight } from 'lucide-react';

const solutions = [
    {
        icon: Target,
        name: 'Consulting',
        tagline: 'Strategic Advisory & Execution',
        description: 'Diagnose challenges, design compliant roadmaps, and prioritize execution across strategy, compliance, technology, and growth.',
        href: '/solutions/consulting',
        color: 'accent',
    },
    {
        icon: Brain,
        name: 'Glynac',
        tagline: 'Compliance-First AI Workspace',
        description: 'Unified CRM, communications, and portfolio data with supervised AI agents that automate workflows and surface regulatory risk.',
        href: '/solutions/glynac',
        color: 'primary',
    },
    {
        icon: TrendingUp,
        name: 'Tollbooth',
        tagline: 'Automated Options Execution',
        description: 'Advisor-focused covered call and options strategy automation that generates systematic income while maintaining audit trails.',
        href: '/solutions/tollbooth',
        color: 'accent',
    },
    {
        icon: Building2,
        name: 'Prairie Hill Holdings',
        tagline: 'Institutional Real Estate',
        description: 'Institutional-quality triple-net lease (NNN) real estate investments for advisors and high-net-worth clients with tax-efficient structures.',
        href: '/solutions/phh',
        color: 'primary',
    },
    {
        icon: Palette,
        name: 'Acumen Labs',
        tagline: 'Marketing & Brand Implementation',
        description: 'Full-service marketing execution including websites, brand development, content creation, and advisor enablement materials.',
        href: '/solutions/labs',
        color: 'accent',
    },
    {
        icon: Users,
        name: 'Acumen Talent Solutions',
        tagline: 'Recruiting & Executive Search',
        description: 'Specialized talent acquisition for wealth management firms, from advisor recruiting to C-suite executive placements.',
        href: '/solutions/ats',
        color: 'primary',
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
                        {solutions.map((solution) => {
                            const Icon = solution.icon;
                            return (
                                <Card key={solution.name} hover className="space-y-6">
                                    <div className={`w-12 h-12 bg-${solution.color}/10 rounded-lg flex items-center justify-center`}>
                                        <Icon className={`h-6 w-6 text-${solution.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary mb-2">{solution.name}</h3>
                                        <p className={`text-${solution.color} font-semibold mb-3`}>{solution.tagline}</p>
                                        <p className="text-primary/70 leading-relaxed mb-6">
                                            {solution.description}
                                        </p>
                                        <Link
                                            href={solution.href}
                                            className={`inline-flex items-center text-sm font-medium text-${solution.color} hover:text-${solution.color}/80 transition-colors`}
                                        >
                                            Learn more <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </Card>
                            );
                        })}
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