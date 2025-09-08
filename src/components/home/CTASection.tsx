// src/components/home/CTASection.tsx
import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, ArrowRight, CheckCircle } from "lucide-react";

const CTASection = () => {
    const benefits = [
        "Access to 2,000+ pre-screened candidates",
        "Technology-enhanced selection process",
        "Industry-specific expertise",
        "Faster time-to-hire"
    ];

    return (
        <section className="py-24 bg-ph text-white relative overflow-hidden">
            {/* Abstract background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-white opacity-5 rounded-bl-[100px]"></div>
                <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-white opacity-5 rounded-tr-[200px]"></div>

                {/* Abstract circles */}
                <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full border border-white/10"></div>
                <div className="absolute bottom-[30%] right-[15%] w-24 h-24 rounded-full border border-white/10"></div>
                <div className="absolute top-[60%] left-[30%] w-16 h-16 rounded-full border border-white/10"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Ready to Transform Your Hiring Process?
                        </h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto">
                            Schedule a screening call today to discuss your needs and discover how our unique approach can help you find the perfect candidates.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div>
                            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/10">
                                <h3 className="text-2xl font-semibold mb-6">Schedule Your Screening Call</h3>

                                <form className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-white/90">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 rounded-md border-0 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                            placeholder="John Smith"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-white/90">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 rounded-md border-0 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-1.5 text-white/90">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full px-4 py-3 rounded-md border-0 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                            placeholder="(123) 456-7890"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium mb-1.5 text-white/90">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            className="w-full px-4 py-3 rounded-md border-0 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                            placeholder="Your Wealth Management Firm"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="w-full py-4 bg-white text-ph font-medium rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Schedule Your Call
                                        <PhoneCall className="w-4 h-4" />
                                    </motion.button>
                                </form>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-semibold mb-6">Why Choose Acumen Recruiting?</h3>

                            <ul className="space-y-5 mb-8">
                                {benefits.map((benefit, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                                    >
                                        <CheckCircle className="w-6 h-6 text-white shrink-0" />
                                        <span className="text-lg">{benefit}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.a
                                href="/services"
                                className="inline-flex items-center text-white font-medium hover:text-white/80 transition-colors group"
                                whileHover={{ x: 5 }}
                            >
                                Learn more about our services
                                <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />
                            </motion.a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <p className="text-white/80">
                            Not ready to schedule a call? Explore our <a href="/services" className="underline hover:text-white transition-colors">services</a> or learn more <a href="/about" className="underline hover:text-white transition-colors">about us</a>.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;