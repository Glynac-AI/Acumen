import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Target, TrendingUp, Shield } from 'lucide-react';

export default function Consulting() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Consulting & Strategic Advisory
                    </h1>
                    <p className="text-xl leading-relaxed mb-8">
                        Diagnose core challenges. Design roadmaps. Prioritize execution for compliance and growth.
                    </p>
                    <Button href="/contact" variant="secondary" size="lg">
                        Book a Consultation
                    </Button>
                </Container>
            </Section>

            {/* Our Approach */}
            <Section background="white" padding="lg">
                <Container>
                    <h2 className="text-4xl font-bold text-primary mb-12 text-center">Our Consulting Approach</h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                                    <Target className="h-8 w-8 text-accent" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Diagnose</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Deep discovery across compliance, operations, and technology to identify gaps and opportunities.
                            </p>
                        </Card>

                        <Card className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Design</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Build a regulatory-aligned roadmap and operating model tailored to your firm's unique needs.
                            </p>
                        </Card>

                        <Card className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                                    <Shield className="h-8 w-8 text-accent" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Deliver</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Activate the right Acumen products and services, then measure results against defined outcomes.
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Service Areas - REMOVED "tech stack evaluation" claim */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-primary mb-4">Strategic Advisory Services</h2>
                        <p className="text-lg text-primary/70">
                            Comprehensive support across strategy, compliance, technology, and growth
                        </p>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-3">Compliance & Regulatory Strategy</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Navigate regulatory requirements, build audit-ready processes, and implement supervision frameworks.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-3">Technology Integration & Implementation</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Integrate and optimize technology solutions for CRM, portfolio management, and communications through our Glynac platform.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-3">Growth & Distribution Strategy</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Design advisor enablement programs, product distribution models, and client acquisition strategies.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-primary mb-3">Operational Transformation</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Streamline workflows, improve efficiency, and build scalable operating models for growth.
                            </p>
                        </Card>
                    </div>

                    <div className="text-center mt-12">
                        <Button href="/contact" variant="accent" size="lg">
                            Book a Consultation
                        </Button>
                    </div>
                </Container>
            </Section>
        </div>
    );
}