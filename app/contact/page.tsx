// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StaggerContainer from '@/components/ui/StaggerContainer';
import { Mail, Phone, MapPin, Linkedin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        role: '',
        email: '',
        phone: '',
        firmSize: '',
        interest: '',
        message: '',
        meetingTimes: '',
        consent: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, send to backend
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    return (
        <div className="min-h-screen">
            {/* Hero - Full Screen Height */}
            <Section background="gradient" padding="lg" className="text-white relative overflow-hidden min-h-screen flex items-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-8"
                        >

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                                Contact Us
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                            >
                                Ready to transform your wealth management practice? Schedule a consultation to discuss how Acumen Strategy can help you achieve your goals.
                            </motion.p>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Contact Form & Info */}
            <Section background="muted" padding="lg">
                <Container>
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <AnimatedSection animation="fadeInUp">
                                <h2 className="text-2xl font-bold text-primary mb-8">Get In Touch</h2>
                            </AnimatedSection>

                            <StaggerContainer className="space-y-6">
                                <motion.div variants={fadeInUp}>
                                    <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex items-start gap-4 p-6">
                                            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                                                <Mail className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-primary mb-1">Email</h3>
                                                <a
                                                    href="mailto:info@acumen-strategy.com"
                                                    className="text-primary/70 hover:text-accent transition-colors"
                                                >
                                                    info@acumen-strategy.com
                                                </a>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>

                                {/*<motion.div variants={fadeInUp}>
                                    <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex items-start gap-4 p-6">
                                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                                                <Phone className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-primary mb-1">Phone</h3>
                                                <p className="text-primary/70">+1 (555) 123-4567</p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>*/}

                                <motion.div variants={fadeInUp}>
                                    <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex items-start gap-4 p-6">
                                            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                                                <MapPin className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-primary mb-1">Office</h3>
                                                <p className="text-primary/70">
                                                    272 Market Sq , Lake Forest<br />
                                                    Chicago, IL 60045
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>

                                {/* LinkedIn */}
                                <motion.div variants={fadeInUp}>
                                    <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex items-start gap-4 p-6">
                                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                                                <Linkedin className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-primary mb-1">LinkedIn</h3>
                                                <a
                                                    href="https://www.linkedin.com/company/acumen-strategy"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary/70 hover:text-accent transition-colors duration-300 flex items-center gap-1 group"
                                                >
                                                    Follow us on LinkedIn
                                                    
                                                </a>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                   
                            </StaggerContainer>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <AnimatedSection animation="fadeInUp">
                                <Card className="hover:shadow-xl transition-shadow duration-300">
                                    {isSubmitted ? (
                                        <div className="text-center py-12 space-y-6 p-8">
                                            <div className="flex justify-center">
                                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                                                    <CheckCircle2 className="h-8 w-8 text-accent" />
                                                </div>
                                            </div>
                                            <h2 className="text-2xl font-bold text-primary">Thanks — your request has been received.</h2>
                                            <p className="text-primary/70">
                                                A member of our team will contact you within 24 hours.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-8">
                                            <div className="w-12 h-1 bg-accent rounded-full mb-6"></div>
                                            <h2 className="text-2xl font-bold text-primary mb-6">Request a Demo</h2>
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-primary mb-2">
                                                            Company Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="companyName"
                                                            value={formData.companyName}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/30 transition-colors"
                                                            placeholder="Your Firm Name"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-primary mb-2">
                                                            Contact Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="contactName"
                                                            value={formData.contactName}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/30 transition-colors"
                                                            placeholder="John Doe"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-primary mb-2">
                                                            Role *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="role"
                                                            value={formData.role}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/30 transition-colors"
                                                            placeholder="CEO, CCO, etc."
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-primary mb-2">
                                                            Email *
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/30 transition-colors"
                                                            placeholder="you@company.com"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-primary mb-2">
                                                            Phone *
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/30 transition-colors"
                                                            placeholder="+1 (555) 000-0000"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-primary mb-2">
                                                            Firm Size *
                                                        </label>
                                                        <select
                                                            name="firmSize"
                                                            value={formData.firmSize}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/30 transition-colors"
                                                        >
                                                            <option value="">Select size</option>
                                                            <option value="1-10">1-10 advisors</option>
                                                            <option value="11-50">11-50 advisors</option>
                                                            <option value="51-200">51-200 advisors</option>
                                                            <option value="200+">200+ advisors</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-primary mb-2">
                                                            Area of Interest *
                                                        </label>
                                                        <select
                                                            name="interest"
                                                            value={formData.interest}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/30 transition-colors"
                                                        >
                                                            <option value="">Select area</option>
                                                            <option value="glynac">Glynac (AI Workspace)</option>
                                                            <option value="tollbooth">Tollbooth (Options Automation)</option>
                                                            <option value="phh">Prairie Hill Holdings (Real Estate)</option>
                                                            <option value="aci">Acumen Compliance Institute (Education)</option>
                                                            <option value="platform">Platform Access</option>
                                                            <option value="multiple">Multiple Solutions</option>
                                                            <option value="enterprise">Enterprise Implementation</option>
                                                        </select>
                                                    </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-primary mb-2">
                                                        Message *
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        required
                                                        rows={5}
                                                        className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/30 transition-colors resize-none"
                                                        placeholder="Tell us about your needs and challenges..."
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-primary mb-2">
                                                        Preferred Meeting Times (Optional)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="meetingTimes"
                                                        value={formData.meetingTimes}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/30 transition-colors"
                                                        placeholder="e.g., Weekday afternoons EST"
                                                    />
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        name="consent"
                                                        checked={formData.consent}
                                                        onChange={handleChange}
                                                        required
                                                        className="mt-1 w-4 h-4 text-accent border-primary/20 rounded focus:ring-2 focus:ring-accent"
                                                    />
                                                    <label className="text-sm text-primary/70">
                                                        I agree to the privacy policy and consent to being contacted by Acumen Strategy *
                                                    </label>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full px-8 py-4 bg-accent text-white rounded-md font-medium hover:bg-accent/90 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                                                >
                                                    Submit Request
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </Card>
                            </AnimatedSection>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
