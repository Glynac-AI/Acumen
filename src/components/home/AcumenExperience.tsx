import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import {
    PhoneCall,
    CreditCard,
    Video,
    MessageSquare,
    RefreshCw,
    Check,
    ChevronRight
} from "lucide-react";

const AcumenExperience = () => {
    const [activeStep, setActiveStep] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const stepsContainerRef = useRef<HTMLDivElement>(null);

    // Check if timeline is in view for enhanced animations
    const timelineInView = useInView(timelineRef, { once: false, amount: 0.2 });

    // Track if we're in a mobile view
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile view on component mount and window resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Progress animation for the timeline
    const [timelineProgress, setTimelineProgress] = useState(0);

    // Update timeline progress when active step changes
    useEffect(() => {
        const progress = activeStep / (steps.length - 1);
        setTimelineProgress(progress);
    }, [activeStep]);

    // Spring animation for smooth progress transitions
    const springProgress = useSpring(timelineProgress, {
        stiffness: 60,
        damping: 20,
        restDelta: 0.001
    });

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const titleOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0.05, 0.15], [30, 0]);

    // Advanced scroll-linked animation for mobile steps
    useEffect(() => {
        if (!isMobile || !stepsContainerRef.current) return;

        const handleScroll = () => {
            if (!stepsContainerRef.current) return;

            const containerRect = stepsContainerRef.current.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerHeight = containerRect.height;
            const windowHeight = window.innerHeight;

            // Calculate which step should be active based on scroll position
            if (containerTop <= windowHeight * 0.5 && containerTop > -containerHeight + windowHeight * 0.5) {
                const scrollProgress = (windowHeight * 0.5 - containerTop) / (containerHeight - windowHeight * 0.1);
                const stepIndex = Math.min(
                    Math.floor(scrollProgress * steps.length),
                    steps.length - 1
                );
                if (stepIndex >= 0 && stepIndex !== activeStep) {
                    setActiveStep(stepIndex);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobile, activeStep]);

    // Enhanced animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    const stepLineVariants: Variants = {
        hidden: { scaleY: 0, originY: 0 },
        visible: {
            scaleY: 1,
            transition: {
                duration: 1.8,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const fadeInUpVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const steps = [
        {
            number: "01",
            icon: <PhoneCall className="w-6 h-6" />,
            title: "Consultation",
            description: "Beginning with a conversation about your firm's unique needs and culture.",
            detail: "During this initial discussion, we explore your specific requirements, team dynamics, and ideal candidate profile. This foundational understanding allows us to tailor our approach precisely to your situation, ensuring alignment from the start."
        },
        {
            number: "02",
            icon: <CreditCard className="w-6 h-6" />,
            title: "Curation",
            description: "Designing a tailored approach that aligns with your specific requirements.",
            detail: "We select from our Talent Snapshot™ and Talent DeepDive™ methodologies to create the optimal solution for your needs. Our account team works with you to craft questions that reveal the exact qualities and capabilities you seek in candidates."
        },
        {
            number: "03",
            icon: <Video className="w-6 h-6" />,
            title: "Discovery",
            description: "Revealing carefully selected candidates through our platform.",
            detail: "Candidates complete introductory videos and interviews, providing you with rich, multi-dimensional insights. Our client portal delivers these seamlessly to you, with notifications for each new candidate added to your consideration."
        },
        {
            number: "04",
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Refinement",
            description: "Collaboratively evolving our search based on your insights and preferences.",
            detail: "After reviewing initial candidates, we conduct a detailed feedback session to refine our understanding of your ideal match. This iterative approach ensures increasing precision as the search progresses."
        },
        {
            number: "05",
            icon: <RefreshCw className="w-6 h-6" />,
            title: "Completion",
            description: "Delivering exceptional talent that enhances your firm's capabilities.",
            detail: "The search continues until you've found your ideal candidate. Throughout the process, you have complete visibility through our client portal, with our team providing guidance and support at every stage."
        }
    ];

    // Function to determine the opacity based on active step
    const getStepOpacity = (index: number) => {
        if (index === activeStep) return 1;
        if (Math.abs(index - activeStep) === 1) return 0.7;
        if (Math.abs(index - activeStep) === 2) return 0.4;
        return 0.2;
    };

    return (
        <section
            ref={sectionRef}
            className="py-36 relative overflow-hidden"
        >
            {/* Enhanced background with parallax effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/30 pointer-events-none"
                style={{
                    opacity: backgroundOpacity,
                    y: backgroundY
                }}
            />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient orb with parallax */}
                <motion.div
                    className="absolute top-0 right-0 w-[70vw] h-[70vh] rounded-full opacity-[0.05]"
                    style={{
                        background: "radial-gradient(circle, rgba(79,107,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                        y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
                    }}
                />

                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px'
                }} />

                {/* Dot pattern */}
                <div className="absolute bottom-0 left-0 w-full h-64 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(#4F6BFF 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }} />

                {/* Floating decorative elements with parallax */}
                <motion.div
                    className="absolute top-1/4 left-[10%] w-32 h-32 border border-[#4F6BFF]/10 rounded-full"
                    style={{
                        y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
                    }}
                    animate={{
                        rotate: [0, 10, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute bottom-1/4 right-[10%] w-24 h-24 border border-[#4F6BFF]/10 rounded-lg"
                    style={{
                        y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
                    }}
                    animate={{
                        rotate: [0, -5, 0],
                        scale: [1, 1.03, 1]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Enhanced header with motion */}
                <motion.div
                    className="text-center mb-24"
                    style={{ opacity: titleOpacity, y: titleY }}
                >
                    <motion.span
                        className="inline-block py-1.5 px-4 bg-[#4F6BFF]/10 text-[#4F6BFF] font-medium rounded-full text-sm mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Process
                    </motion.span>

                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-tight text-[#0A2540] mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        The Acumen Experience
                    </motion.h2>

                    <motion.p
                        className="text-xl text-[#505c6e]/90 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        A thoughtfully designed journey from consultation to placement
                    </motion.p>
                </motion.div>

                {/* Mobile view timeline with enhanced UX */}
                <div className="lg:hidden mb-16" ref={stepsContainerRef}>
                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className={`relative transition-all duration-500`}
                                style={{ opacity: getStepOpacity(index) }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: getStepOpacity(index), y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                            >
                                {/* Connecting line with animated progress for mobile */}
                                {index < steps.length - 1 && (
                                    <div className="absolute top-[70px] left-[29px] w-0.5 h-[calc(100%+64px)] bg-gray-100 overflow-hidden">
                                        <motion.div
                                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#4F6BFF] to-[#4F6BFF]/40"
                                            style={{
                                                height: index < activeStep ? "100%" : "0%",
                                                originY: 0
                                            }}
                                            animate={{ height: index < activeStep ? "100%" : "0%" }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                        />
                                    </div>
                                )}

                                <div className="flex gap-6">
                                    {/* Left circle with number and animated border */}
                                    <div className="relative">
                                        <motion.div
                                            className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-light transition-all duration-500 relative z-10 ${activeStep === index
                                                    ? 'bg-[#4F6BFF] text-white shadow-lg shadow-[#4F6BFF]/20'
                                                    : index < activeStep
                                                        ? 'bg-white text-[#4F6BFF] border border-[#4F6BFF]/50'
                                                        : 'bg-white text-[#505c6e]/70 border border-gray-200'
                                                }`}
                                            animate={{
                                                scale: activeStep === index ? 1.1 : 1,
                                                boxShadow: activeStep === index ? "0 10px 25px -5px rgba(79, 107, 255, 0.3)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {index < activeStep ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                step.number
                                            )}
                                        </motion.div>

                                        {/* Pulsing effect for active step */}
                                        {activeStep === index && (
                                            <motion.div
                                                className="absolute top-0 left-0 w-full h-full rounded-full bg-[#4F6BFF]/20"
                                                animate={{
                                                    scale: [1, 1.4, 1],
                                                    opacity: [0.7, 0, 0.7]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* Content card with enhanced animations */}
                                    <div className="flex-1">
                                        <motion.div
                                            className={`bg-white rounded-xl p-6 transition-all duration-300 ${activeStep === index
                                                    ? 'shadow-md shadow-[#4F6BFF]/5 border border-[#4F6BFF]/10'
                                                    : 'shadow-sm'
                                                }`}
                                            animate={{
                                                y: activeStep === index ? -5 : 0,
                                                boxShadow: activeStep === index
                                                    ? "0 10px 25px -5px rgba(79, 107, 255, 0.1)"
                                                    : "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
                                            }}
                                            whileHover={{ y: -3 }}
                                            whileTap={{ y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => setActiveStep(index)}
                                        >
                                            <div className="flex items-center mb-4 text-[#4F6BFF]">
                                                {step.icon}
                                                <h3 className="text-xl font-medium text-[#0A2540] ml-3">{step.title}</h3>
                                            </div>
                                            <p className="text-[#505c6e]/90 mb-4">{step.description}</p>

                                            <AnimatePresence mode="wait">
                                                {activeStep === index && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                        className="text-sm text-[#505c6e]/80 pt-4 border-t border-gray-100"
                                                    >
                                                        {step.detail}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Desktop timeline with premium animations */}
                <div className="hidden lg:block relative" ref={timelineRef}>
                    {/* Center line container */}
                    <div className="absolute top-10 bottom-10 left-1/2 w-px bg-gray-100 -translate-x-1/2 z-0 overflow-hidden">
                        {/* Animated progress line */}
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#4F6BFF] to-[#4F6BFF]/40"
                            style={{ height: springProgress, originY: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    {/* Step indicators on the line - REMOVED */}

                    <motion.div
                        className="relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {steps.map((step, index) => {
                            const isLeft = index % 2 === 0;
                            const isActive = index === activeStep;
                            const isCompleted = index < activeStep;

                            return (
                                <motion.div
                                    key={index}
                                    className="relative"
                                    variants={itemVariants}
                                >
                                    <div className={`flex items-center ${isLeft ? 'justify-end' : 'justify-start'} mb-28 last:mb-0`}>
                                        <div
                                            className={`w-full md:w-5/12 ${isLeft ? 'text-right pr-16' : 'pl-16'}`}
                                        >
                                            <motion.div
                                                className={`p-8 rounded-xl bg-white cursor-pointer relative overflow-hidden transition-all duration-300 ${isActive
                                                        ? 'shadow-lg shadow-[#4F6BFF]/10 border border-[#4F6BFF]/20'
                                                        : isCompleted
                                                            ? 'shadow-md border border-[#4F6BFF]/10'
                                                            : 'shadow-sm'
                                                    }`}
                                                onClick={() => setActiveStep(index)}
                                                whileHover={{
                                                    y: -5,
                                                    boxShadow: "0 20px 30px -10px rgba(79, 107, 255, 0.15)"
                                                }}
                                                animate={{
                                                    scale: isActive ? 1.02 : 1,
                                                    y: isActive ? -3 : 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {/* Subtle gradient background */}
                                                <div className={`absolute inset-0 bg-gradient-to-br from-[#4F6BFF]/5 to-transparent opacity-${isActive ? '100' : '0'} transition-opacity duration-300`}></div>

                                                {/* Step header */}
                                                <div className={`flex items-center gap-4 mb-5 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`w-12 h-12 rounded-full bg-[#4F6BFF]/10 text-[#4F6BFF] flex items-center justify-center shrink-0 ${isLeft ? 'order-1 ml-4' : 'order-0 mr-4'}`}>
                                                        {step.icon}
                                                    </div>
                                                    <h3 className="text-xl font-medium text-[#0A2540] group flex items-center gap-2">
                                                        <span className="text-[#4F6BFF] mr-2 font-light">{step.number}</span>
                                                        {step.title}
                                                        {isActive && (
                                                            <motion.span
                                                                initial={{ width: 0 }}
                                                                animate={{ width: 'auto' }}
                                                                className="text-[#4F6BFF] inline-block overflow-hidden"
                                                            >
                                                                <motion.span
                                                                    initial={{ x: -20, opacity: 0 }}
                                                                    animate={{ x: 0, opacity: 1 }}
                                                                    transition={{ delay: 0.2 }}
                                                                >
                                                                    <Check className="w-5 h-5" />
                                                                </motion.span>
                                                            </motion.span>
                                                        )}
                                                    </h3>
                                                </div>

                                                {/* Step description */}
                                                <p className={`text-[#505c6e]/90 mb-5 ${isLeft ? 'text-right' : 'text-left'}`}>
                                                    {step.description}
                                                </p>

                                                {/* Expanded details with enhanced animation */}
                                                <AnimatePresence mode="wait">
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                                            className="text-sm text-[#505c6e]/80 border-t border-gray-100 pt-4"
                                                        >
                                                            {step.detail}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Completed indicator */}
                                                {isCompleted && !isActive && (
                                                    <div className={`absolute ${isLeft ? 'left-2' : 'right-2'} top-2 w-6 h-6 rounded-full bg-[#4F6BFF]/10 flex items-center justify-center text-[#4F6BFF]`}>
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Enhanced center point with dynamic animations */}
                                        <motion.div
                                            className={`absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white z-20 flex items-center justify-center transition-all duration-500 ${isActive
                                                    ? 'shadow-lg shadow-[#4F6BFF]/20 border-2 border-[#4F6BFF] text-[#4F6BFF]'
                                                    : isCompleted
                                                        ? 'shadow-md border border-[#4F6BFF] text-[#4F6BFF]'
                                                        : 'shadow-sm border border-gray-200 text-gray-400'
                                                }`}
                                            animate={{
                                                scale: isActive ? 1.15 : 1,
                                                boxShadow: isActive
                                                    ? "0 10px 25px -5px rgba(79, 107, 255, 0.3)"
                                                    : isCompleted
                                                        ? "0 4px 10px -1px rgba(79, 107, 255, 0.15)"
                                                        : "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => setActiveStep(index)}
                                        >
                                            {isCompleted ? <Check className="w-5 h-5" /> : step.number}

                                            {/* Pulsing effect for active step */}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute -inset-2 rounded-full border-2 border-[#4F6BFF]/40 z-0"
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [1, 0, 1]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            )}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Enhanced CTA section */}
                <motion.div
                    className="mt-24 text-center"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.h3
                        className="text-2xl font-display font-light text-[#0A2540] mb-4"
                        variants={fadeInUpVariants}
                        transition={{ delay: 0.1 }}
                    >
                        Experience the Difference
                    </motion.h3>

                    <motion.p
                        className="text-[#505c6e]/90 mb-8 max-w-2xl mx-auto"
                        variants={fadeInUpVariants}
                        transition={{ delay: 0.2 }}
                    >
                        Our refined process combines technological efficiency with human insight to deliver exceptional candidates—precisely matched to your requirements.
                    </motion.p>

                    <motion.a
                        href="/contact"
                        className="relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#4F6BFF] text-white font-medium rounded-full shadow-sm overflow-hidden group"
                        whileHover={{
                            boxShadow: "0 10px 25px -5px rgba(79, 107, 255, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Button background animation */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#4F6BFF] to-[#627EFF] opacity-0 group-hover:opacity-100"
                            initial={{ x: "100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.4 }}
                        />

                        <span className="relative z-10">Schedule a Consultation</span>
                        <PhoneCall className="w-4 h-4 relative z-10" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default AcumenExperience;