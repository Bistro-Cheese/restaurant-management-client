import { cn } from '@/lib/utils';
import { FC, HTMLProps, ReactNode } from 'react';

interface HeadingProps {
    title: string;
    description: string;
    classNameDescription?: string;
}

export const Heading: React.FC<HeadingProps> = ({
    title,
    description,
    classNameDescription
}) => {
    return (
        <div>
            <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
            <p
                className={cn(
                    'text-sm text-muted-foreground',
                    classNameDescription
                )}
            >
                {description}
            </p>
        </div>
    );
};
