import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, ArrowRight, User, Target, Clock } from "lucide-react";

const ClientPerspectives = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef(null);
    const sectionRef = useRef(null);

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax and opacity transforms
    const headerY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

    // Testimonial data
    const testimonials = [
        {
            quote: "Acumen Recruiting has transformed our hiring process. Their pre-screened candidates were all high-quality, and the video interviews saved us countless hours of initial screening.",
            author: "Sarah Johnson",
            title: "Director of Talent Acquisition, Regional Wealth Management Firm",
            rating: 5,
            highlight: "...transformed our hiring process.",
            color: "#4F6BFF"
        },
        {
            quote: "The Talent DeepDive™ interviews gave us incredible insight into candidates before we ever spoke with them. We hired our new Senior Wealth Manager within 10 days of starting the process.",
            author: "Michael Chen",
            title: "Managing Partner, Pacific Financial Group",
            rating: 5,
            highlight: "...hired our new Senior Wealth Manager within 10 days.",
            color: "#6366F1"
        },
        {
            quote: "Their database of pre-screened candidates is impressive, but what really sets Acumen apart is their understanding of wealth management roles and the specific skills needed.",
            author: "Jennifer Taylor",
            title: "COO, Taylor Financial Solutions",
            rating: 5,
            highlight: "...what really sets Acumen apart is their understanding of wealth management roles.",
            color: "#8B5CF6"
        },
        {
            quote: "As a boutique firm, we struggled to compete for talent with the big players. Acumen gave us access to high-quality candidates we wouldn't have found otherwise.",
            author: "David Wilson",
            title: "Founder, Cornerstone Wealth Advisors",
            rating: 5,
            highlight: "...access to high-quality candidates we wouldn't have found otherwise.",
            color: "#EC4899"
        }
    ];

    // Auto-advance carousel with a longer duration
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000); // 6 seconds per testimonial

        return () => clearInterval(interval);
    }, [isPaused, testimonials.length]);

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsPaused(true);
    };

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsPaused(true);
    };

    return (
        <section
            ref={sectionRef}
            className="py-28 md:py-36 relative overflow-hidden"
            style={{
                background: "linear-gradient(to bottom, rgba(245, 248, 255, 0.8), rgba(255, 255, 255, 1))"
            }}
        >
            {/* Sophisticated background elements */}
            <motion.div
                className="absolute inset-0 w-full h-full opacity-40"
                style={{
                    y: backgroundY,
                    scale: backgroundScale,
                    backgroundImage: "radial-gradient(circle at 20% 25%, rgba(79, 107, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)"
                }}
            />

            {/* Subtle grain texture */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />

            {/* Decorative floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-[20%] right-[15%] w-64 h-64 rounded-full border border-[#4F6BFF]/10"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute bottom-[15%] left-[10%] w-48 h-48 border border-[#6366F1]/10 rounded-full"
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -3, 0],
                        scale: [1, 1.03, 1]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-16"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <motion.span
                        className="inline-block py-1 px-3 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Client Experiences
                    </motion.span>

                    <motion.h2
                        className="text-4xl md:text-5xl font-display font-light tracking-tight text-foreground mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        Client Perspectives
                    </motion.h2>

                    <motion.p
                        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Insights from wealth management firms on their experience with Acumen Recruiting
                    </motion.p>
                </motion.div>

                {/* Refined Testimonial Carousel */}
                <div
                    ref={containerRef}
                    className="relative max-w-6xl mx-auto mb-20"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    
                    {/* Testimonial display area with proper sizing */}
                    <div className="lg:col-span-4 bg-white p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[400px] flex items-center">
                        {/* Subtle accent elements */}
                        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-ph/30 to-transparent"></div>
                        <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-gradient-to-br from-ph/5 to-transparent blur-3xl"></div>

                        <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                initial={{
                                    opacity: 0,
                                    y: direction > 0 ? 30 : -30,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: direction > 0 ? -30 : 30,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                                className="w-full"
                            >
                                <div className="max-w-2xl mx-auto">
                                    {/* Open quote mark */}
                                    <div className="mb-6">
                                        <Quote className="w-10 h-10 text-ph/10" />
                                    </div>

                                    {/* Elegant quote display */}
                                    <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-foreground mb-8 relative pl-4 border-l-2" style={{ borderColor: `${testimonials[activeIndex].color}30` }}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.7 }}
                                        >
                                            {/* Quote text with sophisticated highlighting */}
                                            {(() => {
                                                const quote = testimonials[activeIndex].quote;
                                                const highlight = testimonials[activeIndex].highlight;

                                                if (!quote.includes(highlight)) return quote;

                                                const parts = quote.split(highlight);

                                                return (
                                                    <>
                                                        {parts[0]}
                                                        <motion.span
                                                            className="relative inline"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.4, duration: 0.6 }}
                                                        >
                                                            <span className="relative inline-block">
                                                                <span className="relative z-10 font-medium" style={{ color: testimonials[activeIndex].color }}>
                                                                    {highlight}
                                                                </span>
                                                                <motion.span
                                                                    className="absolute -bottom-0 left-0 right-0 h-[8px] opacity-10 rounded-sm"
                                                                    style={{ backgroundColor: testimonials[activeIndex].color }}
                                                                    initial={{ scaleX: 0, originX: 0 }}
                                                                    animate={{ scaleX: 1 }}
                                                                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                                                />
                                                            </span>
                                                        </motion.span>
                                                        {parts[1]}
                                                    </>
                                                );
                                            })()}
                                        </motion.div>
                                    </blockquote>

                                    {/* Rating stars with refined styling */}
                                    <div className="flex items-center mb-6">
                                        <div className="flex mr-3">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.3 }}
                                                >
                                                    <Star
                                                        className={`w-4 h-4 mr-1 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="h-4 w-px bg-gray-200 mx-3"></div>
                                        <div className="text-sm text-muted-foreground">Verified Client</div>
                                    </div>

                                    {/* Author information with elegant styling */}
                                    <motion.div
                                        className="flex items-center"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.6 }}
                                    >
                                        <div className="p-px bg-gradient-to-r from-ph/30 to-transparent rounded-full mr-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ph/10 to-white flex items-center justify-center text-ph font-medium">
                                                {testimonials[activeIndex].author.split(' ').map(name => name[0]).join('')}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">
                                                {testimonials[activeIndex].author}
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-0.5">
                                                {testimonials[activeIndex].title}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Refined navigation controls */}
                    <div className="flex justify-between items-center mt-10">
                        {/* Left side controls */}
                        <div className="flex items-center gap-3">
                            <motion.button
                                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-ph transition-colors border border-white/20"
                                onClick={handlePrev}
                                whileHover={{ x: -3 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-ph transition-colors border border-white/20"
                                onClick={handleNext}
                                whileHover={{ x: 3 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </div>

                        {/* Right side pagination dots with elegant active indicator */}
                        <div className="flex gap-2 items-center">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className="group relative"
                                    onClick={() => {
                                        setDirection(index > activeIndex ? 1 : -1);
                                        setActiveIndex(index);
                                        setIsPaused(true);
                                    }}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                >
                                    <motion.div
                                        className="w-8 h-1 rounded-full transition-colors relative"
                                        initial={false}
                                        animate={{
                                            backgroundColor: activeIndex === index ? testimonials[index].color : "#E5E7EB"
                                        }}
                                        whileHover={{
                                            backgroundColor: activeIndex === index ? testimonials[index].color : "#CBD5E1"
                                        }}
                                    >
                                        {activeIndex === index && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{ backgroundColor: testimonials[index].color }}
                                                layoutId="activeDot"
                                                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                            />
                                        )}
                                    </motion.div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Refined insights section */}
                <motion.div
                    className="mt-24 rounded-2xl shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <InsightCard
                            title="Client Retention"
                            description="Higher retention rates with candidates placed through our refined selection process."
                            color="#4F6BFF"
                            icon={<User className="w-5 h-5" />}
                        />
                        <InsightCard
                            title="Accelerated Process"
                            description="Hiring timeline reduced from months to days through efficient workflows."
                            color="#6366F1"
                            icon={<Clock className="w-5 h-5" />}
                        />
                        <InsightCard
                            title="Strategic Alignment"
                            description="Candidates demonstrate exceptional cultural and operational alignment."
                            color="#8B5CF6"
                            icon={<Target className="w-5 h-5" />}
                        />
                    </div>
                </motion.div>

                {/* CTA section */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <motion.h3
                        className="text-2xl font-display font-light text-foreground mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.7 }}
                    >
                        Elevate Your Talent Strategy
                    </motion.h3>

                    <motion.p
                        className="text-muted-foreground mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                    >
                        Refine your wealth management practice with precisely matched talent.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9, duration: 0.7 }}
                    >
                        <motion.a
                            href="/case-studies"
                            className="button-secondary inline-flex items-center justify-center gap-2 group"
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View Case Studies
                            <motion.div
                                className="transition-transform"
                                animate={{ x: 0 }}
                                whileHover={{ x: 3 }}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </motion.a>

                        <motion.a
                            href="/contact"
                            className="button-primary inline-flex items-center justify-center gap-2 relative overflow-hidden group"
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">Request Consultation</span>
                            <motion.div
                                className="transition-transform relative z-10"
                                animate={{ x: 0 }}
                                whileHover={{ x: 3 }}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>

                            {/* Animated gradient background */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-ph via-[#6366F1] to-ph"
                                initial={{ x: "100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

// Elegant Insight Card Component without animations
const InsightCard = ({ title, description, color, icon }) => {
    return (
        <div className="px-8 py-12 relative group transition-all duration-300 hover:bg-white hover:shadow-md border-r border-b border-gray-100 last:border-r-0 md:last:border-r md:first:border-l-0 md:border-r-0">
            <div className="flex flex-col items-center text-center">
                {/* Icon with subtle background */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${color}10` }}>
                    <div className="text-[#4F6BFF]">
                        {icon}
                    </div>
                </div>

                {/* Title with subtle animation */}
                <h4 className="text-lg font-medium text-foreground mb-3 relative">
                    {title}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                        style={{ backgroundColor: color }}></div>
                </h4>

                {/* Description */}
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};

export default ClientPerspectives;