import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export default function Pricing() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Pricing & Engagements</h1>
                    <p className="text-xl leading-relaxed">
                        Flexible engagement models designed to align with your firm's needs and growth trajectory.
                    </p>
                </Container>
            </Section>

            {/* Consulting Engagements */}
            <Section background="white" padding="lg">
                <Container>
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold text-primary mb-4">Advisory & Consulting</h2>
                        <p className="text-lg text-primary/70">
                            Strategic engagements tailored to your transformation goals
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <Card className="space-y-6">
                            <h3 className="text-xl font-bold text-primary">Project-Based</h3>
                            <div className="text-4xl font-bold text-accent">$25k–$75k</div>
                            <p className="text-sm text-primary/70">
                                Defined scope, timeline, and deliverables
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-primary/70">Discovery & diagnosis</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-primary/70">Strategic roadmap</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-primary/70">Implementation plan</span>
                                </li>
                            </ul>
                        </Card>

                        <Card className="border-2 border-accent space-y-6">
                            <div className="text-xs font-semibold text-accent uppercase tracking-wide">Most Popular</div>
                            <h3 className="text-xl font-bold text-primary">Retainer</h3>
                            <div className="text-4xl font-bold text-accent">$10k–$25k/mo</div>
                            <p className="text-sm text-primary/70">
                                Ongoing strategic advisory
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-primary/70">Continuous support</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-primary/70">Priority access</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-primary/70">Product integration</span>
                                </li>
                            </ul>
                        </Card>

                        <Card className="space-y-6">
                            <h3 className="text-xl font-bold text-primary">Enterprise</h3>
                            <div className="text-4xl font-bold text-accent">Custom</div>
                            <p className="text-sm text-primary/70">
                                Comprehensive transformation programs
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-primary/70">Full-service support</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-primary/70">Dedicated team</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-primary/70">Custom solutions</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Product Pricing */}
            <Section background="muted" padding="lg">
                <Container>
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold text-primary mb-4">Product Solutions</h2>
                        <p className="text-lg text-primary/70">
                            Subscription-based pricing scaled to your firm size
                        </p>
                    </div>

                    <div className="space-y-6 max-w-5xl mx-auto">
                        <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-2">Glynac</h3>
                                <p className="text-primary/70">Compliance-first AI workspace</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-accent">Contact for pricing</div>
                                <p className="text-sm text-primary/70">Based on firm size & user count</p>
                            </div>
                        </Card>

                        <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-2">Tollbooth</h3>
                                <p className="text-primary/70">Automated options execution</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-accent">Custom pricing</div>
                                <p className="text-sm text-primary/70">Per-account or revenue-share models</p>
                            </div>
                        </Card>

                        <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-2">Prairie Hill Holdings</h3>
                                <p className="text-primary/70">Institutional real estate investments</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-accent">Investment-based</div>
                                <p className="text-sm text-primary/70">Contact for offering details</p>
                            </div>
                        </Card>

                        <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-2">Labs & ATS</h3>
                                <p className="text-primary/70">Marketing and talent services</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-accent">Project-based</div>
                                <p className="text-sm text-primary/70">Custom quotes per engagement</p>
                            </div>
                        </Card>
                    </div>

                    <div className="text-center mt-12">
                        <Button href="/contact" variant="accent" size="lg">
                            Discuss Pricing
                        </Button>
                    </div>
                </Container>
            </Section>
        </div>
    );
}