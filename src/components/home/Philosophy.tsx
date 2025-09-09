import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";

const Philosophy = () => {
    // Refs for scroll-based animations
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax and opacity transforms
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 1]);
    const titleY = useTransform(scrollYProgress, [0, 0.1, 0.2], [50, 0, 0]);
    const leftColumnY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const rightColumnY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const quoteScale = useTransform(scrollYProgress, [0.6, 0.8], [0.95, 1]);
    const quoteOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

    // Animation variants
    const textRevealVariants: Variants = {
        hidden: { y: 80, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const principleContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3
            }
        }
    };

    const principleVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.25, 1, 0.5, 1]
            }
        }
    };

    // Core principles data
    const principles = [
        {
            number: "01",
            title: "Specialization",
            description: "We focus exclusively on wealth management, ensuring deep industry knowledge",
            gradient: "from-[#4F6BFF]/20 via-[#4F6BFF]/10 to-transparent",
            accent: "bg-[#4F6BFF]",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#4F6BFF]">
                    <path d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 10C20.1046 10 21 9.10457 21 8C21 6.89543 20.1046 6 19 6C17.8954 6 17 6.89543 17 8C17 9.10457 17.8954 10 19 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 10C6.10457 10 7 9.10457 7 8C7 6.89543 6.10457 6 5 6C3.89543 6 3 6.89543 3 8C3 9.10457 3.89543 10 5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 18V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 6V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 10C19 10 17.1 13 12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 10C5 10 6.9 13 12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            number: "02",
            title: "Precision",
            description: "Our rigorous vetting process ensures only the most qualified candidates",
            gradient: "from-indigo-500/20 via-indigo-500/10 to-transparent",
            accent: "bg-indigo-500",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-500">
                    <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 8.5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.5 5H4.5C3.67157 5 3 5.67157 3 6.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V6.5C21 5.67157 20.3284 5 19.5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 13L11 15L15.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            number: "03",
            title: "Innovation",
            description: "Our technology platform creates an efficient, transparent experience",
            gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
            accent: "bg-purple-500",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                    <path d="M21 8V16C21 16.7956 20.6839 17.5587 20.1213 18.1213C19.5587 18.6839 18.7956 19 18 19H6C5.20435 19 4.44129 18.6839 3.87868 18.1213C3.31607 17.5587 3 16.7956 3 16V8C3 7.20435 3.31607 6.44129 3.87868 5.87868C4.44129 5.31607 5.20435 5 6 5H18C18.7956 5 19.5587 5.31607 20.1213 5.87868C20.6839 6.44129 21 7.20435 21 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            number: "04",
            title: "Partnership",
            description: "We act as true partners in your firm's growth and success",
            gradient: "from-cyan-500/20 via-cyan-500/10 to-transparent",
            accent: "bg-cyan-500",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-500">
                    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 11C3 13.3869 3.94821 15.6761 5.63604 17.364C7.32387 19.0518 9.61305 20 12 20C14.3869 20 16.6761 19.0518 18.364 17.364C20.0518 15.6761 21 13.3869 21 11C21 8.61305 20.0518 6.32387 18.364 4.63604C16.6761 2.94821 14.3869 2 12 2C9.61305 2 7.32387 2.94821 5.63604 4.63604C3.94821 6.32387 3 8.61305 3 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8C12.5304 8 13.0391 8.21071 13.4142 8.58579C13.7893 8.96086 14 9.46957 14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12C11.4696 12 10.9609 11.7893 10.5858 11.4142C10.2107 11.0391 10 10.5304 10 10C10 9.46957 10.2107 8.96086 10.5858 8.58579C10.9609 8.21071 11.4696 8 12 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 15C15.8 14.3665 15.4135 13.8067 14.8927 13.4134C14.3719 13.0201 13.7406 12.8128 13.1 12.82C12.42 12.82 11.73 13.04 11.11 13.46C10.5 13.88 10.09 14.44 9.89 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="py-32 relative overflow-hidden"
        >
            {/* Enhanced background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50/30 pointer-events-none"></div>

            {/* 3D-like parallax background elements */}
            <motion.div
                className="absolute -top-40 right-0 w-[70vw] h-[70vw] rounded-full opacity-[0.07] pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(79,107,255,0.3) 0%, rgba(79,107,255,0) 70%)",
                    y: useTransform(scrollYProgress, [0, 1], [0, -200]),
                    scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])
                }}
            />

            <motion.div
                className="absolute top-[30%] -left-20 w-[40vw] h-[40vw] rounded-full opacity-[0.07] pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(79,107,255,0.2) 0%, rgba(79,107,255,0) 70%)",
                    y: useTransform(scrollYProgress, [0, 1], [100, -100]),
                    scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9])
                }}
            />

            {/* Animated geometric shapes */}
            <motion.div
                className="absolute top-[20%] right-[15%] w-40 h-40 border border-[#4F6BFF]/10 rounded-full pointer-events-none"
                style={{
                    y: useTransform(scrollYProgress, [0, 1], [0, -80]),
                    rotate: useTransform(scrollYProgress, [0, 1], [0, 45])
                }}
            />

            <motion.div
                className="absolute bottom-[15%] left-[10%] w-32 h-32 border border-[#4F6BFF]/10 rounded-xl pointer-events-none"
                style={{
                    y: useTransform(scrollYProgress, [0, 1], [50, -30]),
                    rotate: useTransform(scrollYProgress, [0, 1], [10, -20])
                }}
            />

            {/* Subtle animated dots pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(#4F6BFF 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Title section with motion */}
                <motion.div
                    className="text-center mb-20 relative"
                    style={{
                        opacity: titleOpacity,
                        y: titleY
                    }}
                >
                    <motion.span
                        className="inline-block py-1.5 px-4 bg-[#4F6BFF]/10 text-[#4F6BFF] font-medium rounded-full text-sm mb-6 backdrop-blur-sm"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Philosophy
                    </motion.span>

                    <div className="relative">
                        <motion.h2
                            className="text-4xl md:text-6xl font-display font-light tracking-tight text-[#0A2540] mb-6 leading-[1.1] max-w-4xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="overflow-hidden">
                                <motion.div
                                    variants={textRevealVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    The intersection of
                                </motion.div>
                            </div>
                            <div className="overflow-hidden mt-1">
                                <motion.div
                                    variants={textRevealVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-block"
                                >
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F6BFF] to-blue-400 font-normal">human insight</span>
                                </motion.div>
                            </div>
                            <div className="overflow-hidden mt-1">
                                <motion.div
                                    variants={textRevealVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4F6BFF] font-normal">technological efficiency</span>
                                </motion.div>
                            </div>
                        </motion.h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left content column with paragraphs */}
                    <motion.div
                        className="lg:col-span-5 relative"
                        style={{ y: leftColumnY }}
                    >
                        <motion.div
                            className="space-y-8 text-[#505c6e]"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <motion.p
                                className="text-lg leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                            >
                                We founded Acumen Recruiting with a singular vision: to transform how wealth management firms discover talent. Traditional recruiting often relies on either impersonal technology or time-intensive human processes, creating a choice between efficiency and quality.
                            </motion.p>

                            <motion.p
                                className="text-lg leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                            >
                                We've created a different path. By thoughtfully integrating curated human expertise with elegant technology, we deliver a recruitment experience that's both more refined and more effective.
                            </motion.p>

                            <motion.p
                                className="text-lg leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.6 }}
                            >
                                Our approach centers on deep understanding—of each role's nuances, each firm's culture, and each candidate's unique capabilities. This understanding informs every aspect of our process, from how we structure our candidate database to how we design our client interactions.
                            </motion.p>
                        </motion.div>

                        {/* Animated connecting dots */}
                        <motion.div
                            className="absolute -right-8 top-1/3 opacity-30 hidden lg:block"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.3 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <svg width="80" height="160" viewBox="0 0 80 160" fill="none">
                                <motion.path
                                    d="M80 0L0 80L80 160"
                                    stroke="#4F6BFF"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, delay: 0.9 }}
                                />
                            </svg>
                        </motion.div>
                    </motion.div>

                    {/* Right column with principles cards */}
                    <motion.div
                        className="lg:col-span-7 relative"
                        style={{ y: rightColumnY }}
                        variants={principleContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="space-y-6">
                            {principles.map((principle, index) => (
                                <motion.div
                                    key={index}
                                    className={`rounded-xl overflow-hidden backdrop-blur-sm group relative cursor-pointer ${activeIndex === index ? 'ring-2 ring-offset-4 ring-offset-white ring-[#4F6BFF]/20' : 'ring-1 ring-white/40'}`}
                                    variants={principleVariants}
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                >
                                    {/* Card background */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${principle.gradient} opacity-80`}></div>
                                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

                                    <div className="relative p-8 flex items-start gap-5 z-10 overflow-hidden">
                                        {/* Left indicator line */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${principle.accent} opacity-60`}></div>

                                        {/* Number & icon */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-lg bg-white/80 shadow-sm flex items-center justify-center shrink-0 mb-2">
                                                {principle.icon}
                                            </div>
                                            <div className="text-xl font-light text-[#0A2540] opacity-60">{principle.number}</div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h4 className="text-xl font-semibold text-[#0A2540] mb-2">{principle.title}</h4>
                                            <p className="text-[#505c6e]">{principle.description}</p>

                                            {/* Expandable content */}
                                            <AnimatePresence>
                                                {activeIndex === index && (
                                                    <motion.div
                                                        className="mt-4 pt-4 border-t border-[#4F6BFF]/10"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <p className="text-sm text-[#505c6e]">
                                                            {index === 0 && "Our exclusive focus on wealth management means we understand the nuances of the industry, the regulatory landscape, and the specific skills required for success."}
                                                            {index === 1 && "We rigorously evaluate each candidate through multi-stage assessments, ensuring only the most qualified professionals reach your consideration."}
                                                            {index === 2 && "Our proprietary platform combines AI-driven matching with human expertise, creating a recruitment process that's both efficient and insightful."}
                                                            {index === 3 && "We don't just fill positions; we build relationships that drive long-term success for both firms and candidates."}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Plus/minus icon */}
                                        <motion.div
                                            className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center"
                                            animate={{ rotate: activeIndex === index ? 45 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 1V11" stroke="#4F6BFF" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M1 6H11" stroke="#4F6BFF" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Quote section with dynamic effects */}
                <motion.div
                    className="mt-32 relative"
                    style={{
                        scale: quoteScale,
                        opacity: quoteOpacity
                    }}
                >
                    <div className="max-w-5xl mx-auto">
                        {/* Quote marks */}
                        <motion.div
                            className="absolute -top-16 left-10 text-8xl text-[#4F6BFF]/20 font-serif leading-none"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            "
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-20 right-10 text-8xl text-[#4F6BFF]/20 font-serif leading-none"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                        >
                            "
                        </motion.div>

                        {/* Creative glass card for quote */}
                        <motion.div
                            className="relative rounded-2xl overflow-hidden glass-card border border-white/40 p-12 shadow-xl backdrop-blur-sm"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            {/* Background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4F6BFF]/5 via-transparent to-[#4F6BFF]/5 opacity-70"></div>

                            {/* Quote content */}
                            <div className="relative z-10 text-center">
                                <motion.p
                                    className="text-2xl md:text-3xl font-display font-light text-[#0A2540] leading-relaxed italic"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.4 }}
                                >
                                    We believe in creating partnerships, not transactions. Our success is measured by the growth and success of the firms we serve.
                                </motion.p>

                                <motion.div
                                    className="mt-8 inline-block relative"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.6 }}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-0.5 bg-[#4F6BFF]/20 mb-4"></div>
                                        <div className="text-sm font-medium text-[#4F6BFF] tracking-wider">
                                            FOUNDER, ACUMEN RECRUITING
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full border border-[#4F6BFF]/10 opacity-30"></div>
                            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full border border-[#4F6BFF]/10 opacity-30"></div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Philosophy;