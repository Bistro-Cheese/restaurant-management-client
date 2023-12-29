'use client';

import { managerRoutes } from '@/constants/routes';
import { SidebarItem } from '../../_components/SidebarItem';
import React from 'react';

export const SidebarRoutes: React.FC = () => {
    return (
        <div className='flex w-full flex-col space-y-2 px-2'>
            {managerRoutes.map((route) => (
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
