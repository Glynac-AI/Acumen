import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold tracking-tight">ACUMEN STRATEGY</h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                            Strategy. Compliance. Execution.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-accent transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wide">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-white/70 hover:text-accent transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions" className="text-sm text-white/70 hover:text-accent transition-colors">
                                    Solutions
                                </Link>
                            </li>
                            <li>
                                <Link href="/use-cases" className="text-sm text-white/70 hover:text-accent transition-colors">
                                    Use Cases
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-sm text-white/70 hover:text-accent transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wide">Solutions</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/solutions/consulting" className="text-sm text-white/70 hover:text-accent transition-colors">
                                    Consulting
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/glynac" className="text-sm text-white/70 hover:text-accent transition-colors">
                                    Glynac
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/tollbooth" className="text-sm text-white/70 hover:text-accent transition-colors">
                                    Tollbooth
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/phh" className="text-sm text-white/70 hover:text-accent transition-colors">
                                    Prairie Hill Holdings
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/labs" className="text-sm text-white/70 hover:text-accent transition-colors">
                                    Acumen Labs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wide">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/70" />
                                <a
                                    href="mailto:info@acumen-strategy.com"
                                    className="text-sm text-white/70 hover:text-accent transition-colors"
                                >
                                    info@acumen-strategy.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/70" />
                                <span className="text-sm text-white/70">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/70" />
                                <span className="text-sm text-white/70">
                                    123 Financial District<br />
                                    New York, NY 10004
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-white/50">
                            © {currentYear} Acumen Strategy. All rights reserved.
                        </p>
                        <div className="flex gap-8">
                            <Link href="/legal/privacy" className="text-sm text-white/50 hover:text-accent transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/legal/terms" className="text-sm text-white/50 hover:text-accent transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </footer >
    );
}