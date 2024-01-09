import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { SidebarRoutes as OwnerSidebarRoutes } from '../(admin)/_components/SidebarRoutes';
import { SidebarRoutes as ManagerSidebarRoutes } from '../(manager)/_components/SidebarRoutes';
import { Header } from './Header';
import { getActiveRoute } from '@/utils/navigation';
import { managerRoutes, ownerRoutes } from '@/constants/routes';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { cn } from '@/lib/utils';

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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();

    const { height, width } = useWindowDimensions();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const controlSidebar = useAnimation();
    const controlText = useAnimation();

    const handleOpenSidebar = async () => {
        setIsSidebarOpen(true);

        // await controlSidebar.start({
        //     width: '210px',
        //     transition: { duration: 0.002 }
        // });

        // await controlText.start({
        //     opacity: 1,
        //     display: 'block',
        //     transition: { duration: 0.15 }
        // });
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);

        // controlText.start({
        //     opacity: 0,
        //     display: 'none',
        //     transition: { duration: 0.002 }
        // });

        // controlSidebar.start({
        //     width: '74px',
        //     transition: { duration: 0.002 }
        // });
    };

    const routeContent = getRouteContent(pathname);
    // console.log('routeContent', routeContent);

    return (
        <div className='flex h-full w-full'>
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                handleOpenSidebar={handleOpenSidebar}
                handleCloseSidebar={handleCloseSidebar}
            >
                {pathname.includes('/owner') ? (
                    <OwnerSidebarRoutes isSidebarOpen={isSidebarOpen} />
                ) : pathname.includes('/manager') ? (
                    <ManagerSidebarRoutes isSidebarOpen={isSidebarOpen} />
                ) : (
                    <span>i don't know who you are</span>
                )}
            </Sidebar>

            {width >= 960 ? (
                <main
                    className={cn(
                        'flex h-full w-full flex-col transition-all duration-300 ease-in-out',
                        isSidebarOpen ? ' pl-[210px]' : 'pl-[74px]'
                    )}
                >
                    <Header routeContent={routeContent}>
                        <></>
                    </Header>
                    <div className='h-full w-full px-4'>{children}</div>
                </main>
            ) : (
                <main
                    className={cn(
                        'flex h-full w-full flex-col pl-0 transition-all duration-300 ease-in-out'
                    )}
                >
                    <Header routeContent={routeContent}>
                        <></>
                    </Header>
                    <div className='h-full w-full px-4'>{children}</div>
                </main>
            )}
        </div>
    );
};

export default Layout;
