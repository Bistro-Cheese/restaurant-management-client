import { Logo } from './logo';
import { SidebarRoutes } from './sidebar-routes';

export const Sidebar = () => {
    return (
        <div className='flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm'>
            <div className='flex w-full flex-col'>
                <SidebarRoutes />
            </div>
        </div>
    );
};
