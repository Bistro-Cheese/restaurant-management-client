'use client';

import { ownerRoutes } from '@/constants/routes';
import { SidebarItem } from '../../_components/SidebarItem';

export const SidebarRoutes = () => {
    return (
        <div className='flex w-full flex-col space-y-2 px-2'>
            {ownerRoutes.map((route) => (
                <SidebarItem
                    key={route.path}
                    icon={route.icon}
                    iconActive={route.iconActive}
                    name={route.name}
                    path={route.path}
                />
            ))}
        </div>
    );
};
