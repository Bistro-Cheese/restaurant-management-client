import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { SidebarRoutes as OwnerSidebarRoutes } from '../(admin)/_components/SidebarRoutes';
import { SidebarRoutes as ManagerSidebarRoutes } from '../(manager)/_components/SidebarRoutes';
import { Header } from './Header';
import { getActiveRoute } from '@/utils/navigation';
import { managerRoutes, ownerRoutes } from '@/constants/routes';

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

    const routeContent = getRouteContent(pathname);
    console.log('routeContent', routeContent);

    return (
        <div className='flex h-full w-full'>
            <Sidebar>
                {pathname.includes('/owner') ? (
                    <OwnerSidebarRoutes />
                ) : (
                    <ManagerSidebarRoutes />
                )}
            </Sidebar>

            <main className='h-full w-full transition-all duration-200 ease-linear md:pl-[94px] lgl:pl-56'>
                <Header routeContent={routeContent}>
                    <></>
                </Header>
                <div className='h-full w-full px-3'>{children}</div>
            </main>
        </div>
    );
};

export default Layout;
