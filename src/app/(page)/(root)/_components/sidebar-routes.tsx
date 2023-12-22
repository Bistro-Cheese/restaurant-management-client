'use client';

import { usePathname } from 'next/navigation';

import { SidebarItem } from './SidebarItem';
import { managerRoutes, ownerRoutes } from '@/constants/routes';

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isOwner = pathname?.includes('/owner');

    // const routes = ownerRoutes;
    const routes = isOwner ? ownerRoutes : managerRoutes;

    return (
        <div className='flex w-full flex-col'>
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
};
