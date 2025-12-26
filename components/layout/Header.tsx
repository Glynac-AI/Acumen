// components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const solutions = [
    { name: 'Glynac', href: '/solutions/glynac', description: 'Compliance-first AI workspace' },
    { name: 'Tollbooth', href: '/solutions/tollbooth', description: 'Automated options execution' },
    { name: 'Prairie Hill Holdings', href: '/solutions/phh', description: 'Institutional NNN real estate' },
    { name: 'CWMU', href: '/solutions/cwmu', description: 'Wealth management education' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled
                ? 'bg-white/95 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5'
                : 'bg-transparent'
                }`}
        >
            <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image src={scrolled ? '/logo/logo-dark.png' : '/logo/logo-light.png'}
                        alt="Acumen Strategy"
                        width={160}
                        height={50}
                        className="object-contain" priority />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    <Link
                        href="/"
                        className={`text-sm font-medium transition-colors duration-300 ${scrolled
                            ? 'text-primary/70 hover:text-primary'
                            : 'text-white/80 hover:text-white'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={`text-sm font-medium transition-colors duration-300 ${scrolled
                            ? 'text-primary/70 hover:text-primary'
                            : 'text-white/80 hover:text-white'
                            }`}
                    >
                        About
                    </Link>

                    {/* Solutions Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setSolutionsOpen(true)}
                        onMouseLeave={() => setSolutionsOpen(false)}
                    >
                        <Link
                            href="/solutions"
                            className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${scrolled
                                ? 'text-primary/70 hover:text-primary'
                                : 'text-white/80 hover:text-white'
                                }`}
                        >
                            Solutions
                            <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </Link>

                        <AnimatePresence>
                            {solutionsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-primary/10 overflow-hidden"
                                >
                                    <div className="p-2">
                                        {/* View All Solutions Link */}
                                        <Link
                                            href="/solutions"
                                            className="block p-4 rounded-lg hover:bg-accent/10 transition-colors group border-b border-primary/5"
                                            onClick={() => setSolutionsOpen(false)}
                                        >
                                            <div className="text-sm font-semibold text-accent group-hover:text-accent/80 transition-colors">
                                                View All Solutions
                                            </div>
                                            <div className="text-xs text-primary/50 mt-1">
                                                Complete platform overview
                                            </div>
                                        </Link>

                                        {solutions.map((solution) => (
                                            <Link
                                                key={solution.href}
                                                href={solution.href}
                                                className="block p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                                                onClick={() => setSolutionsOpen(false)}
                                            >
                                                <div className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                                                    {solution.name}
                                                </div>
                                                <div className="text-xs text-primary/50 mt-1">
                                                    {solution.description}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link
                        href="/use-cases"
                        className={`text-sm font-medium transition-colors duration-300 ${scrolled
                            ? 'text-primary/70 hover:text-primary'
                            : 'text-white/80 hover:text-white'
                            }`}
                    >
                        Use Cases
                    </Link>
                    <Link
                        href="/resources"
                        className={`text-sm font-medium transition-colors duration-300 ${scrolled
                            ? 'text-primary/70 hover:text-primary'
                            : 'text-white/80 hover:text-white'
                            }`}
                    >
                        Resources
                    </Link>
                    {/* Blog Link - External */}
                    <a
                        href="https:/acumen-blogs.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-medium transition-colors duration-300 ${scrolled
                            ? 'text-primary/70 hover:text-primary'
                            : 'text-white/80 hover:text-white'
                            }`}
                    >
                        Blog
                    </a>
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:block">
                    <Link
                        href="/contact"
                        className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${scrolled
                            ? 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-xl'
                            : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'
                            }`}
                    >
                        Connect with Relationship Manager
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`lg:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'
                        }`}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-white border-t border-primary/10 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6 space-y-1">
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-3 text-sm font-medium text-primary hover:text-accent transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-3 text-sm font-medium text-primary hover:text-accent transition-colors"
                            >
                                About
                            </Link>

                            {/* Solutions in Mobile */}
                            <div className="py-3">
                                <Link
                                    href="/solutions"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-sm font-medium text-primary hover:text-accent transition-colors mb-2 block"
                                >
                                    Solutions
                                </Link>
                                <div className="pl-4 space-y-2">
                                    {solutions.map((solution) => (
                                        <Link
                                            key={solution.href}
                                            href={solution.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block py-2 text-sm text-primary/70 hover:text-accent transition-colors"
                                        >
                                            {solution.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/use-cases"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-3 text-sm font-medium text-primary hover:text-accent transition-colors"
                            >
                                Use Cases
                            </Link>
                            <Link
                                href="/resources"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-3 text-sm font-medium text-primary hover:text-accent transition-colors"
                            >
                                Resources
                            </Link>
                            <a
                                href="https://blog.acumen-strategy.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-3 text-sm font-medium text-primary hover:text-accent transition-colors"
                            >
                                Blog
                            </a>

                            {/* Mobile CTA */}
                            <div className="pt-4">
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-center py-3 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 transition-colors"
                                >
                                    Connect with Relationship Manager
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}