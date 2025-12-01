import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TrendingUp, Shield, FileText, CheckCircle2 } from 'lucide-react';

export default function Tollbooth() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-sm font-semibold">Automated Options Execution</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Tollbooth — Advisor-Focused Options Strategy Automation
                    </h1>
                    <p className="text-xl leading-relaxed mb-8">
                        Automate covered-call and options strategies across client accounts, generate systematic income, and preserve individual equity positions with rules-based execution.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button href="/contact" variant="secondary" size="lg">
                            Request a Demo
                        </Button>
                        <Button href="/resources" variant="accent" size="lg">
                            Download Overview
                        </Button>
                    </div>
                </Container>
            </Section>

            {/* What It Does */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">What Tollbooth Does</h2>
                    <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                        <p>
                            Tollbooth is a rules-based covered call and options automation platform designed for advisors seeking to generate systematic income for client portfolios without building an in-house trading desk.
                        </p>
                        <p>
                            The platform executes advisor-defined option strategies across multiple accounts, maintains compliance documentation, and provides detailed performance reporting—all while preserving the underlying equity exposure clients expect.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Features */}
            <Section background="muted" padding="lg">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-primary mb-4">Key Features</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="h-8 w-8 text-accent" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Systematic Income</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Generate consistent premium income through covered calls and cash-secured puts
                            </p>
                        </Card>

                        <Card className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Shield className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Risk Management</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Built-in controls for position sizing, strike selection, and portfolio concentration
                            </p>
                        </Card>

                        <Card className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-accent" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Compliance Ready</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Complete execution logs, audit trails, and regulatory reporting for supervision
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Who Benefits */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Who Benefits</h2>
                    <div className="space-y-4">
                        {[
                            'RIAs seeking to add income strategies without hiring dedicated options traders',
                            'Advisors managing portfolios for yield-focused clients in low-rate environments',
                            'Wealth management firms wanting systematic options execution with built-in supervision',
                            'Practices looking to differentiate with specialized income strategies',
                        ].map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-lg text-primary/70">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Deployment */}
            <Section background="muted" padding="lg">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-primary mb-4">Deployment Process</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { phase: 'Pilot', description: 'Test strategies with select accounts to establish rules and performance baselines' },
                            { phase: 'Managed', description: 'Roll out to additional accounts with ongoing strategy refinement and monitoring' },
                            { phase: 'Scale', description: 'Expand across firm with full automation and integrated reporting from custodians' },
                        ].map((step, index) => (
                            <Card key={step.phase} className="text-center space-y-4">
                                <div className="text-6xl font-bold text-accent/20">{index + 1}</div>
                                <h3 className="text-xl font-bold text-primary">{step.phase}</h3>
                                <p className="text-primary/70 leading-relaxed">{step.description}</p>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg" className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Ready to Add Options Income to Your Practice?
                    </h2>
                    <p className="text-lg text-primary/70 mb-8">
                        Contact us to discuss custom pricing based on your firm's assets and execution volume.
                    </p>
                    <Button href="/contact" variant="accent" size="lg">
                        Request a Demo
                    </Button>
                </Container>
            </Section>
        </div>
    );
}