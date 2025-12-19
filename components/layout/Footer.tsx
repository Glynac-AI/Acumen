// components/layout/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white relative overflow-hidden">
            {/* Subtle top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent"></div>

            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info with Logo */}
                    <div className="space-y-2 -mt-4">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo/logo-light.png"
                                alt="Acumen Strategy"
                                width={240}
                                height={84}
                                className="object-contain mb-1"
                            />
                        </Link>

                        <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                            Software, products, and services for wealth management firms.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a
                                href="https://www.linkedin.com/company/acumen-strategy/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-accent transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wide text-accent">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors duration-300">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions" className="text-sm text-white/70 hover:text-white transition-colors duration-300">
                                    Solutions
                                </Link>
                            </li>
                            <li>
                                <Link href="/use-cases" className="text-sm text-white/70 hover:text-white transition-colors duration-300">
                                    Use Cases
                                </Link>
                            </li>
                            <li>
                                <a 
                                    href="https://blog.acumen-strategy.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-white/70 hover:text-white transition-colors duration-300"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wide text-accent">Solutions</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/solutions/glynac" className="text-sm text-white/70 hover:text-white transition-colors duration-300">
                                    Glynac
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/tollbooth" className="text-sm text-white/70 hover:text-white transition-colors duration-300">
                                    Tollbooth
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/phh" className="text-sm text-white/70 hover:text-white transition-colors duration-300">
                                    Prairie Hill Holdings
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/wmci" className="text-sm text-white/70 hover:text-white transition-colors duration-300">
                                    WMCI
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact - ADDRESS PENDING CONFIRMATION WITH FRIENDY */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wide text-accent">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white/60" />
                                <a
                                    href="mailto:info@acumen-strategy.com"
                                    className="text-sm text-white/70 hover:text-accent transition-colors duration-300"
                                >
                                    info@acumen-strategy.com
                                </a>
                            </li>
                            
                            {/* <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-white/60" />
                                <span className="text-sm text-white/70">[PHONE TO BE CONFIRMED]</span>
                            </li> */}
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/60" />
                                <span className="text-sm text-white/70">
                                    272 Market Sq<br />
                                    Lake Forest, IL 60045
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
                            <Link href="/legal/privacy" className="text-sm text-white/50 hover:text-accent transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link href="/legal/terms" className="text-sm text-white/50 hover:text-accent transition-colors duration-300">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}