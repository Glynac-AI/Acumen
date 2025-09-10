import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const Expertise = () => {
    // Refs for scroll-based animations
    const sectionRef = useRef(null);
    
    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const backgroundScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

    // Animation variants with proper TypeScript types
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    // Expertise categories with enhanced visual elements
    const expertiseCategories = [
        {
            title: "Wealth Management",
            roles: ["Portfolio Managers", "Financial Advisors", "Investment Strategists"],
            count: 500,
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-ph">
                    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-7h-2c0-1-1.5-2-3-2z" />
                    <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                    <path d="M16 19h3a2 2 0 0 0 2-2v-3" />
                </svg>
            )
        },
        {
            title: "Planning & Advisory",
            roles: ["Financial Planners", "Tax Advisors", "Estate Specialists"],
            count: 450,
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-ph">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                    <path d="M13 8h.01" />
                    <path d="M13 12h.01" />
                    <path d="M13 16h.01" />
                    <path d="M17 8h.01" />
                    <path d="M17 12h.01" />
                    <path d="M17 16h.01" />
                </svg>
            )
        },
        {
            title: "Operations & Compliance",
            roles: ["Compliance Officers", "Operations Leaders", "Client Service Professionals"],
            count: 1050,
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-ph">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            )
        }
    ];

    return (
        <section 
            ref={sectionRef}
            className="py-32 relative overflow-hidden"
        >
            {/* Enhanced background elements with parallax effects */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-white to-ph-light/5 z-0"
                style={{ 
                    opacity: backgroundOpacity,
                    scale: backgroundScale
                }}
            />
            
            {/* Animated background decorative elements */}
            <motion.div 
                className="absolute top-1/4 right-0 w-96 h-96 bg-ph/5 rounded-full blur-3xl -z-10 opacity-50"
                style={{
                    x: useTransform(scrollYProgress, [0, 1], [100, -100]),
                    scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])
                }}
            />
            <motion.div 
                className="absolute bottom-1/4 left-0 w-64 h-64 bg-ph/5 rounded-full blur-3xl -z-10 opacity-50"
                style={{
                    x: useTransform(scrollYProgress, [0, 1], [-50, 50]),
                    scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1])
                }}
            />
            
            {/* Subtle grain texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-20"
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.span 
                        className="inline-block py-1 px-3 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        Our Expertise
                    </motion.span>
                    <motion.h2 
                        className="text-4xl md:text-5xl font-display font-light tracking-wide text-foreground mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Curated Talent for Wealth Management
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        We specialize exclusively in wealth management talent, bringing precision and insight to every search.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {expertiseCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            variants={itemVariants}
                        >
                            <motion.div 
                                className="glass-card rounded-xl overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-500"
                                whileHover={{ 
                                    y: -8,
                                    boxShadow: "0 20px 40px rgba(79, 107, 255, 0.1)",
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {/* Card header with gradient */}
                                <div className={`p-8 bg-gradient-to-br from-ph/10 to-transparent`}>
                                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-ph mb-5 shadow-sm">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xl font-medium text-foreground mb-3">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Card content */}
                                <div className="p-8 pt-2 flex-grow bg-white">
                                    <ul className="space-y-4 mb-6">
                                        {category.roles.map((role, roleIndex) => (
                                            <motion.li
                                                key={roleIndex}
                                                className="flex items-center"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + (roleIndex * 0.1), duration: 0.5 }}
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-ph/70 mr-3"></div>
                                                <span className="text-muted-foreground">{role}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                    
                                    {/* Candidate count indicator */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Candidate Database</span>
                                            <span className="text-ph font-medium">{category.count}+</span>
                                        </div>
                                        <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-ph rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${Math.min(100, (category.count / 2000) * 100)}%` }}
                                                transition={{ duration: 1, delay: 0.6 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Connecting lines between cards (desktop only) */}
                                {index < expertiseCategories.length - 1 && (
                                    <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                                        <motion.div 
                                            className="w-12 h-px bg-ph/20"
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            transition={{ duration: 0.7, delay: 0.7 }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Database highlights */}
                <motion.div 
                    className="mt-24 py-10 px-8 rounded-2xl glass-card border border-ph/10 overflow-hidden relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    {/* Background gradient */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-ph/5 to-transparent"></div>
                    
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-display font-light mb-3">Extensive Talent Network</h3>
                                <p className="text-muted-foreground max-w-md">
                                    Our database of pre-screened candidates covers the entire spectrum of wealth management roles, ensuring precise matches for your specific needs.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-8 items-center">
                                <motion.div 
                                    className="text-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <motion.div 
                                        className="text-5xl font-light text-foreground"
                                        initial={{ y: 20 }}
                                        whileInView={{ y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                    >
                                        2,000<span className="text-ph">+</span>
                                    </motion.div>
                                    <div className="mt-1 text-sm text-muted-foreground uppercase tracking-wider">Pre-screened candidates</div>
                                </motion.div>
                                
                                <div className="h-14 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden sm:block"></div>
                                
                                <motion.div 
                                    className="text-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                >
                                    <motion.div 
                                        className="text-5xl font-light text-foreground"
                                        initial={{ y: 20 }}
                                        whileInView={{ y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.8 }}
                                    >
                                        7-14
                                    </motion.div>
                                    <div className="mt-1 text-sm text-muted-foreground uppercase tracking-wider">Days average time-to-hire</div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <motion.a
                        href="/expertise"
                        className="group inline-flex items-center text-ph font-medium hover:text-ph-dark transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="relative">
                            Explore our full expertise
                            <motion.span 
                                className="absolute bottom-0 left-0 w-full h-px bg-ph"
                                initial={{ scaleX: 0, originX: 0 }}
                                whileHover={{ scaleX: 1, originX: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </span>
                        <motion.svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-2 group-hover:ml-3 transition-all duration-300"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </motion.svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Expertise;