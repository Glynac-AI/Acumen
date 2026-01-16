'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
    from?: number;
    to: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export default function AnimatedCounter({
    from = 0,
    to,
    duration = 2,
    suffix = '',
    prefix = '',
    className = ''
}: AnimatedCounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const spring = useSpring(from, {
        stiffness: 50,
        damping: 30,
        duration: duration * 1000
    });

    const display = useTransform(spring, (current) =>
        Math.floor(current).toLocaleString()
    );

    useEffect(() => {
        if (isInView) {
            spring.set(to);
        }
    }, [isInView, spring, to]);

    return (
        <motion.span ref={ref} className={className}>
            {prefix}
            <motion.span>{display}</motion.span>
            {suffix}
        </motion.span>
    );
}