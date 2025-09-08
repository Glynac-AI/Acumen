// src/components/home/DatabaseShowcase.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    FileText,
    Shield,
    UserCheck,
    BarChart,
    Clock,
    Search
} from "lucide-react";

// Database structure based on the provided document
const databaseCategories = [
    {
        id: "wealth-managers",
        icon: <Users className="w-5 h-5" />,
        name: "Wealth Managers / Advisors",
        count: 500,
        color: "bg-blue-500/10 text-blue-500 border-blue-500/30"
    },
    {
        id: "financial-planners",
        icon: <FileText className="w-5 h-5" />,
        name: "Licensed Financial Planners",
        count: 200,
        color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
    },
    {
        id: "tax-advisors",
        icon: <BarChart className="w-5 h-5" />,
        name: "Tax Advisors & Accountants",
        count: 150,
        color: "bg-amber-500/10 text-amber-500 border-amber-500/30"
    },
    {
        id: "estate-planning",
        icon: <Shield className="w-5 h-5" />,
        name: "Estate Planning Specialists",
        count: 100,
        color: "bg-purple-500/10 text-purple-500 border-purple-500/30"
    },
    {
        id: "compliance",
        icon: <FileText className="w-5 h-5" />,
        name: "Compliance Officers",
        count: 75,
        color: "bg-red-500/10 text-red-500 border-red-500/30"
    },
    {
        id: "support",
        icon: <UserCheck className="w-5 h-5" />,
        name: "Support Staff",
        count: 975,
        color: "bg-gray-500/10 text-gray-500 border-gray-500/30"
    }
];

const DatabaseShowcase = () => {
    const [activeCategory, setActiveCategory] = useState("wealth-managers");
    const [isHovering, setIsHovering] = useState(false);

    // Total candidates count
    const totalCandidates = databaseCategories.reduce((sum, category) => sum + category.count, 0);

    return (
        <section className="py-24 bg-[#F8FAFC]">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 border border-[#4F6BFF]/20 rounded-full bg-[#4F6BFF]/5 text-[#4F6BFF] text-sm font-medium">
                        Talent Database
                    </div>
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#0A2540] mb-6">
                        <span className="text-[#4F6BFF] font-normal">{totalCandidates.toLocaleString()}</span> pre-screened professionals
                    </h2>
                    <p className="text-xl text-[#6B7280] leading-relaxed">
                        Our proprietary database gives you immediate access to qualified talent specialized in wealth management and financial services.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column - Database Visualization */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                    >
                        <div className="p-8 bg-white rounded-xl border border-[#E5E7EB] shadow-soft-xl">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-2xl font-light text-[#0A2540]">Candidate Distribution</h3>
                                <div className="text-sm text-[#6B7280] font-medium">
                                    {totalCandidates.toLocaleString()} total candidates
                                </div>
                            </div>

                            <div className="space-y-8">
                                {databaseCategories.map((category) => {
                                    const percentage = (category.count / totalCandidates) * 100;
                                    const isActive = activeCategory === category.id;

                                    return (
                                        <motion.div
                                            key={category.id}
                                            className={`relative cursor-pointer transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                                                }`}
                                            onClick={() => setActiveCategory(category.id)}
                                            whileHover={{ x: 4 }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-md ${category.color} border flex items-center justify-center`}>
                                                        {category.icon}
                                                    </div>
                                                    <span className="font-medium text-[#0A2540]">{category.name}</span>
                                                </div>
                                                <span className="font-mono font-medium text-[#0A2540]">{category.count.toLocaleString()}</span>
                                            </div>

                                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    className={`h-full ${category.color.split(' ')[0].replace('/10', '')}`}
                                                    style={{ width: '0%' }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{
                                                        duration: 1.5,
                                                        ease: [0.25, 0.1, 0.25, 1.0],
                                                        delay: isActive ? 0 : 0.2
                                                    }}
                                                />
                                            </div>

                                            {isActive && (
                                                <motion.div
                                                    className="absolute right-0 -bottom-6 text-xs text-[#6B7280] font-medium"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {percentage.toFixed(1)}% of database
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="mt-16 pt-6 border-t border-[#E5E7EB] text-center">
                                <p className="text-[#6B7280] text-sm mb-4">
                                    While our database is extensive, we launch new recruiting efforts for every client engagement to ensure candidates are local and role-appropriate.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Interactive Element */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                    >
                        <div className="relative h-full">
                            <div className="p-8 bg-white rounded-xl border border-[#E5E7EB] shadow-soft-xl h-full">
                                <h3 className="text-2xl font-light text-[#0A2540] mb-6">Experience the difference</h3>

                                <div
                                    className="relative mb-8 rounded-lg border border-[#E5E7EB] p-4 transition-all duration-300 hover:border-[#4F6BFF]/30"
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                >
                                    <div className="absolute top-4 right-4 text-[#6B7280]">
                                        <Search className="w-5 h-5" />
                                    </div>

                                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Search Candidates</label>
                                    <motion.input
                                        type="text"
                                        className="w-full bg-transparent border-none p-0 text-[#0A2540] focus:outline-none focus:ring-0"
                                        placeholder="Try: 'CFP in Chicago'"
                                        animate={{
                                            x: isHovering ? [0, 2, 0] : 0,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: isHovering ? 2 : 0,
                                            repeatType: "reverse"
                                        }}
                                    />
                                </div>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#F0F4F9] flex items-center justify-center text-[#4F6BFF] shrink-0">
                                            <UserCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-[#0A2540] mb-1">Pre-screening guaranteed</h4>
                                            <p className="text-sm text-[#6B7280] leading-relaxed">
                                                Every candidate undergoes a thorough vetting process before entering our database.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#F0F4F9] flex items-center justify-center text-[#4F6BFF] shrink-0">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-[#0A2540] mb-1">Immediate access</h4>
                                            <p className="text-sm text-[#6B7280] leading-relaxed">
                                                Begin reviewing qualified candidates within days, not weeks or months.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-[#E5E7EB]">
                                    <motion.a
                                        href="/contact"
                                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#4F6BFF] text-white font-medium rounded-md hover:bg-[#3D5BF6] transition-colors"
                                        whileHover={{
                                            y: -4,
                                            boxShadow: "0 6px 20px rgba(79, 107, 255, 0.4)"
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span>Schedule a call to access our database</span>
                                        <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>

                            {/* Subtle decoration */}
                            <div className="absolute -bottom-3 -right-3 w-64 h-64 bg-[#4F6BFF]/5 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DatabaseShowcase;