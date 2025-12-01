import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TrendingUp, Shield, Users, Zap } from 'lucide-react';

const useCases = [
    {
        icon: TrendingUp,
        title: 'RIA Growth & Scaling',
        problem: 'Mid-sized RIA struggling to scale operations while maintaining compliance oversight across expanding advisor team.',
        solution: 'Acumen Strategy deployed Glynac for centralized supervision, implemented Tollbooth for systematic income generation, and provided consulting on operational structure.',
        outcome: 'Improved compliance oversight, 40+ advisors onboarded with unified supervision, and enhanced client value proposition through systematic yield strategies.',
        color: 'accent',
    },
    {
        icon: Shield,
        title: 'Compliance Modernization',
        problem: 'Legacy wealth management firm facing audit challenges due to fragmented communication systems and manual compliance processes.',
        solution: 'Strategic consulting to diagnose gaps, followed by Glynac implementation to unify CRM, email, and portfolio data with AI-powered compliance monitoring.',
        outcome: '100% improvement in audit readiness, reduced supervisory burden, and automated risk detection across client communications.',
        color: 'primary',
    },
    {
        icon: Users,
        title: 'Advisor Enablement & Retention',
        problem: 'Independent broker-dealer seeking to differentiate value proposition and retain top-producing advisors amid competitive pressures.',
        solution: 'Acumen Labs developed advisor marketing materials, ATS recruited senior advisors, and Tollbooth provided exclusive income-generation capabilities.',
        outcome: 'Enhanced advisor loyalty through differentiated product offerings, improved recruiting success, and strengthened brand positioning.',
        color: 'accent',
    },
    {
        icon: Zap,
        title: 'Product Partner Onboarding',
        problem: 'Asset manager launching new strategy needing rapid distribution through wealth management channel with compliance alignment.',
        solution: 'Consulting on distribution strategy, Glynac integration for seamless data flow, and ATS for relationship management with key RIA partners.',
        outcome: 'Accelerated time-to-market, compliance-ready distribution infrastructure, and scalable partner onboarding process.',
        color: 'primary',
    },
];

export default function UseCases() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Use Cases</h1>
                    <p className="text-xl leading-relaxed">
                        Real-world applications of Acumen Strategy's integrated consulting and product solutions across wealth management challenges.
                    </p>
                </Container>
            </Section>

            {/* Use Cases */}
            <Section background="muted" padding="lg">
                <Container>
                    <div className="space-y-12 max-w-6xl mx-auto">
                        {useCases.map((useCase, index) => {
                            const Icon = useCase.icon;
                            return (
                                <Card key={useCase.title} className="space-y-6">
                                    <div className="flex items-start gap-6">
                                        <div className={`w-16 h-16 bg-${useCase.color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <Icon className={`h-8 w-8 text-${useCase.color}`} />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <h3 className="text-3xl font-bold text-primary">{useCase.title}</h3>

                                            <div>
                                                <h4 className="font-semibold text-primary/70 mb-2">Business Challenge</h4>
                                                <p className="text-primary/70 leading-relaxed">{useCase.problem}</p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-primary/70 mb-2">Acumen Solution</h4>
                                                <p className="text-primary/70 leading-relaxed">{useCase.solution}</p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-primary/70 mb-2">Outcome</h4>
                                                <p className="text-primary/70 leading-relaxed">{useCase.outcome}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-lg text-primary/70 mb-6">
                            Ready to solve your firm's unique challenges?
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