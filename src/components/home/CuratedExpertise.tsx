import React from "react";
import { motion, Variants } from "framer-motion";

const CuratedExpertise = () => {
    // Animation variants with proper TypeScript types
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" as const }
        }
    };

    // Expertise categories
    const expertiseCategories = [
        {
            title: "Wealth Management",
            roles: ["Portfolio Managers", "Financial Advisors", "Investment Strategists"],
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
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-ph">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-ph-light/5">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-ph/5 rounded-full blur-3xl -z-10 opacity-50"></div>
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-ph/5 rounded-full blur-3xl -z-10 opacity-50"></div>

            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6">
                        Our Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-light tracking-wide text-foreground mb-6">
                        Curated Talent for Wealth Management
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        We specialize exclusively in wealth management talent, bringing precision and insight to every search.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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
                            <div className="glass-card rounded-xl p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                                <div className="text-center mb-6">
                                    {category.icon}
                                    <h3 className="text-lg uppercase tracking-wider font-medium text-foreground mb-4">
                                        {category.title}
                                    </h3>
                                </div>

                                <ul className="space-y-4 flex-grow">
                                    {category.roles.map((role, roleIndex) => (
                                        <li
                                            key={roleIndex}
                                            className="flex items-center"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-ph/70 mr-3"></div>
                                            <span className="text-muted-foreground">{role}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Decorative line connecting to next category */}
                                {index < expertiseCategories.length - 1 && (
                                    <div className="hidden lg:block absolute -right-5 top-1/2 w-10 h-px bg-ph/20"></div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Our database of 2,000+ pre-screened candidates covers the entire spectrum of wealth management roles, ensuring precise matches for your specific needs.
                    </p>
                    <motion.a
                        href="/expertise"
                        className="inline-flex items-center text-ph font-medium hover:text-ph-dark transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        Explore our full expertise
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-2"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default CuratedExpertise;