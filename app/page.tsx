import Link from 'next/link';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { Target, Zap, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Fixed duplication issue */}
      <Section background="gradient" padding="lg" className="text-white">
        <Container>
          <div className="max-w-4xl space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Strategy. Compliance. Execution.
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              A single partner for advisory-led transformation and compliant product activation for wealth managers.
            </p>
            <p className="text-lg leading-relaxed text-white/80">
              We diagnose your business challenges, design a regulatory-aligned roadmap, and activate proven technology, product, and marketing capabilities to deliver measurable impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button href="/contact" variant="secondary" size="lg">
                Book a Consultation
              </Button>
              <Button href="/solutions" variant="accent" size="lg">
                View Solutions
              </Button>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-wrap gap-6 pt-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>Compliance-first</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>Advisor-credible</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>Measurable outcomes</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Value Propositions */}
      <Section background="muted" padding="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Comprehensive Solutions for Wealth Management
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              From strategic consulting to cutting-edge technology and innovative products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Strategy First */}
            <Card hover>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Strategy First</h3>
                <p className="text-sm font-semibold text-accent">Consulting & Strategic Advisory</p>
                <p className="text-primary/70 leading-relaxed">
                  Diagnose core challenges. Design roadmaps. Prioritize execution for compliance and growth.
                </p>
                <Link
                  href="/solutions/consulting"
                  className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </Card>

            {/* Technology & Automation */}
            <Card hover>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Technology & Automation</h3>
                <p className="text-sm font-semibold text-primary">Glynac — Compliance-first AI</p>
                <p className="text-primary/70 leading-relaxed">
                  Unified CRM, communications, and portfolio data with supervised AI agents that automate workflows and surface regulatory risk.
                </p>
                <Link
                  href="/solutions/glynac"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </Card>

            {/* Products & Distribution */}
            <Card hover>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Products & Distribution</h3>
                <p className="text-sm font-semibold text-accent">Tollbooth • PHH • ATS</p>
                <p className="text-primary/70 leading-relaxed">
                  Income-generation automation, institutional real estate products, and talent solutions to scale advisors and product distribution.
                </p>
                <Link
                  href="/solutions"
                  className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  Explore products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* How We Work */}
      <Section background="white" padding="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              How We Work
            </h2>
            <p className="text-lg text-primary/70 max-w-3xl mx-auto">
              A proven three-step approach to transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="text-7xl font-bold text-accent/20">01</div>
              <h3 className="text-2xl font-bold text-primary">Diagnose</h3>
              <p className="text-primary/70 leading-relaxed">
                Deep discovery across compliance, operations, and technology.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="text-7xl font-bold text-accent/20">02</div>
              <h3 className="text-2xl font-bold text-primary">Design</h3>
              <p className="text-primary/70 leading-relaxed">
                Roadmap and operating model aligned to regulation.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="text-7xl font-bold text-accent/20">03</div>
              <h3 className="text-2xl font-bold text-primary">Deliver</h3>
              <p className="text-primary/70 leading-relaxed">
                Activate the right Acumen products and measure results.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Proof Section */}
      <Section background="muted" padding="lg">
        <Container maxWidth="lg">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Proven Results
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">~40</div>
              <p className="text-sm text-primary/70">Advisors per compliance agent adoption</p>
            </Card>
            <Card className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-primary/70">Improved audit readiness</p>
            </Card>
            <Card className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">X%</div>
              <p className="text-sm text-primary/70">Increased advisor revenue potential</p>
            </Card>
          </div>

          <div className="text-center">
            <Button href="/contact" variant="accent" size="lg">
              Book a Consultation
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}