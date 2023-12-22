'use client';
import { cn } from '@/lib/utils';
import SidebarItemType from '@/types/SidebarItemType';
import { usePathname, useRouter } from 'next/navigation';

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemType) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = pathname === href;

    const onClick = () => {
        router.push(href);
    };

    return (
        <button
            onClick={onClick}
            type='button'
            className={cn(
                'flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-600 transition-all duration-500 ease-linear hover:bg-yellow-300 hover:text-sky-700',
                isActive &&
                    'bg-yellow-400 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700'
            )}
        >
            <div className='flex items-center gap-x-2 py-4'>
                <Icon
                    size={22}
                    className={cn('text-slate-600', isActive && 'text-sky-700')}
                />
                {label}
            </div>
            <div
                className={cn(
                    'ml-auto h-full border-2 border-sky-700 opacity-0 transition-all',
                    isActive && 'opacity-100'
                )}
            />
        </button>
    );
};
