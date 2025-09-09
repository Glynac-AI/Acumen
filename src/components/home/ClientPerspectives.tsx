import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const ClientPerspectives = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Testimonial data
    const testimonials = [
        {
            quote: "Acumen Recruiting has transformed our hiring process. Their pre-screened candidates were all high-quality, and the video interviews saved us countless hours of initial screening.",
            author: "Sarah Johnson",
            title: "Director of Talent Acquisition, Regional Wealth Management Firm",
            rating: 5,
            highlight: "...transformed our hiring process."
        },
        {
            quote: "The Talent DeepDive™ interviews gave us incredible insight into candidates before we ever spoke with them. We hired our new Senior Wealth Manager within 10 days of starting the process.",
            author: "Michael Chen",
            title: "Managing Partner, Pacific Financial Group",
            rating: 5,
            highlight: "...hired our new Senior Wealth Manager within 10 days."
        },
        {
            quote: "Their database of pre-screened candidates is impressive, but what really sets Acumen apart is their understanding of wealth management roles and the specific skills needed.",
            author: "Jennifer Taylor",
            title: "COO, Taylor Financial Solutions",
            rating: 5,
            highlight: "...what really sets Acumen apart is their understanding of wealth management roles."
        },
        {
            quote: "As a boutique firm, we struggled to compete for talent with the big players. Acumen gave us access to high-quality candidates we wouldn't have found otherwise.",
            author: "David Wilson",
            title: "Founder, Cornerstone Wealth Advisors",
            rating: 5,
            highlight: "...access to high-quality candidates we wouldn't have found otherwise."
        }
    ];

    // Auto-advance carousel
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000); // Longer duration for a more elegant pace

        return () => clearInterval(interval);
    }, [isPaused, testimonials.length]);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsPaused(true);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsPaused(true);
    };

    return (
        <section className="py-28 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-40 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(79,107,255,0.03),transparent_70%)]"></div>
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-ph/3 rounded-full blur-3xl -z-10 opacity-30"></div>
            <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-ph/3 rounded-full blur-3xl -z-10 opacity-30"></div>

            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6">
                        Client Success Stories
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-light tracking-wide text-foreground mb-6">
                        Client Perspectives
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Hear from wealth management firms who have transformed their hiring process with Acumen Recruiting
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Large quote marks */}
                    <Quote className="absolute -top-10 left-0 w-20 h-20 text-ph/10 transform -scale-x-100" />
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
                                        transition={{ duration: 0.7, ease: "easeInOut" }}
                                    >
                                        {/* Rating stars */}
                                        <div className="flex justify-center mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>

                                        {/* Quote text with highlighted portion */}
                                        <blockquote className="text-xl md:text-2xl text-center mb-8 font-light leading-relaxed">
                                            <span className="relative">
                                                {testimonial.quote.split(testimonial.highlight)[0]}
                                                <span className="font-medium text-ph">
                                                    {testimonial.highlight}
                                                </span>
                                                {testimonial.quote.split(testimonial.highlight)[1]}
                                            </span>
                                        </blockquote>

                                        {/* Author information */}
                                        <div className="text-center">
                                            <div className="font-semibold text-lg">{testimonial.author}</div>
                                            <div className="text-sm text-muted-foreground mt-1">{testimonial.title}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between pointer-events-none px-2 md:px-4">
                            <button
                                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:text-ph transition-colors pointer-events-auto"
                                onClick={handlePrev}
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:text-ph transition-colors pointer-events-auto"
                                onClick={handleNext}
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Pagination dots */}
                        <div className="flex justify-center mt-8 gap-3">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors ${activeIndex === index ? 'bg-ph' : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setIsPaused(true);
                                    }}
                                    aria-label={`Go to testimonial ${index + 1}`}
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
                    <h3 className="text-2xl font-light text-foreground mb-4">Join Our Satisfied Clients</h3>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Experience the Acumen difference for yourself. Our recruiting specialists are ready to help you find the perfect candidates for your wealth management firm.
                    </p>
                    <motion.a
                        href="/case-studies"
                        className="button-secondary inline-flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        View Client Case Studies
                        <ChevronRight className="w-4 h-4" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default ClientPerspectives;