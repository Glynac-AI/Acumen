import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    background?: 'white' | 'muted' | 'gradient';
    padding?: 'sm' | 'md' | 'lg';
}

export default function Section({
    children,
    className = '',
    background = 'white',
    padding = 'lg'
}: SectionProps) {
    const backgrounds = {
        white: 'bg-white',
        muted: 'bg-muted/30',
        gradient: 'bg-gradient-to-br from-primary via-primary to-accent',
    };

    const paddings = {
        sm: 'py-12',
        md: 'py-16',
        lg: 'py-24',
    };

    return (
        <section className={`${backgrounds[background]} ${paddings[padding]} ${className}`}>
            {children}
        </section>
    );
}