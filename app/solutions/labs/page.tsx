import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Palette, FileText, Globe, Video } from 'lucide-react';

export default function Labs() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Acumen Labs — Marketing & Brand Implementation
                    </h1>
                    <p className="text-xl leading-relaxed mb-8">
                        Full-service marketing execution including websites, brand development, content creation, and advisor enablement materials.
                    </p>
                    <Button href="/contact" variant="secondary" size="lg">
                        Request Services
                    </Button>
                </Container>
            </Section>

            {/* Services */}
            <Section background="white" padding="lg">
                <Container>
                    <h2 className="text-4xl font-bold text-primary mb-12 text-center">Marketing Services</h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Globe className="h-8 w-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">Website Development</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Custom websites designed for wealth management firms with compliance-friendly content management and lead capture.
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Palette className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">Brand Development</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Logo design, brand guidelines, and visual identity systems that build trust and credibility.
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <FileText className="h-8 w-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">Content Creation</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Whitepapers, case studies, blog posts, and educational content to position your firm as a thought leader.
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Video className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary">Advisor Enablement</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Sales collateral, presentation templates, and marketing materials designed for advisor use and compliance review.
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg" className="text-center">
                    <h2 className="text-4xl font-bold text-primary mb-4">Ready to Elevate Your Brand?</h2>
                    <p className="text-lg text-primary/70 mb-8">
                        Partner with Acumen Labs for marketing that combines creative excellence with compliance expertise.
                    </p>
                    <Button href="/contact" variant="accent" size="lg">
                        Request Services
                    </Button>
                </Container>
            </Section>
        </div>
    );
}