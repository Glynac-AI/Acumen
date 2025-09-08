// src/components/home/TestimonialsSection.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        quote: "Acumen Recruiting has transformed our hiring process. Their pre-screened candidates were all high-quality, and the video interviews saved us countless hours of initial screening.",
        author: "Sarah Johnson",
        title: "Director of Talent Acquisition, Regional Wealth Management Firm",
        rating: 5
    },
    {
        quote: "The Talent DeepDive™ interviews gave us incredible insight into candidates before we ever spoke with them. We hired our new Senior Wealth Manager within 10 days of starting the process.",
        author: "Michael Chen",
        title: "Managing Partner, Pacific Financial Group",
        rating: 5
    },
    {
        quote: "Their database of pre-screened candidates is impressive, but what really sets Acumen apart is their understanding of wealth management roles and the specific skills needed.",
        author: "Jennifer Taylor",
        title: "COO, Taylor Financial Solutions",
        rating: 5
    },
    {
        quote: "As a boutique firm, we struggled to compete for talent with the big players. Acumen gave us access to high-quality candidates we wouldn't have found otherwise.",
        author: "David Wilson",
        title: "Founder, Cornerstone Wealth Advisors",
        rating: 5
    }
];

const TestimonialsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsPaused(true);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsPaused(true);
    };

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6">
                        Client Success Stories
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                        What Our Clients Say
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Hear from wealth management firms who have transformed their hiring process with Acumen Recruiting.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Background elements */}
                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-ph/5 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-ph/5 rounded-full blur-xl"></div>

                    {/* Quote marks */}
                    <Quote className="absolute -top-10 left-0 w-20 h-20 text-ph/10" />
                    <Quote className="absolute -bottom-10 right-0 w-20 h-20 text-ph/10 transform rotate-180" />

                    {/* Testimonial carousel */}
                    <div
                        className="relative bg-white rounded-xl shadow-md p-8 md:p-12"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="overflow-hidden">
                            <div className="relative min-h-[300px] flex items-center justify-center">
                                {testimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        className="absolute inset-0 flex flex-col justify-center"
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{
                                            opacity: activeIndex === index ? 1 : 0,
                                            x: activeIndex === index ? 0 : 100,
                                            zIndex: activeIndex === index ? 10 : 0
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="flex justify-center mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>

                                        <blockquote className="text-xl md:text-2xl text-center font-medium mb-8 italic">
                                            "{testimonial.quote}"
                                        </blockquote>

                                        <div className="text-center">
                                            <div className="font-semibold text-lg">{testimonial.author}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between pointer-events-none">
                            <button
                                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:text-ph transition-colors pointer-events-auto"
                                onClick={handlePrev}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:text-ph transition-colors pointer-events-auto"
                                onClick={handleNext}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Pagination dots */}
                        <div className="flex justify-center mt-8 gap-3">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-colors ${activeIndex === index ? 'bg-ph' : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setIsPaused(true);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <h3 className="text-2xl font-semibold mb-4">Join Our Satisfied Clients</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Experience the Acumen difference for yourself. Our recruiting specialists are ready to help you find the perfect candidates for your wealth management firm.
                    </p>
                    <motion.a
                        href="/case-studies"
                        className="button-secondary inline-flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        View Client Case Studies
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;