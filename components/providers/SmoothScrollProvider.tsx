// components/providers/SmoothScrollProvider.tsx
'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    return (
        <ReactLenis
            root
            options={{
                // Balanced lerp for smooth but responsive feel
                lerp: 0.1,

                // Good duration for natural transitions
                duration: 1.2,

                // Enable smooth wheel scrolling
                smoothWheel: true,

                // Increase scroll speed significantly
                wheelMultiplier: 1.5,

                // Touch scroll speed
                touchMultiplier: 2.5,
            }}
        >
            {children}
        </ReactLenis>
    );
}