// src/components/home/ValueProposition.tsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Database, Clock, Users, Shield } from "lucide-react";

const ValueProposition = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Subtle parallax effect
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    // Features data
    const features = [
        {
            icon: <Database className="w-6 h-6" />,
            title: "Pre-Screened Talent",
            description: "Access our exclusive database of wealth management professionals, all vetted to exacting standards.",
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Accelerated Hiring",
            description: "Our streamlined process delivers exceptional candidates in days, not months.",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Industry Specialization",
            description: "We focus exclusively on wealth management, ensuring precise candidate-role alignment.",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Quality Assurance",
            description: "Every candidate undergoes our proprietary vetting process before entering our database.",
        },
    ];

    // Animation variants with proper TypeScript typing
    const featureVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-32 bg-white overflow-hidden"
        >
            {/* Subtle background gradient */}
            <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-[#f8faff] to-white -z-10" />

            {/* Content Container */}
            <div className="container max-w-6xl mx-auto px-6">
                {/* Section Heading */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-[#0A2540] mb-5">
                            A <span className="text-[#4F6BFF] font-normal">sophisticated</span> approach
                        </h2>
                        <p className="text-xl text-[#505c6e] leading-relaxed max-w-2xl mx-auto">
                            We combine deep industry expertise with innovative technology to deliver exceptional candidates.
                        </p>
                    </motion.div>
                </div>

                {/* Feature Cards - Elegant Design */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={featureVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative h-full flex flex-col bg-white p-8 rounded-xl transition-all duration-500">
                                {/* Sophisticated hover effect */}
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_50px_rgba(79,107,255,0.1)] pointer-events-none" />

                                {/* Icon with elegant container */}
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-[#4F6BFF]/5 rounded-xl transform rotate-45 scale-75 origin-center group-hover:scale-90 transition-transform duration-500" />
                                    <div className="relative flex items-center justify-center w-14 h-14 text-[#4F6BFF]">
                                        {feature.icon}
                                    </div>
                                </div>

                                {/* Content with refined typography */}
                                <h3 className="text-xl font-medium text-[#0A2540] mb-3 group-hover:text-[#4F6BFF] transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                <p className="text-[#505c6e] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Excellence Section - Completely Redesigned */}
                
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-32"
                >
                    <div className="relative bg-white rounded-2xl overflow-hidden border border-[#F0F4F9]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                            {/* Content Column - Clean and Elegant */}
                            <div className="p-16">
                                <h3 className="text-4xl font-display font-light tracking-tight text-[#0A2540] mb-8">
                                    Our commitment to <span className="text-[#4F6BFF] font-normal">excellence</span>
                                </h3>

                                <p className="text-[#505c6e] leading-relaxed mb-12 max-w-xl">
                                    We understand the unique challenges of hiring in wealth management, where technical skills, cultural fit, and client relationship abilities are all critical.
                                </p>

                                {/* Clean, elegant list items */}
                                <div className="space-y-6">
                                    {[
                                        "Specialized industry knowledge",
                                        "Proprietary screening methodology",
                                        "Technology-enhanced selection process",
                                        "Ongoing support throughout hiring"
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="flex items-center gap-4 group"
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.1 * idx + 0.3 }}
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#F0F4F9] flex items-center justify-center group-hover:bg-[#4F6BFF]/10 transition-colors duration-300">
                                                <div className="w-2 h-2 rounded-full bg-[#4F6BFF]" />
                                            </div>
                                            <span className="text-[#0A2540] group-hover:text-[#4F6BFF] transition-colors duration-300 font-medium">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Visual Column - Clean and Sophisticated */}
                            <div className="relative bg-white flex items-center justify-center p-16 hidden lg:flex">
                                <div className="relative w-full max-w-md">
                                    {/* Premium diamond-shaped metrics layout */}
                                    <div className="relative">
                                        {/* Central element */}
                                        <div className="relative mx-auto w-64 h-64">
                                            {/* Subtle background shapes for depth */}
                                            <div className="absolute top-0 left-0 w-full h-full -rotate-45 opacity-50">
                                                <div className="absolute top-0 left-0 w-full h-full border border-[#F0F4F9] rounded-xl"></div>
                                                <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#F0F4F9] rounded-xl"></div>
                                                <div className="absolute top-8 left-8 right-8 bottom-8 border border-[#F0F4F9] rounded-xl"></div>
                                            </div>

                                            {/* Inner diamond content */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-20 h-20 bg-white rounded-xl shadow-sm -rotate-45 flex items-center justify-center">
                                                    <div className="rotate-45">
                                                        <Users className="w-8 h-8 text-[#4F6BFF]" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Elegant connector lines */}
                                            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                                {/* Top right line */}
                                                <motion.path
                                                    d="M 160,80 L 240,0"
                                                    stroke="#E5E7EB"
                                                    strokeWidth="1"
                                                    fill="none"
                                                    initial={{ pathLength: 0 }}
                                                    whileInView={{ pathLength: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                                />

                                                {/* Bottom right line */}
                                                <motion.path
                                                    d="M 160,184 L 240,264"
                                                    stroke="#E5E7EB"
                                                    strokeWidth="1"
                                                    fill="none"
                                                    initial={{ pathLength: 0 }}
                                                    whileInView={{ pathLength: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                                                />

                                                {/* Bottom left line */}
                                                <motion.path
                                                    d="M 80,184 L 0,264"
                                                    stroke="#E5E7EB"
                                                    strokeWidth="1"
                                                    fill="none"
                                                    initial={{ pathLength: 0 }}
                                                    whileInView={{ pathLength: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                                                />

                                                {/* Top left line */}
                                                <motion.path
                                                    d="M 80,80 L 0,0"
                                                    stroke="#E5E7EB"
                                                    strokeWidth="1"
                                                    fill="none"
                                                    initial={{ pathLength: 0 }}
                                                    whileInView={{ pathLength: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                                />
                                            </svg>
                                        </div>

                                        {/* Metrics at the four corners - premium styling */}
                                        {[
                                            { label: "Industry Knowledge", value: 90, position: "top-right" },
                                            { label: "Technical Skills", value: 85, position: "bottom-right" },
                                            { label: "Client Relations", value: 88, position: "bottom-left" },
                                            { label: "Cultural Fit", value: 95, position: "top-left" }
                                        ].map((metric, idx) => {
                                            // Define positions for each corner
                                            const positions = {
                                                "top-right": { top: "-10%", right: "-30%", bottom: "auto", left: "auto" },
                                                "bottom-right": { top: "auto", right: "-30%", bottom: "-10%", left: "auto" },
                                                "bottom-left": { top: "auto", right: "auto", bottom: "-10%", left: "-30%" },
                                                "top-left": { top: "-10%", right: "auto", bottom: "auto", left: "-30%" }
                                            };
                                            const pos = positions[metric.position];

                                            return (
                                                <motion.div
                                                    key={idx}
                                                    className="absolute"
                                                    style={{
                                                        top: pos.top,
                                                        right: pos.right,
                                                        bottom: pos.bottom,
                                                        left: pos.left,
                                                    }}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.2 }}
                                                >
                                                    {/* Premium metric visualization */}
                                                    <div className="relative group">
                                                        {/* Elegant metric display */}
                                                        <div className="flex flex-col items-center">
                                                            {/* Diamond shape container with gradient fill based on value */}
                                                            <div className="relative mb-3">
                                                                <div className="w-16 h-16 -rotate-45 relative overflow-hidden shadow-sm">
                                                                    <div className="absolute inset-0 border border-[#F0F4F9] bg-white"></div>
                                                                    <motion.div
                                                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#4F6BFF]/10 to-[#4F6BFF]/5"
                                                                        initial={{ height: 0 }}
                                                                        whileInView={{ height: `${metric.value}%` }}
                                                                        viewport={{ once: true }}
                                                                        transition={{ duration: 1.5, delay: 0.5 + idx * 0.2 }}
                                                                    ></motion.div>
                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                        <div className="rotate-45 text-[#4F6BFF] font-light text-lg">
                                                                            <span className="font-medium">{metric.value}</span><span className="text-xs">%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Label */}
                                                            <div className="text-sm font-medium text-[#0A2540] whitespace-nowrap">
                                                                {metric.label}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}

                                        {/* Elegant Title */}
                                        <motion.div
                                            className="absolute -top-16 left-1/2 -translate-x-1/2"
                                            initial={{ opacity: 0, y: -10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <div className="bg-white text-[#0A2540] font-light text-xl tracking-wide px-6 py-2 rounded-full shadow-sm border border-[#F0F4F9]">
                                                Talent <span className="text-[#4F6BFF] font-normal">Excellence</span>
                                            </div>
                                        </motion.div>

                                        {/* Overall score indicator */}
                                        <motion.div
                                            className="absolute -bottom-16 left-1/2 -translate-x-1/2"
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                        >
                                            <div className="bg-white text-[#0A2540] font-light px-6 py-3 rounded-full shadow-sm border border-[#F0F4F9] flex items-center gap-3">
                                                <div className="text-sm">Overall Excellence</div>
                                                <div className="text-[#4F6BFF] font-medium text-lg">89.5%</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ValueProposition;