import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

const Philosophy = () => {
    // Refs for scroll-based animations
    const sectionRef = useRef(null);

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax and opacity transforms
    const headerY = useTransform(scrollYProgress, [0, 0.1], [30, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const contentOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.1, 0.2], [30, 0]);
    // Earlier reveal for quote
    const quoteOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
    const quoteY = useTransform(scrollYProgress, [0.4, 0.5], [30, 0]);

    // Core principles
    const principles = [
        {
            title: "Specialization",
            description: "We focus exclusively on wealth management, ensuring deep industry knowledge",
            gradient: "from-[#4F6BFF]/5 to-[#4F6BFF]/0",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-7h-2c0-1-1.5-2-3-2z" />
                    <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                    <path d="M16 19h3a2 2 0 0 0 2-2v-3" />
                </svg>
            )
        },
        {
            title: "Precision",
            description: "Our rigorous vetting process ensures only the most qualified candidates",
            gradient: "from-indigo-500/5 to-indigo-500/0",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            )
        },
        {
            title: "Innovation",
            description: "Our technology platform creates an efficient, transparent experience",
            gradient: "from-purple-500/5 to-purple-500/0",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                </svg>
            )
        },
        {
            title: "Partnership",
            description: "We act as true partners in your firm's growth and success",
            gradient: "from-cyan-500/5 to-cyan-500/0",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 16.8a7.14 7.14 0 0 0 2.2-5.5 7 7 0 1 0-14 0 7.14 7.14 0 0 0 2.2 5.5" />
                    <path d="M6.38 17.8A4 4 0 0 0 9 19h6a4 4 0 0 0 2.62-1.2" />
                    <path d="M8.5 10.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0" />
                    <path d="M15.5 10.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0" />
                </svg>
            )
        }
    ];

    // Animation variants
    const textRevealVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const staggerContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-32 relative overflow-hidden bg-white"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50/30"></div>

                {/* Subtle gradient orb */}
                <div className="absolute right-0 top-40 w-[60vw] h-[60vw] rounded-full opacity-[0.07]"
                    style={{
                        background: "radial-gradient(circle, rgba(79,107,255,0.2) 0%, rgba(255,255,255,0) 70%)"
                    }}
                />

                {/* Subtle grain texture */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px'
                }} />

                {/* Decorative dots pattern */}
                <div className="absolute left-0 bottom-0 w-full h-40 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(#4F6BFF 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }} />

                {/* Decorative floating elements */}
                <motion.div
                    className="absolute right-[10%] top-1/4 w-24 h-24 border border-[#4F6BFF]/10 rounded-full"
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute left-[5%] bottom-1/3 w-16 h-16 border border-[#4F6BFF]/10 rounded-full"
                    animate={{
                        y: [0, 10, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="max-w-4xl mx-auto text-center mb-20"
                    style={{ opacity: headerOpacity, y: headerY }}
                >
                    <motion.span
                        className="inline-block py-1.5 px-4 bg-[#4F6BFF]/10 text-[#4F6BFF] font-medium rounded-full text-sm mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Philosophy
                    </motion.span>

                    <div className="overflow-hidden py-1">
                        <motion.h2
                            className="text-4xl md:text-6xl font-display font-light tracking-tight text-[#0A2540] leading-[1.2]"
                            variants={textRevealVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            The intersection of
                        </motion.h2>
                    </div>

                    <div className="overflow-hidden py-1">
                        <motion.h2
                            className="text-4xl md:text-6xl font-display font-light tracking-tight leading-[1.2]"
                            variants={textRevealVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F6BFF] to-blue-400 font-normal">
                                human insight
                            </span>
                            {" "}and{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4F6BFF] font-normal">
                                technological efficiency
                            </span>
                        </motion.h2>
                    </div>
                </motion.div>

                {/* Main content */}
                <motion.div
                    className="relative mb-24"
                    style={{ opacity: contentOpacity, y: contentY }}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            {/* Left column - Philosophy Text */}
                            <div className="space-y-8">
                                <motion.p
                                    className="text-lg text-[#505c6e]/90 leading-relaxed"
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    We founded Acumen Recruiting with a singular vision: to transform how wealth management firms discover talent. Traditional recruiting often relies on either impersonal technology or time-intensive human processes, creating a choice between efficiency and quality.
                                </motion.p>

                                <motion.p
                                    className="text-lg text-[#505c6e]/90 leading-relaxed"
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    We've created a different path. By thoughtfully integrating <span className="text-[#0A2540] font-medium">curated human expertise</span> with <span className="text-[#0A2540] font-medium">elegant technology</span>, we deliver a recruitment experience that's both more refined and more effective.
                                </motion.p>

                                <motion.p
                                    className="text-lg text-[#505c6e]/90 leading-relaxed"
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Our approach centers on deep understanding—of each role's nuances, each firm's culture, and each candidate's unique capabilities. This understanding informs every aspect of our process, from how we structure our candidate database to how we design our client interactions.
                                </motion.p>
                            </div>

                            {/* Right column - Core Principles with sophisticated design */}
                            <div className="relative">
                                <motion.div
                                    className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6"
                                    variants={staggerContainerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    {principles.map((principle, index) => (
                                        <motion.div
                                            key={principle.title}
                                            className="group relative"
                                            variants={itemVariants}
                                            whileHover={{ y: -5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {/* Card with gradient border effect */}
                                            <div className="relative h-full rounded-xl p-[1px] overflow-hidden">
                                                {/* Gradient border */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#4F6BFF]/20 to-transparent opacity-70 rounded-xl"></div>

                                                {/* Card content */}
                                                <div className="relative h-full rounded-xl bg-white shadow-sm p-6 flex flex-col transition-all duration-300 group-hover:shadow-md">
                                                    {/* Icon with gradient background */}
                                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br text-[#4F6BFF] flex items-center justify-center mb-4">
                                                        {principle.icon}
                                                    </div>

                                                    {/* Content */}
                                                    <h3 className="text-lg font-medium text-[#0A2540] mb-2">
                                                        {principle.title}
                                                        {/* Animated underline on hover */}
                                                        <div className="h-px w-0 bg-[#4F6BFF]/30 mt-1 transition-all duration-300 group-hover:w-full"></div>
                                                    </h3>
                                                    <p className="text-[#505c6e]/80 text-sm leading-relaxed">
                                                        {principle.description}
                                                    </p>

                                                    {/* Background gradient */}
                                                    <div className="absolute top-0 right-0 w-full h-full rounded-xl bg-gradient-to-br opacity-5 pointer-events-none transition-opacity duration-300 group-hover:opacity-10"></div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Decorative elements for right column */}
                                <div className="absolute -top-10 -right-10 w-20 h-20 border border-[#4F6BFF]/10 rounded-full opacity-20"></div>
                                <div className="absolute -bottom-10 -left-10 w-16 h-16 border border-[#4F6BFF]/10 rounded-full opacity-20"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quote - earlier reveal */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    style={{ opacity: quoteOpacity, y: quoteY }}
                >
                    <div className="relative">
                        {/* Quote marks */}
                        <div className="absolute -top-10 left-0 text-6xl text-[#4F6BFF]/10 font-serif">"</div>
                        <div className="absolute -bottom-16 right-0 text-6xl text-[#4F6BFF]/10 font-serif transform rotate-180">"</div>

                        {/* Quote content */}
                        <div className="bg-white rounded-2xl shadow-sm py-12 px-12 md:px-16 text-center">
                            <motion.p
                                className="text-xl md:text-2xl font-display font-light text-[#0A2540] leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                            >
                                We believe in creating partnerships, not transactions. Our success is measured by the growth and success of the firms we serve.
                            </motion.p>

                            <motion.div
                                className="mt-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                <div className="inline-flex flex-col items-center">
                                    <div className="h-px w-12 bg-[#4F6BFF]/20 mb-4"></div>
                                    <span className="text-sm font-medium text-[#4F6BFF] tracking-wider">FOUNDER, ACUMEN RECRUITING</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Philosophy;