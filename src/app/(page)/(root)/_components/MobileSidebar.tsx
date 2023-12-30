import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';
import { SidebarRoutes as OwnerSidebarRoutes } from '../(admin)/_components/SidebarRoutes';
import { SidebarRoutes as ManagerSidebarRoutes } from '../(manager)/_components/SidebarRoutes';
import { usePathname } from 'next/navigation';

export const MobileSidebar = () => {
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger className='pr-4 transition hover:opacity-75 lg:hidden'>
                <Menu />
            </SheetTrigger>
            <SheetContent side='left' className='bg-white p-0'>
                <Sidebar>
                    {pathname.includes('/owner') ? (
                        <OwnerSidebarRoutes />
                    ) : pathname.includes('/manager') ? (
                        <ManagerSidebarRoutes />
                    ) : (
                        <span>i don't know who you are</span>
                    )}
                </Sidebar>
            </SheetContent>
        </Sheet>
    );
};
