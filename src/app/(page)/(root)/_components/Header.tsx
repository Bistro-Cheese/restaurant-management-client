'use client';
import { usePathname } from 'next/navigation';

import { Logo } from './Logo';
import { HeaderContent } from './header-content';
import { MobileSidebar } from './MobileSidebar';

export const Header = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <div className='flex h-full items-center bg-white/70 p-4 shadow-sm backdrop-blur-xl'>
            <div className='p-6'>
                <Logo />
            </div>
            {children}
            {!pathname.includes('/staff') && <MobileSidebar />}
            <HeaderContent />
        </div>
    );
};
