'use client';

import { managerRoutes } from '@/constants/routes';
import { SidebarItem } from '../../_components/SidebarItem';
import React from 'react';
import { AnimationControls } from 'framer-motion';

interface SidebarRoutesProps {
    controlText?: AnimationControls;
}

export const SidebarRoutes: React.FC<SidebarRoutesProps> = ({
    controlText
}) => {
    return (
        <div className='flex w-full flex-col space-y-2 px-2'>
            {managerRoutes.map((route) => (
                <SidebarItem
                    key={route.path}
                    controlText={controlText}
                    icon={route.icon}
                    iconActive={route.iconActive}
                    name={route.name}
                    path={route.path}
                />
            ))}
        </div>
    );
};
