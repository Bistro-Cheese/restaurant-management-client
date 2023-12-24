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

    const isActive = pathname === path;

    const onClick = () => {
        router.push(path);
    };

    return (
        <button
            onClick={onClick}
            type='button'
            className={cn(
                'text-tertiary-subtitle group flex items-center gap-x-4 rounded-lg pl-6 font-[500] transition-all duration-200 ease-linear hover:bg-dark-navy-50/10',
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
                            'text-tertiary transition-all duration-200 ease-linear group-hover:scale-105'
                        )}
                    />
                ) : (
                    <Icon
                        size={28}
                        className={cn(
                            'text-tertiary-subtitle transition-all duration-200 ease-linear group-hover:scale-105'
                        )}
                    />
                )}
                {name}
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
