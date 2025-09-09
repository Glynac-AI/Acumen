import React from "react";
import { motion } from "framer-motion";

const Philosophy = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/3 left-0 w-72 h-72 bg-ph/5 rounded-full blur-3xl -z-10 opacity-40"></div>
            <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-ph/5 rounded-full blur-3xl -z-10 opacity-40"></div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left content column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block py-1 px-3 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6">
                            Our Philosophy
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-light tracking-wide text-foreground mb-8">
                            The intersection of human insight and technological efficiency
                        </h2>

                        <div className="space-y-6 text-muted-foreground">
                            <p className="text-lg leading-relaxed">
                                We founded Acumen Recruiting with a singular vision: to transform how wealth management firms discover talent. Traditional recruiting often relies on either impersonal technology or time-intensive human processes, creating a choice between efficiency and quality.
                            </p>

                            <p className="text-lg leading-relaxed">
                                We've created a different path. By thoughtfully integrating curated human expertise with elegant technology, we deliver a recruitment experience that's both more refined and more effective.
                            </p>

                            <p className="text-lg leading-relaxed">
                                Our approach centers on deep understanding—of each role's nuances, each firm's culture, and each candidate's unique capabilities. This understanding informs every aspect of our process, from how we structure our candidate database to how we design our client interactions.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right visual column */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Main visual element */}
                            <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
                                <div className="bg-gradient-to-br from-ph/20 to-transparent p-8">
                                    <div className="relative z-10">
                                        {/* Core principles representation */}
                                        <div className="flex flex-col gap-8">
                                            <PrincipleItem
                                                number="01"
                                                title="Specialization"
                                                description="We focus exclusively on wealth management, ensuring deep industry knowledge"
                                            />

                                            <PrincipleItem
                                                number="02"
                                                title="Precision"
                                                description="Our rigorous vetting process ensures only the most qualified candidates"
                                            />

                                            <PrincipleItem
                                                number="03"
                                                title="Innovation"
                                                description="Our technology platform creates an efficient, transparent experience"
                                            />

                                            <PrincipleItem
                                                number="04"
                                                title="Partnership"
                                                description="We act as true partners in your firm's growth and success"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-ph/10 rounded-full blur-3xl -z-10"></div>
                            <div className="absolute -left-8 -top-8 w-24 h-24 bg-ph/15 rounded-full blur-xl -z-10"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Helper component for principles
const PrincipleItem = ({ number, title, description }) => {
    return (
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-ph/10 flex items-center justify-center shrink-0 text-ph font-light text-xl">
                {number}
            </div>
            <div>
                <h4 className="text-lg font-medium text-foreground mb-1">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};

export default Philosophy;