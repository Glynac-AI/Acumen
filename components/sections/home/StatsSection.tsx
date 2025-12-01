'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export default function StatsSection() {
    const stats = [
        { value: 40, prefix: '~', suffix: '', label: 'Advisors per compliance agent adoption' },
        { value: 100, prefix: '', suffix: '%', label: 'Improved audit readiness' },
        { value: 6, prefix: '', suffix: '+', label: 'Integrated solutions' },
    ];

    return (
        <Section background="white" padding="lg">
            <Container>
                <AnimatedSection animation="fadeInUp" className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        Proven Results Across the Industry
                    </h2>
                    <p className="text-lg text-primary/70 max-w-2xl mx-auto">
                        Trusted by wealth management firms to deliver compliant, scalable transformation
                    </p>
                </AnimatedSection>

                <motion.div
                    className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeInUp}
                            className="text-center p-8 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-5xl md:text-6xl font-bold text-accent mb-3">
                                <AnimatedCounter
                                    to={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                    duration={2.5}
                                />
                            </div>
                            <p className="text-sm text-primary/70">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </Section>
    );
}