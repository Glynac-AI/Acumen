import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Users, Search, Target, Award } from 'lucide-react';

export default function ATS() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Acumen Talent Solutions — Recruiting & Executive Search
                    </h1>
                    <p className="text-xl leading-relaxed mb-8">
                        Specialized talent acquisition for wealth management firms, from advisor recruiting to C-suite executive placements.
                    </p>
                    <Button href="/contact" variant="secondary" size="lg">
                        Schedule a Call
                    </Button>
                </Container>
            </Section>

            {/* Services */}
            <Section background="white" padding="lg">
                <Container>
                    <h2 className="text-4xl font-bold text-primary mb-12 text-center">Talent Services</h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Users className="h-8 w-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">Advisor Recruiting</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Identify and recruit experienced financial advisors who align with your firm's culture and growth strategy.
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Search className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">Executive Search</h3>
                            <p className="text-primary/70 leading-relaxed">
                                C-suite and senior leadership placements for RIAs, broker-dealers, and wealth management firms.
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Target className="h-8 w-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">Practice Transitions</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Support for advisor practice acquisitions, succession planning, and team integrations.
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Award className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">Talent Strategy</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Build organizational structures, compensation models, and retention programs for sustainable growth.
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Process */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-primary mb-4">Our Process</h2>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-3">1. Discovery & Scoping</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Understand your firm's culture, growth plans, and ideal candidate profile.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-3">2. Search & Outreach</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Leverage our network and proprietary database to identify qualified candidates.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-3">3. Screening & Presentation</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Conduct thorough interviews and due diligence before presenting shortlisted candidates.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-3">4. Placement & Onboarding</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Support offer negotiation, transition planning, and successful integration.
                            </p>
                        </Card>
                    </div>

                    <div className="text-center mt-12">
                        <Button href="/contact" variant="accent" size="lg">
                            Schedule a Call
                        </Button>
                    </div>
                </Container>
            </Section>
        </div>
    );
}