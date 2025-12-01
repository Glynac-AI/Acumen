'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const solutions = [
    { name: 'Consulting', href: '/solutions/consulting', description: 'Strategic advisory & execution' },
    { name: 'Glynac', href: '/solutions/glynac', description: 'Compliance-first AI workspace' },
    { name: 'Tollbooth', href: '/solutions/tollbooth', description: 'Automated options execution' },
    { name: 'Prairie Hill Holdings', href: '/solutions/phh', description: 'Institutional NNN real estate' },
    { name: 'Acumen Labs', href: '/solutions/labs', description: 'Marketing & brand implementation' },
    { name: 'Acumen Talent Solutions', href: '/solutions/ats', description: 'Recruiting & executive search' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-primary/5">
            <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group">
                    <span className="text-2xl font-bold tracking-tight text-primary transition-colors group-hover:text-accent">
                        ACUMEN STRATEGY
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-primary/70 hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-primary/70 hover:text-primary transition-colors">
                        About
                    </Link>

                    {/* Solutions Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setSolutionsOpen(true)}
                        onMouseLeave={() => setSolutionsOpen(false)}
                    >
                        <Link
                            href="/solutions"
                            className="flex items-center gap-1 text-sm font-medium text-primary/70 hover:text-primary transition-colors"
                        >
                            Solutions
                            <ChevronDown className="w-4 h-4" />
                        </Link>

                        {/* Dropdown Menu */}
                        <div
                            className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-primary/10 overflow-hidden transition-all duration-200 ${solutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                }`}
                        >
                            <div className="p-2">
                                {solutions.map((solution) => (
                                    <Link
                                        key={solution.href}
                                        href={solution.href}
                                        className="block p-4 rounded-md hover:bg-muted/50 transition-colors group/item"
                                    >
                                        <div className="text-sm font-semibold text-primary group-hover/item:text-accent transition-colors">
                                            {solution.name}
                                        </div>
                                        <div className="text-xs text-primary/50 mt-1">
                                            {solution.description}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link href="/use-cases" className="text-sm font-medium text-primary/70 hover:text-primary transition-colors">
                        Use Cases
                    </Link>
                    <Link href="/resources" className="text-sm font-medium text-primary/70 hover:text-primary transition-colors">
                        Resources
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium text-primary/70 hover:text-primary transition-colors">
                        Pricing
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-primary/70 hover:text-primary transition-colors">
                        Contact
                    </Link>
                </div>

                {/* Desktop CTAs */}
                <div className="hidden lg:flex items-center gap-3">
                    
                    <Link
                        href="/contact"
                        className="px-5 py-2.5 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent/90 transition-colors"
                    >
                        Book a Consultation
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 text-primary"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-primary/5">
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
                                className="text-sm font-medium text-primary hover:text-accent transition-colors"
                            >
                                Solutions
                            </Link>
                            <div className="pl-4 mt-2 space-y-2">
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
                        <Link
                            href="/pricing"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-3 text-sm font-medium text-primary hover:text-accent transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-3 text-sm font-medium text-primary hover:text-accent transition-colors"
                        >
                            Contact
                        </Link>

                        {/* Mobile CTAs */}
                        <div className="pt-4 space-y-3">
                            
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-center py-3 text-sm font-medium text-white bg-accent rounded-md hover:bg-accent/90 transition-colors"
                            >
                                Book a Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}