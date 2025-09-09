import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { Play, Users, Layers, ArrowRight, Check } from "lucide-react";

const TailoredSolutions = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeSolution, setActiveSolution] = useState("snapshot");

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects
    const titleOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0.05, 0.15], [30, 0]);

    // Animation variants
    const fadeInVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    const fadeInUpVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
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
            <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/30 pointer-events-none"></div>

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
                        className="inline-block py-1.5 px-4 bg-[#4F6BFF]/10 text-[#4F6BFF] font-medium rounded-full text-sm mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Offerings
                    </motion.span>

                    <motion.h2
                        className="text-4xl md:text-5xl font-display font-light tracking-tight text-[#0A2540] mb-6"
                        variants={fadeInUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Tailored Solutions
                    </motion.h2>

                    <motion.p
                        className="text-xl text-[#505c6e]/90 max-w-2xl mx-auto leading-relaxed"
                        variants={fadeInUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Discover our thoughtfully designed approaches to talent identification
                    </motion.p>
                </motion.div>

                {/* Interactive Solutions Navigator - COMPLETELY NEW LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
                    {/* Left side - Solution tabs - Truly sophisticated */}
                    <div className="lg:col-span-4 lg:pr-8">
                        <h3 className="text-xl font-medium text-[#0A2540] mb-6">Choose Your Approach</h3>

                        <div className="space-y-3">
                            {solutions.map((solution) => (
                                <motion.div
                                    key={solution.id}
                                    className={`
                    relative p-4 rounded-lg transition-all duration-300 cursor-pointer
                    ${activeSolution === solution.id
                                            ? 'shadow-sm bg-white border border-gray-100'
                                            : 'bg-white/70 hover:bg-white border border-transparent'}
                  `}
                                    onClick={() => setActiveSolution(solution.id)}
                                    animate={{
                                        x: activeSolution === solution.id ? 5 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`
                        w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300
                        ${activeSolution === solution.id
                                                    ? `bg-gray-50 text-[${solution.color}]`
                                                    : `bg-gray-50 text-[#505c6e]`
                                                }
                      `}
                                        >
                                            {solution.icon}
                                        </div>

                                        <div className="flex-1">
                                            <h4 className={`font-medium transition-colors duration-300 ${activeSolution === solution.id ? 'text-[#4F6BFF]' : 'text-[#0A2540]'
                                                }`}>
                                                {solution.title}
                                            </h4>

                                            <p className="text-sm text-[#505c6e]/90 line-clamp-2 leading-relaxed">
                                                {solution.description}
                                            </p>
                                        </div>

                                        {/* Subtle arrow indicator */}
                                        <div className="w-6 flex justify-center">
                                            <motion.div
                                                animate={{
                                                    x: activeSolution === solution.id ? 3 : 0,
                                                    opacity: activeSolution === solution.id ? 1 : 0.3
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ArrowRight className={`w-4 h-4 ${activeSolution === solution.id ? 'text-[#4F6BFF]' : 'text-gray-400'
                                                    }`} />
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 rounded-lg bg-gray-50 border border-gray-100">
                            <h4 className="font-medium text-[#0A2540] mb-3">Not Sure Which to Choose?</h4>
                            <p className="text-sm text-[#505c6e]/90 mb-4">
                                Our team can help you determine the ideal solution based on your specific recruiting needs.
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#4F6BFF] font-medium text-sm hover:bg-[#4F6BFF]/5 transition-colors"
                            >
                                Schedule a consultation
                                <ArrowRight className="ml-2 w-3 h-3" />
                            </a>
                        </div>
                    </div>

                    {/* Right side - Selected solution details */}
                    <motion.div
                        className="lg:col-span-8 h-full"
                        variants={fadeInVariants}
                        initial="hidden"
                        animate="visible"
                        key={activeSolution}
                    >
                        <div className="rounded-xl border border-gray-200 h-full overflow-hidden bg-white shadow-sm">
                            {/* Header with elegant design */}
                            <div className="px-8 py-6 border-b border-gray-200 bg-white">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm"
                                        style={{ color: activeSolutionData.color, backgroundColor: `${activeSolutionData.color}10` }}
                                    >
                                        {activeSolutionData.icon}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-medium text-[#0A2540]">
                                            {activeSolutionData.title}
                                        </h3>
                                        <p className="text-[#505c6e]/90 text-sm">{activeSolutionData.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Solution content */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Features column */}
                                    <div>
                                        <h4 className="text-base font-medium text-[#0A2540] mb-5">Key Features</h4>
                                        <ul className="space-y-4">
                                            {activeSolutionData.details.map((detail, index) => (
                                                <motion.li
                                                    key={index}
                                                    className="flex items-start gap-3"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + index * 0.1 }}
                                                >
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#0A2540] bg-gray-50 mt-0.5 shrink-0">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                    <span className="text-[#505c6e]/90 text-sm">{detail}</span>
                                                </motion.li>
                                            ))}
                                        </ul>

                                        <div className="mt-8">
                                            <a
                                                href={`/solutions/${activeSolutionData.id}`}
                                                className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 bg-white text-[#4F6BFF] font-medium text-sm hover:bg-[#4F6BFF]/5 transition-colors"
                                            >
                                                Learn more about {activeSolutionData.title}
                                                <ArrowRight className="ml-2 w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Pricing column */}
                                    <div className="border-l border-gray-200 pl-8">
                                        <h4 className="text-base font-medium text-[#0A2540] mb-5">Pricing</h4>

                                        <div className="space-y-4">
                                            {activeSolutionData.pricing.map((tier, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="rounded-lg border border-gray-100 p-4 bg-gray-50"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 + index * 0.1 }}
                                                >
                                                    <div className="text-sm font-medium pb-2 mb-2 border-b border-gray-100 text-[#0A2540]">
                                                        {tier.level}
                                                    </div>
                                                    <div className="text-[#505c6e]/90 text-sm">{tier.price}</div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="mt-6 text-xs text-[#505c6e]/80">
                                            <p>Success fee applies per hire. View our <a href="/pricing" className="text-[#4F6BFF] hover:underline">complete pricing details</a> for more information.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Salary-based pricing section */}
                <motion.div
                    className="max-w-5xl mx-auto"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                        <div className="px-8 py-10 bg-gradient-to-r from-[#4F6BFF]/10 to-white border-b border-gray-200">
                            <h3 className="text-2xl font-display font-light text-[#0A2540] mb-3">Transparent Value-Based Pricing</h3>
                            <p className="text-[#505c6e]/90 max-w-3xl">
                                Our pricing scales appropriately with role compensation, reflecting the effort required to source exceptional candidates at each level.
                            </p>
                        </div>

                        <div className="bg-white p-8">
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
                                <a
                                    href="/pricing"
                                    className="inline-block px-8 py-3 rounded-lg bg-[#4F6BFF] text-white font-medium shadow-sm hover:shadow-md transition-all"
                                >
                                    View Complete Pricing Details
                                </a>
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
            className={`rounded-lg overflow-hidden border ${highlight
                    ? 'border-gray-200 shadow-sm'
                    : 'border-gray-100'
                }`}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
        >
            <div className={`p-5 ${highlight ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="flex justify-between items-start mb-3">
                    <h4 className="text-base font-medium text-[#0A2540]">{title}</h4>
                    {highlight && (
                        <span className="px-2 py-0.5 bg-gray-100 text-[#4F6BFF] text-xs font-medium rounded-full">
                            Most Popular
                        </span>
                    )}
                </div>

                <p className="text-xs text-[#505c6e]/90 mb-3">Roles paying {range}</p>

                <div className={`text-2xl font-light ${highlight ? 'text-[#4F6BFF]' : 'text-[#0A2540]'}`}>
                    {successFee}
                    <span className="text-xs font-normal text-[#505c6e]/80 ml-1">per hire</span>
                </div>

                <div className="mt-3 text-xs text-[#505c6e]/90">{description}</div>
            </div>

            <div className={`px-5 py-3 border-t ${highlight ? 'border-gray-200 bg-gray-50' : 'border-gray-100 bg-white'}`}>
                <div className="flex items-center">
                    <Check className={`w-3 h-3 mr-2 ${highlight ? 'text-[#4F6BFF]' : 'text-gray-400'}`} />
                    <span className="text-xs text-[#505c6e]/90">Access to all product features</span>
                </div>
            </div>
        </motion.div>
    );
};

export default TailoredSolutions;