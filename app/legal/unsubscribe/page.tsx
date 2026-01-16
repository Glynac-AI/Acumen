'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Link from 'next/link';
import { CheckCircle2, Mail } from 'lucide-react';

export default function UnsubscribePage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [preferences, setPreferences] = useState({
        marketing: true,
        productUpdates: true,
        newsletters: true,
        unsubscribeAll: false,
    });

    const handlePreferenceChange = (key: keyof typeof preferences) => {
        if (key === 'unsubscribeAll') {
            const newValue = !preferences.unsubscribeAll;
            setPreferences({
                marketing: !newValue,
                productUpdates: !newValue,
                newsletters: !newValue,
                unsubscribeAll: newValue,
            });
        } else {
            setPreferences(prev => ({
                ...prev,
                [key]: !prev[key],
                unsubscribeAll: false,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, send to backend
        console.log('Email preferences updated:', { email, preferences });
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <Section background="gradient" padding="lg" className="text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Email Preferences</h1>
                        <p className="text-white/80 text-lg">Manage your communication settings</p>
                    </motion.div>
                </Container>
            </Section>

            {/* Content */}
            <Section background="white" padding="lg">
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {isSubmitted ? (
                            <div className="text-center py-16 space-y-6">
                                <div className="flex justify-center">
                                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="h-10 w-10 text-accent" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-primary">Preferences Updated</h2>
                                <p className="text-primary/70 max-w-md mx-auto">
                                    Your email preferences have been saved. Please allow up to 48 hours for changes to take effect across all our systems.
                                </p>
                                <div className="pt-4">
                                    <Link
                                        href="/"
                                        className="inline-block px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-all duration-300"
                                    >
                                        Return to Homepage
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-xl mx-auto">
                                <div className="mb-8">
                                    <p className="text-primary/80 leading-relaxed">
                                        We respect your communication preferences. Use the form below to customize which types of emails you receive from Acumen Strategy, or unsubscribe from all marketing communications.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Email Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-primary/40" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full pl-12 pr-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/30 transition-colors"
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                    </div>

                                    {/* Preference Options */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-primary">Email Types</h3>

                                        <div className="space-y-3">
                                            <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.marketing}
                                                    onChange={() => handlePreferenceChange('marketing')}
                                                    className="mt-0.5 w-5 h-5 text-accent border-primary/20 rounded focus:ring-2 focus:ring-accent"
                                                />
                                                <div>
                                                    <span className="font-medium text-primary">Marketing Communications</span>
                                                    <p className="text-sm text-primary/60 mt-1">
                                                        Promotional offers, special announcements, and event invitations
                                                    </p>
                                                </div>
                                            </label>

                                            <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.productUpdates}
                                                    onChange={() => handlePreferenceChange('productUpdates')}
                                                    className="mt-0.5 w-5 h-5 text-accent border-primary/20 rounded focus:ring-2 focus:ring-accent"
                                                />
                                                <div>
                                                    <span className="font-medium text-primary">Product Updates</span>
                                                    <p className="text-sm text-primary/60 mt-1">
                                                        New features, improvements, and platform enhancements
                                                    </p>
                                                </div>
                                            </label>

                                            <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.newsletters}
                                                    onChange={() => handlePreferenceChange('newsletters')}
                                                    className="mt-0.5 w-5 h-5 text-accent border-primary/20 rounded focus:ring-2 focus:ring-accent"
                                                />
                                                <div>
                                                    <span className="font-medium text-primary">Industry Insights</span>
                                                    <p className="text-sm text-primary/60 mt-1">
                                                        Thought leadership, compliance updates, and wealth management trends
                                                    </p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="pt-4 border-t border-primary/10">
                                            <label className="flex items-start gap-4 p-4 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.unsubscribeAll}
                                                    onChange={() => handlePreferenceChange('unsubscribeAll')}
                                                    className="mt-0.5 w-5 h-5 text-red-500 border-red-300 rounded focus:ring-2 focus:ring-red-500"
                                                />
                                                <div>
                                                    <span className="font-medium text-red-700">Unsubscribe from All</span>
                                                    <p className="text-sm text-red-600/70 mt-1">
                                                        Stop receiving all marketing emails. You will still receive transactional emails related to your account.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-8 py-4 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Update Preferences
                                    </button>
                                </form>

                                <div className="mt-8 pt-8 border-t border-primary/10">
                                    <p className="text-sm text-primary/60 text-center">
                                        Questions about your data? Read our{' '}
                                        <Link href="/legal/privacy" className="text-accent hover:underline">
                                            Privacy Policy
                                        </Link>{' '}
                                        or contact us at{' '}
                                        <a href="mailto:info@acumen-strategy.com" className="text-accent hover:underline">
                                            info@acumen-strategy.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </Container>
            </Section>
        </div>
    );
}
