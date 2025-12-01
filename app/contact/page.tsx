'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { Mail, Phone, MapPin, Linkedin, CheckCircle2 } from 'lucide-react';

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
            {/* Hero */}
            <Section background="gradient" padding="lg" className="text-white">
                <Container maxWidth="lg">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl leading-relaxed">
                        Ready to transform your wealth management practice? Schedule a consultation to discuss how Acumen Strategy can help you achieve your goals.
                    </p>
                </Container>
            </Section>

            <Section background="muted" padding="lg">
                <Container>
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <Card className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-6 w-6 text-accent" />
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

                            <Card className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-1">Phone</h3>
                                        <p className="text-primary/70">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-6 w-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-1">Office</h3>
                                        <p className="text-primary/70">
                                            123 Financial District<br />
                                            New York, NY 10004
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                {isSubmitted ? (
                                    <div className="text-center py-12 space-y-6">
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
                                    <>
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
                                                        className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
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
                                                        className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
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
                                                        className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
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
                                                        className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
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
                                                        className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
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
                                                        className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
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
                                                    className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                                >
                                                    <option value="">Select area</option>
                                                    <option value="consulting">Consulting</option>
                                                    <option value="glynac">Glynac</option>
                                                    <option value="tollbooth">Tollbooth</option>
                                                    <option value="phh">Prairie Hill Holdings</option>
                                                    <option value="labs">Acumen Labs</option>
                                                    <option value="ats">Acumen Talent Solutions</option>
                                                    <option value="multiple">Multiple Solutions</option>
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
                                                    className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-none"
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
                                                    className="w-full px-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
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
                                                className="w-full px-8 py-4 bg-accent text-white rounded-md font-medium hover:bg-accent/90 transition-colors"
                                            >
                                                Submit Request
                                            </button>
                                        </form>
                                    </>
                                )}
                            </Card>
                        </div>
                    </div>
                </Container >
            </Section >
        </div >
    );
}