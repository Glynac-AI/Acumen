import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { Target, Users, Award } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">About Acumen Strategy</h1>
                    <p className="text-xl leading-relaxed">
                        Acumen Strategy is the strategic advisory and consulting arm of the Acumen ecosystem. We partner with wealth management firms to diagnose challenges, design roadmaps, and deploy integrated solutions across strategy, compliance, technology, and growth.
                    </p>
                </Container>
            </Section>

            {/* Our Approach */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12">Our Approach</h2>

                    <div className="space-y-12">
                        <div>
                            <h3 className="text-3xl font-bold text-accent mb-4">Strategy-Led Transformation</h3>
                            <p className="text-lg text-primary/70 leading-relaxed">
                                We begin every engagement with deep discovery to understand your firm's unique challenges, regulatory requirements, and growth objectives. Our consultants work alongside your leadership team to diagnose operational gaps, technology inefficiencies, and compliance risks before recommending solutions.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-primary mb-4">Compliance-First Design</h3>
                            <p className="text-lg text-primary/70 leading-relaxed">
                                Every roadmap we design is built with regulatory alignment at its core. Whether implementing new technology, launching products, or scaling operations, we ensure your transformation maintains audit readiness and reduces supervisory burden while enabling growth.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-accent mb-4">Measured Execution</h3>
                            <p className="text-lg text-primary/70 leading-relaxed">
                                We don't just deliver recommendations—we activate solutions and measure results. By deploying the right combination of Acumen products (Glynac, Tollbooth, PHH, Labs, ATS), we help you execute on strategy with confidence and track measurable outcomes.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Values */}
            <Section background="muted" padding="lg">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Values</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                                    <Target className="h-8 w-8 text-accent" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">Client-First</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Your success is our measure. We align our incentives with your outcomes and build solutions that scale with your firm.
                            </p>
                        </Card>

                        <Card className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Award className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">Excellence</h3>
                            <p className="text-primary/70 leading-relaxed">
                                We bring institutional-grade expertise to every engagement, from regulatory compliance to technology implementation.
                            </p>
                        </Card>

                        <Card className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                                    <Users className="h-8 w-8 text-accent" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">Partnership</h3>
                            <p className="text-primary/70 leading-relaxed">
                                We work as an extension of your team, embedding ourselves in your operations to drive sustainable change.
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Leadership */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16 text-center">Leadership Team</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-1">Sebastian Pantoja</h3>
                            <p className="text-accent font-semibold mb-4">Founder & CEO</p>
                            <p className="text-primary/70 leading-relaxed">
                                15+ years building wealth management technology and advisory practices with deep expertise in regulatory compliance and product development.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-1">Gurinder Khera</h3>
                            <p className="text-accent font-semibold mb-4">Chief Strategy Officer</p>
                            <p className="text-primary/70 leading-relaxed">
                                Former senior executive at leading RIA firms, specializing in operational transformation and advisor enablement strategies.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-1">Miguel Rodriguez</h3>
                            <p className="text-accent font-semibold mb-4">Head of Technology</p>
                            <p className="text-primary/70 leading-relaxed">
                                Fintech innovator with expertise in AI/ML applications for compliance and data integration across financial services platforms.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-1">Andrew Chen</h3>
                            <p className="text-accent font-semibold mb-4">Managing Director, Product</p>
                            <p className="text-primary/70 leading-relaxed">
                                Product leader with track record of launching institutional-grade investment solutions for wealth advisors and family offices.
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>
        </div>
    );
}