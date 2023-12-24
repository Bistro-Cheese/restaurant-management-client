'use client';
import { UnauthenticateLayout } from '@/hoc/unauthenticate-layout';
import { Header } from '../../_components/Header';
import { SidebarRoutes } from '../_components/SidebarRoutes';
import { Sidebar } from '../../_components/Sidebar';
import { getActiveRoute } from '@/utils/navigation';
import { managerRoutes, ownerRoutes } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import path from 'path';
import { useEffect } from 'react';

const getRouteContent = (pathname: string) => {
    if (pathname.includes('/staff')) return 'staff';

    switch (pathname.includes('/owner')) {
        case true:
            return getActiveRoute(ownerRoutes, pathname);
        case false:
            return getActiveRoute(managerRoutes, pathname);
        default:
            return;
    }
};

const OwnerLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const routeContent = getActiveRoute(ownerRoutes, pathname);
    console.log('routeContent', routeContent);

    return (
        <UnauthenticateLayout>
            <div className='flex h-full w-full'>
                <Sidebar>
                    <SidebarRoutes />
                </Sidebar>

                <main className='h-full w-full transition-all duration-200 ease-linear md:pl-56'>
                    <Header routeContent={routeContent}>
                        <></>
                    </Header>
                    <div className='h-full w-full px-3'>{children}</div>
                </main>
            </div>
        </UnauthenticateLayout>
    );
};

export default OwnerLayout;
