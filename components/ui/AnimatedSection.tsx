'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
}

const animationVariants = {
    fadeInUp: {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 }
    },
    fadeInDown: {
        initial: { opacity: 0, y: -40 },
        animate: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
        initial: { opacity: 0, x: -40 },
        animate: { opacity: 1, x: 0 }
    },
    fadeInRight: {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 }
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 }
    }
};

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    animation = 'fadeInUp'
}: AnimatedSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const selectedAnimation = animationVariants[animation];

    return (
        <motion.div
            ref={ref}
            initial={selectedAnimation.initial}
            animate={isInView ? selectedAnimation.animate : selectedAnimation.initial}
            transition={{
                duration: 0.6,
                delay: delay,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}