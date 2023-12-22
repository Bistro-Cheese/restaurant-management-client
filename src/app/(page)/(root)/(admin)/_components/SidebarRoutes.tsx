'use client';

import { ownerRoutes } from '@/constants/routes';
import { SidebarItem } from '../../_components/SidebarItem';

export const SidebarRoutes = () => {
    return (
        <div className='flex w-full flex-col'>
            {ownerRoutes.map((route) => (
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
