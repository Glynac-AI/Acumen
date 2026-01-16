'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            // Small delay before showing banner for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
                setTimeout(() => setIsAnimating(true), 50);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsAnimating(false);
        setTimeout(() => setIsVisible(false), 300);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsAnimating(false);
        setTimeout(() => setIsVisible(false), 300);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-300 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
        >
            <div className="max-w-4xl mx-auto bg-primary rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                                We Value Your Privacy
                            </h3>
                            <p className="text-white/70 text-sm leading-relaxed">
                                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                                By clicking &quot;Accept,&quot; you consent to our use of cookies as described in our{' '}
                                <Link href="/legal/privacy" className="text-accent hover:underline">
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <button
                                onClick={handleDecline}
                                className="px-6 py-2.5 text-sm font-medium text-white/80 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2.5 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                Accept All Cookies
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
