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

    const [isCollapseSideBar, setIsCollapseSideBar] = useState(false);
    const controlSidebar = useAnimation();
    const controlText = useAnimation();

    // useEffect(() => {

    // }, [width])

    const hanldeExpandSideBar = () => {
        setIsCollapseSideBar(false);
        controlSidebar.start({
            width: '210px',
            transition: { duration: 0.002 }
        });

        controlText.start({
            opacity: 1,
            display: 'block',
            transition: { duration: 0.15, delay: 0.35 }
        });
    };

    const hanldeCollapseSideBar = () => {
        setIsCollapseSideBar(true);

        controlText.start({
            opacity: 0,
            display: 'none',
            transition: { duration: 0.002 }
        });

        controlSidebar.start({
            width: '74px',
            transition: { duration: 0.002 }
        });
    };

    const routeContent = getRouteContent(pathname);
    console.log('routeContent', routeContent);

    return (
        <div className='flex h-full w-full'>
            <Sidebar
                isCollapseSideBar={isCollapseSideBar}
                controlSidebar={controlSidebar}
                controlText={controlText}
                hanldeExpandSideBar={hanldeExpandSideBar}
                hanldeCollapseSideBar={hanldeCollapseSideBar}
            >
                {pathname.includes('/owner') ? (
                    <OwnerSidebarRoutes controlText={controlText} />
                ) : pathname.includes('/manager') ? (
                    <ManagerSidebarRoutes controlText={controlText} />
                ) : (
                    <span>i don't know who you are</span>
                )}
            </Sidebar>

            {width >= 960 ? (
                <main
                    className={cn(
                        'flex h-full w-full flex-col transition-all duration-200 ease-linear',
                        !isCollapseSideBar ? ' pl-[210px]' : 'pl-[74px]'
                    )}
                >
                    <Header routeContent={routeContent}>
                        <></>
                    </Header>
                    <div className='h-full w-full px-3'>{children}</div>
                </main>
            ) : (
                <main
                    className={cn(
                        'flex h-full w-full flex-col pl-0 transition-all duration-200 ease-linear'
                    )}
                >
                    <Header routeContent={routeContent}>
                        <></>
                    </Header>
                    <div className='h-full w-full px-3'>{children}</div>
                </main>
            )}
        </div>
    );
};

export default Layout;
