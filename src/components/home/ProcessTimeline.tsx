// src/components/home/ProcessTimeline.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    PhoneCall,
    CreditCard,
    Video,
    MessageSquare,
    RefreshCw,
    Check
} from "lucide-react";

const ProcessTimeline = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            icon: <PhoneCall className="w-6 h-6" />,
            title: "Screening Call",
            description: "We start with a call to understand your hiring needs. If we believe we can help, we proceed.",
            detail: "During this initial 20-minute call, we'll discuss your specific role requirements, team culture, and ideal candidate profile. This helps us tailor our search process to your exact needs."
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            title: "Plan Purchase & Kickoff",
            description: "Once a plan is purchased, recruiting begins within 1 week. Your account manager works with you to identify the right questions.",
            detail: "Choose from our Talent Snapshot™, Talent DeepDive™, or Complete Talent Pack™ options. We'll customize screening questions based on your requirements and our wealth management expertise."
        },
        {
            icon: <Video className="w-6 h-6" />,
            title: "Candidate Video Delivery",
            description: "Candidates complete their videos and upload resumes. You receive email notifications each time a new video is available.",
            detail: "Review candidate introductions on your schedule through our secure client portal. Each candidate answers your custom questions, allowing you to quickly assess fit before investing more time."
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Feedback Loop",
            description: "After the first 3 candidate videos, you have a review call with the recruiter and account manager.",
            detail: "We'll gather your feedback on initial candidates and refine our search criteria if needed. This ensures we're precisely targeting the right talent profile for your role."
        },
        {
            icon: <RefreshCw className="w-6 h-6" />,
            title: "Ongoing Recruiting",
            description: "Recruiting continues until your plan is fulfilled. You receive continuous candidate flow.",
            detail: "Track all recruiting activity in real-time through our client portal. As you identify promising candidates, we can facilitate interviews and provide additional insights from our screening process."
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6">
                        Our Recruitment Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                        A Streamlined Approach to Finding Top Talent
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Our technology-enhanced process is designed to deliver qualified candidates quickly while giving you complete control and visibility.
                    </p>
                </motion.div>

                {/* Process Timeline (Mobile) */}
                <div className="lg:hidden mb-12">
                    <motion.div
                        className="flex overflow-x-auto gap-4 pb-4 snap-x"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className={`flex-shrink-0 w-[280px] snap-center p-6 rounded-xl shadow-sm ${activeStep === index ? 'bg-white border-2 border-ph/20' : 'bg-white'
                                    }`}
                                variants={itemVariants}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-ph/10 text-ph flex items-center justify-center shrink-0">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            <span className="text-ph mr-2">{index + 1}.</span>{step.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Process Timeline (Desktop) */}
                <div className="hidden lg:block relative">
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-200 -translate-x-1/2 z-0"></div>

                    <motion.div
                        className="relative z-10 space-y-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {steps.map((step, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    className="relative"
                                    variants={itemVariants}
                                >
                                    <div className={`flex items-center ${isLeft ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`w-full md:w-5/12 ${isLeft ? 'text-right md:pr-16' : 'md:pl-16'}`}
                                        >
                                            <div
                                                className={`p-6 rounded-xl shadow-sm bg-white cursor-pointer ${activeStep === index ? 'border-2 border-ph/20' : ''
                                                    }`}
                                                onClick={() => setActiveStep(index)}
                                            >
                                                <h3 className="text-xl font-semibold mb-3">
                                                    <span className="text-ph mr-2">{index + 1}.</span>{step.title}
                                                </h3>
                                                <p className="text-muted-foreground mb-4">{step.description}</p>

                                                {activeStep === index && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        className="text-sm text-muted-foreground border-t border-gray-100 pt-4"
                                                    >
                                                        {step.detail}
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            className={`absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md z-20 flex items-center justify-center ${activeStep === index ? 'border-2 border-ph text-ph' : 'border border-gray-200'
                                                }`}
                                            onClick={() => setActiveStep(index)}
                                        >
                                            {activeStep === index ? <Check className="w-5 h-5" /> : (index + 1)}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <h3 className="text-2xl font-semibold mb-4">Ready to Experience Our Process?</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Schedule a screening call to discuss your hiring needs and learn how our unique approach can help you find the perfect candidates.
                    </p>
                    <motion.a
                        href="/contact"
                        className="button-primary inline-flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Schedule a Screening Call
                        <PhoneCall className="w-4 h-4" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default ProcessTimeline;