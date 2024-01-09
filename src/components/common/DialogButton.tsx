import { cn } from '@/lib/utils';

interface IProps {
    title: string;
    handleClick: () => void;
    backgroundColor: string;
    textColor?: string;
}

export default function DialogButton({
    title,
    handleClick,
    backgroundColor,
    textColor = 'text-white'
}: IProps) {
    return (
        <button
            onClick={handleClick}
            className={cn(
                'min-w-[80px] rounded px-4 py-2 shadow-sm transition-all duration-200 ease-in-out active:bg-opacity-70',
                backgroundColor
            )}
        >
            <span className={(cn('font-semibold'), textColor)}>{title}</span>
        </button>
    );
}
