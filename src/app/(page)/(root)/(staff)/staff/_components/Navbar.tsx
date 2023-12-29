'use client';

import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';

const Navbar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const activeClassname =
        'text-tertiary font-bold underline-offset-2 underline';

    const isTableActive = pathname.includes('/staff/tables')
        ? activeClassname
        : ' cursor-pointer hover:text-tertiary/90';
    const isOrderActive = pathname.includes('/staff/orders')
        ? activeClassname
        : ' cursor-pointer hover:text-tertiary/90';

    return (
        <nav className='ml-3 xs:ml-5 sml:ml-10'>
            <ul className='flex items-center space-x-4 text-lg sml:space-x-8'>
                <div
                    onClick={() => router.push('/staff/tables')}
                    className={cn(
                        `rounded-full py-2 text-secondary-subtitle duration-200 ease-linear`,
                        isTableActive
                    )}
                >
                    Table
                </div>
                <div
                    onClick={() => router.push('/staff/orders')}
                    className={cn(
                        `rounded-full py-2 text-secondary-subtitle duration-200 ease-linear`,
                        isOrderActive
                    )}
                >
                    Order
                </div>
            </ul>
        </nav>
    );
};
export default Navbar;
