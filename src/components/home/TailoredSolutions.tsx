import React from "react";
import { motion } from "framer-motion";
import { Play, Users, Layers } from "lucide-react";

const TailoredSolutions = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    // Solutions data
    const solutions = [
        {
            id: "snapshot",
            title: "Talent Snapshot™",
            description: "Brief, focused candidate introductions that provide immediate insight into fit and capability.",
            details: [
                "Pre-recorded video introductions from candidates",
                "Custom screening questions tailored to your requirements",
                "Efficient initial assessment of candidate fit",
                "Immediate access via our secure client portal"
            ],
            icon: <Play className="w-6 h-6" />,
            color: "from-blue-500/20 to-blue-500/5"
        },
        {
            id: "deepdive",
            title: "Talent DeepDive™",
            description: "Structured, in-depth conversations that reveal nuanced understanding of experience and expertise.",
            details: [
                "Recruiter-led structured interviews",
                "Comprehensive assessment of skills and experience",
                "Behavioral and situational questions",
                "Detailed insights into candidate capabilities"
            ],
            icon: <Users className="w-6 h-6" />,
            color: "from-indigo-500/20 to-indigo-500/5"
        },
        {
            id: "complete",
            title: "Complete Talent Pack™",
            description: "A comprehensive approach combining both methodologies for thorough talent discovery.",
            details: [
                "Combined Snapshot and DeepDive methodologies",
                "Maximum candidate insights for critical roles",
                "Comprehensive screening across all dimensions",
                "Optimal approach for senior or complex positions"
            ],
            icon: <Layers className="w-6 h-6" />,
            color: "from-ph/20 to-ph/5"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-ph/5 rounded-full blur-3xl -z-10 opacity-70"></div>
            <div className="absolute bottom-20 left-0 w-80 h-80 bg-ph/5 rounded-full blur-3xl -z-10 opacity-70"></div>

            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6">
                        Our Offerings
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-light tracking-wide text-foreground mb-6">
                        Tailored Solutions
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Discover our thoughtfully designed approaches to talent identification
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {solutions.map((solution) => (
                        <motion.div
                            key={solution.id}
                            className="relative"
                            variants={itemVariants}
                        >
                            <div className="h-full flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                {/* Solution Card Header */}
                                <div className={`p-6 bg-gradient-to-br ${solution.color}`}>
                                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-ph mb-4">
                                        {solution.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{solution.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {solution.description}
                                    </p>
                                </div>

                                {/* Solution Card Body */}
                                <div className="bg-white p-6 flex-grow">
                                    <ul className="space-y-3">
                                        {solution.details.map((detail, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-ph/70 mt-2"></div>
                                                <span className="text-sm text-muted-foreground">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Solution Card Footer */}
                                <div className="bg-white p-6 pt-0">
                                    <div className="pt-4 border-t border-gray-100">
                                        <a href={`/solutions#${solution.id}`} className="text-ph text-sm font-medium hover:text-ph-dark transition-colors flex items-center">
                                            Explore details
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="ml-1"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pricing Tier Indicator */}
                <motion.div
                    className="mt-20 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="rounded-xl border border-gray-200 overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
                            <h3 className="text-xl font-semibold text-foreground mb-2">Transparent Value-Based Pricing</h3>
                            <p className="text-muted-foreground">
                                Our pricing scales appropriately with role compensation, reflecting the effort required to source exceptional candidates at each level.
                            </p>
                        </div>

                        <div className="p-6 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
                            <PricingTier
                                title="Entry Level"
                                range="0-60k"
                                highlight={false}
                            />

                            <PricingTier
                                title="Mid-Level"
                                range="60k-120k"
                                highlight={true}
                            />

                            <PricingTier
                                title="Senior Level"
                                range="120k-300k"
                                highlight={false}
                            />
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <motion.a
                            href="/pricing"
                            className="inline-flex items-center text-ph font-medium hover:text-ph-dark transition-colors"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            View detailed pricing
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-1"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Helper component for pricing tiers
const PricingTier = ({ title, range, highlight }) => {
    return (
        <div className={`rounded-lg p-5 flex flex-col h-full ${highlight ? 'bg-ph/5 border border-ph/20' : 'bg-gray-50'
            }`}>
            <h4 className="text-lg font-medium text-foreground mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground mb-3">Roles paying {range}</p>
            <div className={`text-sm ${highlight ? 'text-ph' : 'text-muted-foreground'}`}>
                Custom-tailored recruiting solutions with transparent pricing
            </div>
        </div>
    );
};

export default TailoredSolutions;