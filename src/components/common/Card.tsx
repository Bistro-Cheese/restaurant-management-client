import { cn } from '@/lib/utils';

const Card: React.FC<{
    variant?: string;
    className?: string;
    children?: JSX.Element | any[];
    [x: string]: any;
}> = (props) => {
    const { variant, className, children, ...rest } = props;

    return (
        <div
            className={cn(
                `!z-5 relative flex rounded-2xl bg-white bg-clip-border drop-shadow-secondary transition-all duration-300 ease-in-out`,
                className
            )}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Card;
