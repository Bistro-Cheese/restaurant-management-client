'use client';

import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const activeClassname = 'bg-harvest-gold-500 text-white';

    const isTableActive = pathname.includes('/staff/tables')
        ? activeClassname
        : 'hover:bg-harvest-gold-300 cursor-pointer hover:text-white';
    const isOrderActive = pathname.includes('/staff/orders')
        ? activeClassname
        : 'hover:bg-harvest-gold-300 cursor-pointer hover:text-white';

    return (
        <nav className='px-10'>
            <ul className='flex items-center gap-5'>
                <div
                    onClick={() => router.push('/staff/tables')}
                    className={cn(
                        `rounded-full px-4 py-2 duration-200 ease-linear`,
                        isTableActive
                    )}
                >
                    Table
                </div>
                <div
                    onClick={() => router.push('/staff/orders')}
                    className={cn(
                        `rounded-full px-4 py-2 duration-200 ease-linear`,
                        isOrderActive
                    )}
                >
                    Order
                </div>
            </ul>
        </nav>
    );
}
export default Navbar;
