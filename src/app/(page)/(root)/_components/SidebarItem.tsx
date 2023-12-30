'use client';
import { cn } from '@/lib/utils';
import { IRoute } from '@/types/navigation';
import { AnimationControls } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface SidebarItemProps extends IRoute {
    controlText?: AnimationControls;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    iconActive: IconActive,
    name,
    path,
    controlText
}) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = pathname.includes(path);

    const onClick = () => {
        router.push(path);
    };

    return (
        <button
            onClick={onClick}
            type='button'
            className={cn(
                'group/item flex items-center space-x-4 rounded-lg pl-4 transition-all duration-200 ease-linear hover:bg-tertiary/10'
            )}
        >
            <div className={cn('flex items-center gap-x-4 py-4')}>
                {isActive ? (
                    <IconActive
                        size={24}
                        className={cn(
                            'shrink-0 text-tertiary transition-all duration-200 ease-linear group-hover/item:scale-105'
                        )}
                    />
                ) : (
                    <Icon
                        size={24}
                        className={cn(
                            'shrink-0 text-tertiary-subtitle transition-all duration-200 ease-linear group-hover/item:scale-105'
                        )}
                    />
                )}
                <motion.span
                    animate={controlText}
                    className={cn(
                        'inline-block text-tertiary',
                        isActive && 'font-bold'
                    )}
                >
                    {name}
                </motion.span>
            </div>
            {/* <div
                className={cn(
                    'ml-auto h-full border-2 border-sky-700 opacity-0 transition-all',
                    isActive && 'opacity-100'
                )}
            /> */}
        </button>
    );
};
