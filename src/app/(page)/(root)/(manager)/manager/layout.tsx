import { Header } from '@/app/(page)/(root)/_components/Header';

import { SidebarRoutes } from '../_components/SidebarRoutes';
import { Sidebar } from '../../_components/sidebar';

const ManagerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <div className='fixed z-50 h-[80px] w-full'>
                <Header>
                    <></>
                </Header>
            </div>

            <div className='fixed z-50 hidden h-full  w-56 flex-col pt-[80px] md:flex'>
                <Sidebar>
                    <SidebarRoutes />
                </Sidebar>
            </div>

            <main className='h-full pt-[80px] md:pl-56'>{children}</main>
        </div>
    );
};

export default ManagerLayout;
