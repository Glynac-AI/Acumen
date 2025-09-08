// src/components/home/TeamExpertise.tsx
import React from "react";
import { motion } from "framer-motion";
import {
    Award,
    Briefcase,
    Users,
    Lightbulb,
    Linkedin
} from "lucide-react";

const TeamExpertise = () => {
    const teamMembers = [
        {
            name: "Alisa Kolodizner",
            title: "Founder & CEO",
            image: "/img/alisa-kolodizner.png",
            description: "15+ years experience in wealth management recruiting",
            linkedin: "#"
        },
        {
            name: "Bavu Vilane",
            title: "Chief Strategy Officer",
            image: "/img/bavu-vilane.png",
            description: "Former head of talent at a major financial institution",
            linkedin: "#"
        }
    ];

    const expertiseAreas = [
        {
            icon: <Briefcase className="w-6 h-6" />,
            title: "Industry Knowledge",
            description: "Our team comes directly from the wealth management industry, ensuring we understand the nuances of the roles we're filling."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Talent Assessment",
            description: "We've developed proprietary screening methodologies specific to wealth management roles and competencies."
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Proven Track Record",
            description: "With hundreds of successful placements, we've refined our approach to consistently deliver exceptional candidates."
        },
        {
            icon: <Lightbulb className="w-6 h-6" />,
            title: "Innovative Approach",
            description: "Our technology-enhanced process combines human expertise with digital efficiency for superior results."
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
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
                        Meet Our Team
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                        Recruiting Experts with Industry Experience
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Our team brings decades of wealth management experience to the recruiting process, ensuring we understand exactly what makes a successful candidate.
                    </p>
                </motion.div>

                {/* Team Members */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="aspect-[3/2] relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-ph/30 to-transparent opacity-70"></div>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                <p className="text-ph font-medium mb-3">{member.title}</p>
                                <p className="text-muted-foreground mb-4">{member.description}</p>
                                <a
                                    href={member.linkedin}
                                    className="inline-flex items-center text-sm font-medium text-ph hover:text-ph/80 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin className="w-4 h-4 mr-2" />
                                    Connect on LinkedIn
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Expertise Areas */}
                <div className="max-w-5xl mx-auto">
                    <motion.h3
                        className="text-2xl font-semibold text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Areas of Expertise
                    </motion.h3>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {expertiseAreas.map((area, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm flex gap-4"
                                variants={itemVariants}
                            >
                                <div className="w-12 h-12 rounded-lg bg-ph/10 text-ph flex items-center justify-center shrink-0">
                                    {area.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">{area.title}</h4>
                                    <p className="text-muted-foreground">{area.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-20 h-20 rounded-full bg-ph/10 text-ph flex items-center justify-center shrink-0">
                            <Award className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Our Commitment to Excellence</h3>
                            <p className="text-muted-foreground mb-4">
                                At Acumen Recruiting, we're committed to excellence in every aspect of the recruiting process. Our team's deep industry knowledge, combined with our innovative approach, ensures we deliver exceptional candidates who not only have the right skills but also align with your firm's culture and values.
                            </p>
                            <motion.a
                                href="/about"
                                className="text-ph font-medium hover:text-ph/80 transition-colors"
                                whileHover={{ x: 5 }}
                            >
                                Learn more about our team and approach →
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TeamExpertise;