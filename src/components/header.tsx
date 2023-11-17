'use client';

import { HeaderContent } from '@/components/header-content';
import { MobileSidebar } from './mobile-sidebar';
import { Logo } from '@/app/(page)/(root)/(admin)/_components/logo';
import { usePathname } from 'next/navigation';

export const Header = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <div className='flex h-full items-center border-b bg-white p-4 shadow-sm'>
            <div className='p-6'>
                <Logo />
            </div>
            {children}
            {!pathname.includes('/staff') && <MobileSidebar />}
            <HeaderContent />
        </div>
    );
};
