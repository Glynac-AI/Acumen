import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FileText, Video, BookOpen, ArrowRight } from 'lucide-react';

const resources = [
    {
        type: 'Whitepaper',
        icon: FileText,
        title: 'Compliance-First AI: A Framework for Regulated Firms',
        description: 'Comprehensive guide to implementing supervised AI in wealth management environments.',
        date: '2024',
    },
    {
        type: 'Case Study',
        icon: BookOpen,
        title: 'RIA Scale Study: 40-Advisor Supervision Model',
        description: 'How a mid-sized RIA achieved scalable compliance oversight using integrated technology.',
        date: '2024',
    },
    {
        type: 'Webinar',
        icon: Video,
        title: 'Systematic Income Generation for Advisors',
        description: 'Overview of covered call automation and options strategies for client portfolios.',
        date: '2024',
    },
    {
        type: 'Whitepaper',
        icon: FileText,
        title: 'Triple-Net Real Estate for Wealth Advisors',
        description: 'Guide to institutional-quality real estate investments in advisory portfolios.',
        date: '2024',
    },
];

export default function Resources() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Resources</h1>
                    <p className="text-xl leading-relaxed">
                        Insights, guides, and case studies to help you navigate wealth management transformation.
                    </p>
                </Container>
            </Section>

            {/* Resources Grid */}
            <Section background="muted" padding="lg">
                <Container>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {resources.map((resource, index) => {
                            const Icon = resource.icon;
                            return (
                                <Card key={resource.title} hover className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="text-sm text-accent font-semibold">
                                            {resource.type}
                                        </div>
                                        <h3 className="text-lg font-bold text-primary">{resource.title}</h3>
                                        <p className="text-sm text-primary/70 leading-relaxed">
                                            {resource.description}
                                        </p>
                                        <div className="text-xs text-primary/50">
                                            Published {resource.date}
                                        </div>
                                        <button className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors pt-2">
                                            Download <ArrowRight className="ml-2 h-4 w-4" />
                                        </button>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="mt-16">
                        <Card className="text-center space-y-6 max-w-3xl mx-auto">
                            <h3 className="text-2xl font-bold text-primary">Request a Custom Case Study</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Looking for specific information about how Acumen Strategy can help your firm? Request a tailored case study or consultation.
                            </p>
                            <Button href="/contact" variant="accent" size="lg">
                                Request Case Study
                            </Button>
                        </Card>
                    </div>
                </Container>
            </Section>
        </div>
    );
}