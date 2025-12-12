// app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StaggerContainer from '@/components/ui/StaggerContainer';
import { fadeInUp } from '@/lib/animations';

export default function About() {
    return (
        <div className="min-h-screen">
            {/* Hero - Enhanced with Background Pattern */}
            <Section background="gradient" padding="lg" className="text-white relative overflow-hidden min-h-screen flex items-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-8"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                                About Acumen Strategy
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                We are a technology company building the intelligence layer for wealth management. Our platform combines advanced diagnostics, AI-powered compliance tools, and institutional-grade investment products.
                            </motion.p>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Our Approach - Interactive Cards */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp" className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Technology-First Approach</h2>
                        <p className="text-xl text-primary/70 max-w-3xl">
                            We believe the future of wealth management lies in intelligent technology that enhances human decision-making rather than replacing it.
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
                        {[
                            {
                                title: "Advanced Diagnostics",
                                description: "Our platform analyzes compliance posture, operational efficiency, and technology infrastructure through sophisticated diagnostic tools that provide real-time insights into firm health and regulatory risk.",
                                accent: "accent",
                                number: "01"
                            },
                            {
                                title: "AI-Powered Intelligence",
                                description: "Supervised artificial intelligence agents automate workflows, surface compliance risks, and provide actionable recommendations—all within a framework designed for regulated environments.",
                                accent: "primary",
                                number: "02"
                            }
                        ].map((approach, index) => (
                            <motion.div key={approach.title} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden relative h-full">
                                    <div className="flex items-start gap-6 p-8">
                                        {/* Large Number */}
                                        <div className="shrink-0">
                                            <div className={`text-5xl font-bold text-${approach.accent}/20 group-hover:text-${approach.accent}/30 transition-colors duration-300`}>
                                                {approach.number}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className={`w-16 h-1 bg-${approach.accent} rounded-full mb-6 group-hover:w-24 transition-all duration-300`}></div>
                                            <h3 className={`text-2xl font-bold text-primary mb-4 group-hover:text-${approach.accent} transition-colors duration-300`}>
                                                {approach.title}
                                            </h3>
                                            <p className="text-lg text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                                {approach.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${approach.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>

                    {/* Third card - full width */}
                    <StaggerContainer className="max-w-6xl mx-auto">
                        {[
                            {
                                title: "Integrated Solutions",
                                description: "Beyond technology, we provide institutional-grade investment products and professional education through our compliance institute—creating a comprehensive ecosystem for modern wealth management.",
                                accent: "accent",
                                number: "03"
                            }
                        ].map((approach, index) => (
                            <motion.div key={approach.title} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden relative">
                                    <div className="flex items-start gap-6 p-8">
                                        {/* Large Number */}
                                        <div className="shrink-0">
                                            <div className={`text-5xl font-bold text-${approach.accent}/20 group-hover:text-${approach.accent}/30 transition-colors duration-300`}>
                                                {approach.number}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className={`w-16 h-1 bg-${approach.accent} rounded-full mb-6 group-hover:w-24 transition-all duration-300`}></div>
                                            <h3 className={`text-2xl font-bold text-primary mb-4 group-hover:text-${approach.accent} transition-colors duration-300`}>
                                                {approach.title}
                                            </h3>
                                            <p className="text-lg text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                                {approach.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${approach.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Values - Enhanced Grid */}
            <Section background="muted" padding="lg">
                <Container>
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Values</h2>
                        <p className="text-xl text-primary/70">
                            The principles that guide our technology development and client partnerships
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Innovation",
                                description: "We push the boundaries of what's possible with AI and compliance technology while maintaining the highest standards of security and regulatory alignment.",
                                accent: "accent"
                            },
                            {
                                title: "Excellence",
                                description: "Every line of code, every algorithm, every product is built to institutional-grade standards with precision and attention to detail.",
                                accent: "primary"
                            },
                            {
                                title: "Partnership",
                                description: "We succeed when our clients succeed. Our technology is designed to amplify human expertise, not replace it.",
                                accent: "accent"
                            }
                        ].map((value, index) => (
                            <motion.div key={value.title} variants={fadeInUp}>
                                <Card className="space-y-6 h-full group hover:shadow-xl hover:-translate-y-4 transition-all duration-500 relative overflow-hidden">
                                    <div className={`w-16 h-1 bg-${value.accent} rounded-full group-hover:w-20 transition-all duration-300`}></div>
                                    <h3 className={`text-xl font-bold text-primary group-hover:text-${value.accent} transition-colors duration-300`}>
                                        {value.title}
                                    </h3>
                                    <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                        {value.description}
                                    </p>

                                    {/* Subtle background animation */}
                                    <div className={`absolute inset-0 bg-linear-to-br from-${value.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Leadership Team - Premium Cards */}
            <Section background="white" padding="lg">
                <Container maxWidth="lg">
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Leadership Team</h2>
                        <p className="text-xl text-primary/70 max-w-3xl mx-auto">
                            Technologists, innovators, and industry experts building the future of wealth management compliance.
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="space-y-6">
                        {[
                            {
                                name: "Lubna",
                                role: "Founder & CEO",
                                expertise: "Technology leader with 15+ years building AI-powered compliance platforms and wealth management solutions for regulated environments.",
                                accent: "accent"
                            },
                            {
                                name: "Gurinder Khera",
                                role: "Chief Technology Officer",
                                expertise: "Former senior architect at leading fintech firms, specializing in AI/ML systems and enterprise-scale platform development.",
                                accent: "primary"
                            },
                            {
                                name: "Miguel Rodriguez",
                                role: "Head of Product",
                                expertise: "Product innovator with deep expertise in regulatory technology and user experience design for financial services applications.",
                                accent: "accent"
                            },
                            {
                                name: "Andrew Chen",
                                role: "Managing Director, Investments",
                                expertise: "Investment professional with track record of launching institutional-grade products for wealth advisors and family offices.",
                                accent: "primary"
                            }
                        ].map((leader, index) => (
                            <motion.div key={leader.name} variants={fadeInUp}>
                                <Card className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden relative">
                                    <div className="p-8">
                                        <div className="flex flex-col md:flex-row gap-8">
                                            {/* Visual Element */}
                                            <div className="shrink-0">
                                                <div className={`w-20 h-20 rounded-2xl bg-linear-to-br from-${leader.accent}/10 to-${leader.accent}/20 group-hover:from-${leader.accent}/20 group-hover:to-${leader.accent}/30 transition-all duration-300 flex items-center justify-center`}>
                                                    <div className={`w-8 h-8 rounded-lg bg-${leader.accent} group-hover:scale-110 transition-transform duration-300`}></div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className={`w-16 h-1 bg-${leader.accent} rounded-full mb-4 group-hover:w-24 transition-all duration-300`}></div>
                                                <h3 className={`text-2xl font-bold text-primary mb-2 group-hover:text-${leader.accent} transition-colors duration-300`}>
                                                    {leader.name}
                                                </h3>
                                                <p className={`text-${leader.accent} font-semibold mb-4 text-lg`}>
                                                    {leader.role}
                                                </p>
                                                <p className="text-primary/70 leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                                                    {leader.expertise}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Effect */}
                                    <div className={`absolute inset-0 bg-linear-to-r from-${leader.accent}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                </Card>
                            </motion.div>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>
        </div>
    );
}