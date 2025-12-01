import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Building2, TrendingUp, Shield, CheckCircle2 } from 'lucide-react';

export default function PHH() {
    return (
        <div className="min-h-screen">
            {/* Hero - ADDED "Triple-Net Lease (NNN)" */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                        <Building2 className="h-5 w-5" />
                        <span className="text-sm font-semibold">Institutional NNN Real Estate</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Prairie Hill Holdings — Institutional Triple-Net Lease (NNN) Real Estate Solutions
                    </h1>
                    <p className="text-xl leading-relaxed mb-8">
                        Access diversified, triple-net lease (NNN) real estate investments designed for yield and low volatility. Institutional-quality properties for wealth management clients.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button href="/contact" variant="secondary" size="lg">
                            Learn About the Fund
                        </Button>
                        <Button href="/resources" variant="accent" size="lg">
                            Download Overview
                        </Button>
                    </div>
                </Container>
            </Section>

            {/* Overview */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">About Prairie Hill Holdings</h2>
                    <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                        <p>
                            Prairie Hill Holdings (PHH) provides advisors and their high-net-worth clients access to institutional-quality commercial real estate through a diversified portfolio of triple-net lease (NNN) properties.
                        </p>
                        <p>
                            Each investment is structured for tax efficiency, predictable income, and capital preservation—offering an alternative to traditional fixed income with tangible asset backing.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Key Features - UPDATED property types */}
            <Section background="muted" padding="lg">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-primary mb-4">Key Features</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-accent" />
                            </div>
                            <h3 className="text-lg font-bold text-primary">Triple-Net Lease (NNN) Properties</h3>
                            <p className="text-sm text-primary/70 leading-relaxed">
                                Tenant-responsible for taxes, insurance, and maintenance—reducing owner operational burden
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-primary">Target Returns</h3>
                            <p className="text-sm text-primary/70 leading-relaxed">
                                Competitive yields with focus on cash flow stability and capital appreciation potential
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Shield className="h-6 w-6 text-accent" />
                            </div>
                            <h3 className="text-lg font-bold text-primary">Diversified Property Types</h3>
                            <p className="text-sm text-primary/70 leading-relaxed">
                                Exposure across logistics and distribution facilities, warehouse/industrial, grocery-anchored retail, medical/healthcare retail, education retail, and quick-service restaurants
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-primary">Tax-Efficient Structure</h3>
                            <p className="text-sm text-primary/70 leading-relaxed">
                                Designed to optimize tax treatment with 1031 exchange compatibility for qualified investors
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-accent" />
                            </div>
                            <h3 className="text-lg font-bold text-primary">Institutional Quality</h3>
                            <p className="text-sm text-primary/70 leading-relaxed">
                                Grade-A properties in prime locations with credit-rated tenants and long-term leases
                            </p>
                        </Card>

                        <Card className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-primary">Regular Distributions</h3>
                            <p className="text-sm text-primary/70 leading-relaxed">
                                Quarterly income distributions with transparent reporting and performance tracking
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* NEW SECTION - Asset Classes per feedback */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Asset Classes</h2>
                    <p className="text-lg text-primary/70 mb-8">
                        PHH focuses exclusively on institutional-grade NNN properties across six core asset classes:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="space-y-3">
                            <h3 className="text-xl font-bold text-primary">Logistics & Distribution Facilities</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Modern distribution centers and fulfillment facilities with long-term credit tenants in strategic locations
                            </p>
                        </Card>

                        <Card className="space-y-3">
                            <h3 className="text-xl font-bold text-primary">Warehouse/Industrial</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Class-A industrial properties in strategic locations with stable cash flows and institutional-grade tenants
                            </p>
                        </Card>

                        <Card className="space-y-3">
                            <h3 className="text-xl font-bold text-primary">Grocery-Anchored Retail</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Essential retail centers anchored by major grocery chains in high-traffic, resilient markets
                            </p>
                        </Card>

                        <Card className="space-y-3">
                            <h3 className="text-xl font-bold text-primary">Medical/Healthcare Retail</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Medical office buildings and healthcare facilities with long-term healthcare provider tenants
                            </p>
                        </Card>

                        <Card className="space-y-3">
                            <h3 className="text-xl font-bold text-primary">Education Retail</h3>
                            <p className="text-primary/70 leading-relaxed">
                                Facilities leased to educational institutions, training centers, and childcare providers
                            </p>
                        </Card>

                        <Card className="space-y-3">
                            <h3 className="text-xl font-bold text-primary">Quick-Service Restaurants</h3>
                            <p className="text-primary/70 leading-relaxed">
                                National QSR brands with corporate guarantees in high-visibility, high-traffic locations
                            </p>
                        </Card>
                    </div>
                </Container>
            </Section>

            {/* Who It's For */}
            <Section background="muted" padding="lg">
                <Container maxWidth="lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Ideal For</h2>
                    <div className="space-y-4">
                        {[
                            'High-net-worth individuals seeking income and diversification beyond equities and bonds',
                            'Advisors looking to add alternative investments with tangible asset backing',
                            'Clients interested in 1031 exchange opportunities for tax deferral',
                            'Portfolios requiring low-volatility income with capital preservation focus',
                            'Investors seeking institutional-grade NNN real estate without direct property management',
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-lg text-primary/70">{item}</span>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg" className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Interested in Adding PHH to Your Practice?
                    </h2>
                    <p className="text-lg text-primary/70 mb-8">
                        Contact us for detailed investor materials, performance data, and advisor partnership opportunities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="accent" size="lg">
                            Learn About the Fund
                        </Button>
                        <Button href="/resources" variant="secondary" size="lg">
                            Download Overview
                        </Button>
                    </div>
                </Container>
            </Section>
        </div>
    );
}