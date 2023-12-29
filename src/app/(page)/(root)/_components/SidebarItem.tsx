'use client';
import { cn } from '@/lib/utils';
import { IRoute } from '@/types/navigation';
import { usePathname, useRouter } from 'next/navigation';

export const SidebarItem = ({
    icon: Icon,
    iconActive: IconActive,
    name,
    path
}: IRoute) => {
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
                'group flex items-center space-x-4 rounded-lg pl-6 font-[500] text-tertiary-subtitle transition-all duration-200 ease-linear hover:bg-tertiary/10',
                isActive && 'text-tertiary'
            )}
        >
            <div
                className={cn(
                    'flex items-center gap-x-4 py-4 text-lg',
                    isActive && 'font-bold'
                )}
            >
                {isActive ? (
                    <IconActive
                        size={28}
                        className={cn(
                            'shrink-0 text-tertiary transition-all duration-200 ease-linear group-hover:scale-105'
                        )}
                    />
                ) : (
                    <Icon
                        size={28}
                        className={cn(
                            'shrink-0 text-tertiary-subtitle transition-all duration-200 ease-linear group-hover:scale-105'
                        )}
                    />
                )}
                <span className='sr-only lgl:not-sr-only'>{name}</span>
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
