'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function AnimatedCard({
    children,
    className = '',
    hover = true
}: AnimatedCardProps) {
    return (
        <motion.div
            className={`bg-white rounded-lg border border-primary/10 p-8 ${className}`}
            whileHover={hover ? {
                y: -8,
                transition: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // Type assertion for cubic-bezier
                }
            } : undefined}
        >
            {children}
        </motion.div>
    );
}