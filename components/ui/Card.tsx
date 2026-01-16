import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
    return (
        <div
            className={`bg-white rounded-lg border border-primary/10 p-8 ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''
                } ${className}`}
        >
            {children}
        </div>
    );
}