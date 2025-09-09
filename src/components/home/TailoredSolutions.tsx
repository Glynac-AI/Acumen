import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, Users, Layers, ArrowRight, Check } from "lucide-react";

const TailoredSolutions = () => {
    const [activeSolution, setActiveSolution] = useState("snapshot");
    const sectionRef = useRef(null);

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects
    const titleOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0.05, 0.15], [30, 0]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

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
            icon: <Play className="w-5 h-5" />,
            color: "#4F6BFF",
            pricing: [
                { level: "0-60k roles", price: "20 for $200 | 50 for $450 | 100 for $800" },
                { level: "60k-120k roles", price: "Pricing doubles" },
                { level: "120k-300k roles", price: "Pricing triples" }
            ]
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
            icon: <Users className="w-5 h-5" />,
            color: "#6366f1",
            pricing: [
                { level: "0-60k roles", price: "10 for $300 | 20 for $550 | 50 for $1,250" },
                { level: "60k-120k roles", price: "Pricing doubles" },
                { level: "120k-300k roles", price: "Pricing triples" }
            ]
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
            icon: <Layers className="w-5 h-5" />,
            color: "#4F6BFF",
            pricing: [
                { level: "0-60k roles", price: "Starter: $450 | Growth: $900 | Enterprise: $2,000" },
                { level: "60k-120k roles", price: "Pricing doubles" },
                { level: "120k-300k roles", price: "Pricing triples" }
            ]
        }
    ];

    // Get active solution data
    const activeSolutionData = solutions.find(s => s.id === activeSolution) || solutions[0];

    return (
        <section
            ref={sectionRef}
            className="py-36 relative overflow-hidden bg-white"
        >
            {/* Background elements */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/30 pointer-events-none"
                style={{ y: backgroundY }}
            />

            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px'
            }} />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header section */}
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-24"
                    style={{
                        opacity: titleOpacity,
                        y: titleY
                    }}
                >
                    <motion.span
                        className="inline-block py-1.5 px-4 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Offerings
                    </motion.span>

                    <motion.h2
                        className="text-4xl md:text-5xl font-display font-light tracking-tight text-foreground mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        Tailored Solutions
                    </motion.h2>

                    <motion.p
                        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        Discover our thoughtfully designed approaches to talent identification
                    </motion.p>
                </motion.div>

                {/* Solutions Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-28">
                    {/* Left side - Solution tabs */}
                    <div className="lg:col-span-4">
                        <h3 className="text-xl font-medium text-foreground mb-6">Choose Your Approach</h3>

                        <div className="space-y-4">
                            {solutions.map((solution) => (
                                <motion.div
                                    key={solution.id}
                                    className={`
                                        relative p-5 rounded-xl transition-all duration-300 cursor-pointer
                                        ${activeSolution === solution.id
                                            ? 'shadow-sm glass-card border border-white/20'
                                            : 'bg-white/80 hover:bg-white/90 border border-transparent'}
                                    `}
                                    onClick={() => setActiveSolution(solution.id)}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`
                                                w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300
                                                ${activeSolution === solution.id
                                                    ? `bg-ph/10 text-ph`
                                                    : `bg-gray-50 text-muted-foreground`
                                                }
                                            `}
                                        >
                                            {solution.icon}
                                        </div>

                                        <div className="flex-1">
                                            <h4 className={`font-medium transition-colors duration-300 ${activeSolution === solution.id ? 'text-ph' : 'text-foreground'}`}>
                                                {solution.title}
                                            </h4>

                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                {solution.description}
                                            </p>
                                        </div>

                                        <motion.div
                                            animate={{
                                                x: activeSolution === solution.id ? 5 : 0,
                                                opacity: activeSolution === solution.id ? 1 : 0.5
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowRight className={`w-4 h-4 ${activeSolution === solution.id ? 'text-ph' : 'text-muted-foreground'}`} />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="mt-8 p-6 rounded-xl glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <h4 className="font-medium text-foreground mb-3">Not Sure Which to Choose?</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                Our team can help you determine the ideal solution based on your specific recruiting needs.
                            </p>
                            <motion.a
                                href="/contact"
                                className="inline-flex items-center button-secondary text-sm"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                Schedule a consultation
                                <ArrowRight className="ml-2 w-3 h-3" />
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* Right side - Selected solution details */}
                    <div className="lg:col-span-8 h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSolution}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="h-full"
                            >
                                <div className="rounded-xl glass-card h-full overflow-hidden">
                                    {/* Header with elegant design */}
                                    <div className="px-8 py-6 border-b border-white/20 bg-gradient-to-r from-ph/5 to-transparent">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm"
                                                style={{ color: activeSolutionData.color }}
                                            >
                                                {activeSolutionData.icon}
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-medium text-foreground">
                                                    {activeSolutionData.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm">{activeSolutionData.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Solution content */}
                                    <div className="p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Features column */}
                                            <div>
                                                <h4 className="text-base font-medium text-foreground mb-5">Key Features</h4>
                                                <ul className="space-y-4">
                                                    {activeSolutionData.details.map((detail, index) => (
                                                        <motion.li
                                                            key={index}
                                                            className="flex items-start gap-3"
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.2 + index * 0.1 }}
                                                        >
                                                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-white bg-ph mt-0.5 shrink-0">
                                                                <Check className="w-3 h-3" />
                                                            </div>
                                                            <span className="text-muted-foreground text-sm">{detail}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>

                                                <div className="mt-8">
                                                    <motion.a
                                                        href={`/solutions/${activeSolutionData.id}`}
                                                        className="button-secondary inline-flex items-center text-sm"
                                                        whileHover={{ x: 5 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        Learn more about {activeSolutionData.title}
                                                        <ArrowRight className="ml-2 w-4 h-4" />
                                                    </motion.a>
                                                </div>
                                            </div>

                                            {/* Pricing column */}
                                            <div className="border-l border-white/20 pl-8">
                                                <h4 className="text-base font-medium text-foreground mb-5">Pricing</h4>

                                                <div className="space-y-4">
                                                    {activeSolutionData.pricing.map((tier, index) => (
                                                        <motion.div
                                                            key={index}
                                                            className="rounded-lg glass-card p-4"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.3 + index * 0.1 }}
                                                            whileHover={{ y: -3 }}
                                                        >
                                                            <div className="text-sm font-medium pb-2 mb-2 border-b border-white/10 text-foreground">
                                                                {tier.level}
                                                            </div>
                                                            <div className="text-muted-foreground text-sm">{tier.price}</div>
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                <div className="mt-6 text-xs text-muted-foreground bg-ph/5 p-3 rounded-lg">
                                                    <p>Success fee applies per hire. View our <a href="/pricing" className="text-ph hover:underline">complete pricing details</a> for more information.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Salary-based pricing section */}
                <motion.div
                    className="max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                >
                    <div className="rounded-2xl overflow-hidden glass-card border border-white/20">
                        <div className="px-8 py-10 bg-gradient-to-r from-ph/10 to-transparent border-b border-white/10">
                            <h3 className="text-2xl font-display font-light text-foreground mb-3">Transparent Value-Based Pricing</h3>
                            <p className="text-muted-foreground max-w-3xl">
                                Our pricing scales appropriately with role compensation, reflecting the effort required to source exceptional candidates at each level.
                            </p>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <PricingTier
                                    title="Entry Level"
                                    range="0-60k"
                                    highlight={false}
                                    successFee="$500"
                                    description="Standard pricing for entry-level positions"
                                />

                                <PricingTier
                                    title="Mid-Level"
                                    range="60k-120k"
                                    highlight={true}
                                    successFee="$2,000"
                                    description="Pricing doubles for mid-level roles"
                                />

                                <PricingTier
                                    title="Senior Level"
                                    range="120k-300k"
                                    highlight={false}
                                    successFee="$6,000"
                                    description="Pricing triples for senior positions"
                                />
                            </div>

                            <div className="text-center mt-10">
                                <motion.a
                                    href="/pricing"
                                    className="button-primary inline-block"
                                    whileHover={{ y: -3 }}
                                    whileTap={{ y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    View Complete Pricing Details
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Pricing Tier component
const PricingTier = ({
    title,
    range,
    highlight,
    successFee,
    description
}: {
    title: string;
    range: string;
    highlight: boolean;
    successFee: string;
    description: string;
}) => {
    return (
        <motion.div
            className={`rounded-lg overflow-hidden ${highlight
                    ? 'glass-card border border-ph/20 shadow-md shadow-ph/5'
                    : 'bg-white/80 border border-white/20'
                }`}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
        >
            <div className={`p-5 ${highlight ? 'bg-gradient-to-br from-ph/5 to-transparent' : 'bg-white/50'}`}>
                <div className="flex justify-between items-start mb-3">
                    <h4 className="text-base font-medium text-foreground">{title}</h4>
                    {highlight && (
                        <span className="px-2 py-0.5 bg-ph/10 text-ph text-xs font-medium rounded-full">
                            Most Popular
                        </span>
                    )}
                </div>

                <p className="text-xs text-muted-foreground mb-3">Roles paying {range}</p>

                <div className={`text-2xl font-light ${highlight ? 'text-ph' : 'text-foreground'}`}>
                    {successFee}
                    <span className="text-xs font-normal text-muted-foreground ml-1">per hire</span>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">{description}</div>
            </div>

            <div className={`px-5 py-3 border-t ${highlight ? 'border-ph/10 bg-white/50' : 'border-gray-100 bg-white/50'
                }`}>
                <div className="flex items-center">
                    <Check className={`w-3 h-3 mr-2 ${highlight ? 'text-ph' : 'text-gray-400'}`} />
                    <span className="text-xs text-muted-foreground">Access to all product features</span>
                </div>
            </div>
        </motion.div>
    );
};

export default TailoredSolutions;