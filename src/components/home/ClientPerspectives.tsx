import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const ClientPerspectives = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
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

    // Auto-advance carousel
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000); // Longer duration for a more elegant pace

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

    // Touch/mouse drag handling
    const handleDragStart = (e) => {
        setIsDragging(true);
        setDragStartX(e.clientX || e.touches[0].clientX);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const currentX = e.clientX || (e.touches && e.touches[0].clientX);
        if (!currentX) return;

        const diff = dragStartX - currentX;

        // Threshold to trigger slide change
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
            setIsDragging(false);
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <section
            ref={sectionRef}
            className="py-28 md:py-40 relative overflow-hidden"
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

                <motion.div
                    className="absolute top-[35%] left-[20%] w-32 h-32 rounded-full bg-gradient-to-br from-[#4F6BFF]/10 to-transparent blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-20"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <motion.span
                        className="inline-block py-1 px-3 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Client Success Stories
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
                        Hear from wealth management firms who have transformed their hiring process with Acumen Recruiting
                    </motion.p>
                </motion.div>

                {/* Sophisticated Testimonial Carousel */}
                <div
                    ref={containerRef}
                    className="relative max-w-5xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                >
                    {/* Large quote marks */}
                    <Quote className="absolute -top-10 left-0 w-20 h-20 text-ph/10 transform -scale-x-100" />
                    <Quote className="absolute -bottom-10 right-0 w-20 h-20 text-ph/10 transform rotate-180" />

                    {/* Testimonial display area */}
                    <div className="relative glass-card rounded-2xl overflow-hidden shadow-lg shadow-ph/5 border border-white/20">
                        {/* Progress indicator */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 z-10">
                            {testimonials.map((_, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-ph to-ph-dark"
                                    initial={{ width: index === 0 ? "0%" : "0%" }}
                                    animate={{
                                        width: index === activeIndex ? "100%" : "0%",
                                        left: `${(index / testimonials.length) * 100}%`,
                                        right: `${((testimonials.length - 1 - index) / testimonials.length) * 100}%`
                                    }}
                                    transition={index === activeIndex ? {
                                        duration: 8,
                                        ease: "linear",
                                        repeatType: "loop"
                                    } : { duration: 0.5 }}
                                    style={{
                                        width: index < activeIndex ? "100%" : "0%"
                                    }}
                                />
                            ))}
                        </div>

                        <div className="p-6 md:p-10 lg:p-16 min-h-[350px] md:min-h-[400px]">
                            <div className="relative flex flex-col justify-center h-full">
                                <AnimatePresence mode="wait" initial={false} custom={direction}>
                                    <motion.div
                                        key={activeIndex}
                                        custom={direction}
                                        initial={{
                                            opacity: 0,
                                            x: direction > 0 ? 100 : -100,
                                            scale: 0.9
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            scale: 1
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: direction > 0 ? -100 : 100,
                                            scale: 0.9
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                        className="absolute inset-0 flex flex-col justify-center"
                                    >
                                        {/* Rating stars */}
                                        <div className="flex justify-center mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                                                >
                                                    <Star
                                                        className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Quote text with sophisticated highlighting */}
                                        <div className="mb-8">
                                            <blockquote className="text-xl md:text-2xl text-center font-light leading-relaxed relative">
                                                {testimonials[activeIndex].quote.split(testimonials[activeIndex].highlight)[0]}
                                                <motion.span
                                                    className="font-medium relative inline-block"
                                                    style={{ color: testimonials[activeIndex].color }}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4, duration: 0.6 }}
                                                >
                                                    {testimonials[activeIndex].highlight}
                                                    <motion.span
                                                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-current"
                                                        initial={{ scaleX: 0, originX: 0 }}
                                                        animate={{ scaleX: 1 }}
                                                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                                    />
                                                </motion.span>
                                                {testimonials[activeIndex].quote.split(testimonials[activeIndex].highlight)[1]}
                                            </blockquote>
                                        </div>

                                        {/* Author information with elegant animation */}
                                        <motion.div
                                            className="text-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.6 }}
                                        >
                                            <div className="inline-flex flex-col items-center">
                                                <div className="h-px w-10 bg-ph/30 mb-4"></div>
                                                <div className="font-medium text-lg text-foreground">
                                                    {testimonials[activeIndex].author}
                                                </div>
                                                <div className="text-sm text-muted-foreground mt-1 max-w-lg">
                                                    {testimonials[activeIndex].title}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Sophisticated navigation controls */}
                    <div className="flex justify-between mt-10">
                        {/* Left side controls */}
                        <div className="flex items-center gap-3">
                            <motion.button
                                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:text-ph transition-colors border border-white/20"
                                onClick={handlePrev}
                                whileHover={{ x: -3 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:text-ph transition-colors border border-white/20"
                                onClick={handleNext}
                                whileHover={{ x: 3 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </div>

                        {/* Right side pagination dots with active indicator */}
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

                {/* Social proof metrics */}
                <motion.div
                    className="mt-24 glass-card border border-white/20 rounded-xl p-8 md:p-10 shadow-sm"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <MetricCard
                            number="100%"
                            label="Client satisfaction rate"
                            description="All our clients report high satisfaction with our talent solutions"
                            color="#4F6BFF"
                            delay={0}
                        />
                        <MetricCard
                            number="78%"
                            label="Time-to-hire reduction"
                            description="Our clients experience significantly faster hiring processes"
                            color="#6366F1"
                            delay={0.2}
                        />
                        <MetricCard
                            number="95%"
                            label="Candidate retention"
                            description="Candidates placed by Acumen stay with firms longer"
                            color="#8B5CF6"
                            delay={0.4}
                        />
                    </div>
                </motion.div>

                {/* Sophisticated CTA */}
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
                        Join Our Satisfied Clients
                    </motion.h3>

                    <motion.p
                        className="text-muted-foreground mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                    >
                        Experience the Acumen difference for yourself. Our recruiting specialists are ready to help you find the perfect candidates for your wealth management firm.
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
                            View Client Case Studies
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
                            <span className="relative z-10">Schedule a Consultation</span>
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

// Metric Card Component with sophisticated counter animation
const MetricCard = ({ number, label, description, color, delay }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: countRef,
        offset: ["start end", "end start"]
    });

    // Determine if the number is a percentage
    const isPercentage = number.includes('%');
    const targetNumber = parseInt(number.replace('%', ''));

    // Animate count when in view
    useEffect(() => {
        let animationFrameId;

        const handleScroll = () => {
            if (!countRef.current) return;

            const rect = countRef.current.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

            if (isInView) {
                let startTimestamp = null;
                const duration = 1500; // 1.5 seconds

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const currentCount = Math.floor(progress * targetNumber);

                    setCount(currentCount);

                    if (progress < 1) {
                        animationFrameId = window.requestAnimationFrame(step);
                    } else {
                        setCount(targetNumber);
                    }
                };

                animationFrameId = window.requestAnimationFrame(step);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [targetNumber]);

    return (
        <motion.div
            className="text-center px-6 py-8 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay, duration: 0.7 }}
        >
            {/* Accent line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full" style={{ backgroundColor: color }}></div>

            {/* Animated number */}
            <div ref={countRef} className="text-4xl font-light tracking-tight mb-2" style={{ color }}>
                {count}{isPercentage && '%'}
            </div>

            {/* Label */}
            <div className="text-lg font-medium text-foreground mb-3">{label}</div>

            {/* Description */}
            <p className="text-sm text-muted-foreground">{description}</p>
        </motion.div>
    );
};

export default ClientPerspectives;