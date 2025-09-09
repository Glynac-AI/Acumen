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

const AcumenExperience = () => {
    const [activeStep, setActiveStep] = useState(0);

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
            transition: { duration: 0.5, ease: "easeOut" as const }
        }
    };

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-ph/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-ph/5 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 bg-ph/10 text-ph font-medium rounded-full text-sm mb-6">
                        Our Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-light tracking-wide text-foreground mb-6">
                        The Acumen Experience
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        A thoughtfully designed journey from consultation to placement
                    </p>
                </motion.div>

                {/* Mobile Timeline */}
                <div className="lg:hidden mb-12">
                    <motion.div
                        className="flex overflow-x-auto gap-4 pb-6 snap-x scrollbar-hide"
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
                                            <span className="text-ph mr-2">{step.number}</span>{step.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Desktop Timeline */}
                <div className="hidden lg:block relative">
                    {/* Center line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-200 -translate-x-1/2 z-0"></div>

                    <motion.div
                        className="relative z-10 space-y-20"
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
                                                className={`p-8 rounded-xl shadow-sm bg-white cursor-pointer ${activeStep === index ? 'border-2 border-ph/20' : ''
                                                    }`}
                                                onClick={() => setActiveStep(index)}
                                            >
                                                <div className="flex items-center gap-4 mb-4 justify-start">
                                                    <div className={`w-14 h-14 rounded-full bg-ph/10 text-ph flex items-center justify-center shrink-0 ${isLeft ? 'order-1 ml-4' : 'order-0 mr-4'}`}>
                                                        {step.icon}
                                                    </div>
                                                    <h3 className="text-xl font-semibold">
                                                        <span className="text-ph mr-2">{step.number}</span>{step.title}
                                                    </h3>
                                                </div>

                                                <p className={`text-muted-foreground mb-4 ${isLeft ? 'text-right' : 'text-left'}`}>
                                                    {step.description}
                                                </p>

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

                                        {/* Center point */}
                                        <div
                                            className={`absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white shadow-md z-20 flex items-center justify-center ${activeStep === index ? 'border-2 border-ph text-ph' : 'border border-gray-200'
                                                }`}
                                            onClick={() => setActiveStep(index)}
                                        >
                                            {activeStep === index ? <Check className="w-5 h-5" /> : step.number}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <h3 className="text-2xl font-semibold mb-4">Experience the Difference</h3>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Our refined process combines technological efficiency with human insight to deliver exceptional candidates—precisely matched to your requirements.
                    </p>
                    <motion.a
                        href="/contact"
                        className="button-primary inline-flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Schedule a Consultation
                        <PhoneCall className="w-4 h-4" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default AcumenExperience;