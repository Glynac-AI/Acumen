// app/solutions/glynac/page.tsx
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Brain, Shield, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Glynac() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                        <Brain className="h-5 w-5" />
                        <span className="text-sm font-semibold">Compliance-First AI</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Glynac — Compliance-First AI Workspace for Wealth Managers
                    </h1>
                    <p className="text-xl leading-relaxed mb-8">
                        Built for regulated environments, Glynac unifies CRM, communications, and investment data into one supervised AI layer. Automate compliance workflows, surface risk, and improve audit readiness.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button href="/contact" variant="secondary" size="lg">
                            Request a Demo
                        </Button>
                        <Button href="/resources" variant="accent" size="lg">
                            Download Product Brief
                        </Button>
                    </div>
                </Container>
            </Section>

            {/* Problem Statement */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">The Challenge</h2>
                    <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                        <p>
                            Wealth management firms operate across fragmented systems—separate platforms for CRM, email, portfolio management, and compliance tracking. This data fragmentation creates massive supervision burdens for compliance teams and exposes firms to regulatory risk.
                        </p>
                        <p>
                            Traditional solutions require advisors to manually log activities, switch between multiple applications, and rely on periodic audits to catch compliance issues. By the time a problem is discovered, it's often too late.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Solution Features */}
            <Section background="muted" padding="lg">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-primary mb-4">The Glynac Solution</h2>
                        <p className="text-lg text-primary/70 max-w-2xl mx-auto">
                            AI agents that work within your compliance framework, not around it
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Card className="space-y-4">
                            <div className="w-12 h-1 bg-accent rounded-full mb-6"></div>
                            <h3 className="text-xl font-bold text-primary">Knowledge Agent</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Contextual AI that understands your firm's policies, procedures, and compliance requirements
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-1 bg-primary rounded-full mb-6"></div>
                            <h3 className="text-xl font-bold text-primary">Compliance Monitor</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Real-time supervision of communications and transactions with automatic flagging of regulatory risks
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-1 bg-accent rounded-full mb-6"></div>
                            <h3 className="text-xl font-bold text-primary">CRM Automation</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Intelligent data capture and client record management that reduces manual entry by 80%
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-1 bg-primary rounded-full mb-6"></div>
                            <h3 className="text-xl font-bold text-primary">Risk Alerting</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Proactive identification of compliance gaps and regulatory exposure before audits
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Benefits */}
            <Section background="white" padding="lg">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Benefits</h2>
                            <ul className="space-y-4">
                                {[
                                    'Improved audit readiness with complete data lineage and supervision logs',
                                    'Reduced compliance burden through automated workflow approvals',
                                    'Enhanced advisor productivity with AI-powered client insights',
                                    'Better risk management with real-time regulatory monitoring',
                                    'Centralized data platform eliminating fragmented systems',
                                ].map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-lg text-primary/70">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Card className="bg-gradient-to-br from-primary to-accent text-white space-y-6">
                            <h3 className="text-2xl font-bold">Deployment Process</h3>
                            <div className="space-y-6">
                                {[
                                    { phase: 'Pilot', duration: '2-4 weeks', description: 'Deploy with select compliance team members and test supervision workflows' },
                                    { phase: 'Onboarding', duration: '4-8 weeks', description: 'Roll out to advisors with training and integration of existing data sources' },
                                    { phase: 'Production', duration: 'Ongoing', description: 'Full deployment with continuous monitoring, optimization, and support' },
                                ].map((step, index) => (
                                    <div key={step.phase} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">
                                                {step.phase} <span className="text-sm font-normal text-white/70">({step.duration})</span>
                                            </h4>
                                            <p className="text-sm text-white/80">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg" className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Ready to Transform Your Compliance Operations?
                    </h2>
                    <p className="text-lg text-primary/70 mb-8 max-w-3xl mx-auto">
                        Schedule a demo to see Glynac in action and discuss how it can be customized for your firm's specific regulatory requirements.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="accent" size="lg">
                            Request a Demo
                        </Button>
                        <Button href="/resources" variant="secondary" size="lg">
                            Download Product Brief
                        </Button>
                    </div>
                </Container>
            </Section>
        </div>
    );
}