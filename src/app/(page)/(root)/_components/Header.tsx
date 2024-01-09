'use client';
import { usePathname } from 'next/navigation';

import { Logo } from './logo';
import { HeaderContent } from './header-content';
import { MobileSidebar } from './MobileSidebar';
import { getActiveRoute } from '@/utils/navigation';
import { managerRoutes, ownerRoutes } from '@/constants/routes';
import { get } from 'http';
import NavLink from '@/components/link/nav-link';
import useWindowDimensions from '@/hooks/use-window-dimensions';

interface HeaderProps {
    children: React.ReactNode;
    routeContent?: string | undefined;
}

export const Header: React.FC<HeaderProps> = ({ children, routeContent }) => {
    const { height, width } = useWindowDimensions();
    const pathname = usePathname();

    return (
        <div className='sticky inset-x-0 top-0 z-50 block h-[100px] w-full overflow-hidden px-3 py-2 transition-all duration-300 ease-in-out'>
            <div className='flex h-full w-full overflow-hidden rounded-2xl bg-white/20 px-5 backdrop-blur-xl'>
                <div className='flex grow flex-row items-center'>
                    {width >= 960 &&
                        (pathname.includes('/owner') ||
                            pathname.includes('/manager')) && (
                            <div>
                                <div className='h-6 pt-1'>
                                    <a
                                        className='text-sm font-normal text-tertiary hover:underline'
                                        href=' '
                                    >
                                        Pages
                                        <span className='mx-1 text-sm text-tertiary hover:text-dark-navy-700'>
                                            {' '}
                                            /{' '}
                                        </span>
                                    </a>
                                    <NavLink
                                        className='text-sm font-normal capitalize text-tertiary hover:underline'
                                        href='#'
                                    >
                                        {routeContent}
                                    </NavLink>
                                </div>
                                <span className='shrink text-3xl capitalize text-tertiary'>
                                    <NavLink
                                        href='#'
                                        className='font-bold capitalize hover:text-dark-navy-700'
                                    >
                                        {routeContent}
                                    </NavLink>
                                </span>
                            </div>
                        )}
                    {pathname.includes('/staff') && <Logo />}
                    {children}
                    {!pathname.includes('/staff') && <MobileSidebar />}
                    <HeaderContent />
                </div>
            </div>
        </div>
    );
};
