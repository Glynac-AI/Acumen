import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function Container({ children, className = '', maxWidth = 'xl' }: ContainerProps) {
    const maxWidths = {
        sm: 'max-w-3xl',
        md: 'max-w-4xl',
        lg: 'max-w-5xl',
        xl: 'max-w-6xl',
        full: 'max-w-7xl',
    };

    return (
        <div className={`container mx-auto px-6 ${maxWidths[maxWidth]} ${className}`}>
            {children}
        </div>
    );
}