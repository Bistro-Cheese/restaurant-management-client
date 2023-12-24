'use client';

import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const activeClassname = 'text-tertiary underline-offset-2 underline';

    const isTableActive = pathname.includes('/staff/tables')
        ? activeClassname
        : ' cursor-pointer hover:text-dark-navy-700';
    const isOrderActive = pathname.includes('/staff/orders')
        ? activeClassname
        : ' cursor-pointer hover:text-dark-navy-700';

    return (
        <nav className='ml-10'>
            <ul className='flex items-center gap-5'>
                <div
                    onClick={() => router.push('/staff/tables')}
                    className={cn(
                        `text-secondary-subtitle rounded-full px-4 py-2 text-lg font-bold duration-200 ease-linear`,
                        isTableActive
                    )}
                >
                    Table
                </div>
                <div
                    onClick={() => router.push('/staff/orders')}
                    className={cn(
                        `text-secondary-subtitle rounded-full px-4 py-2 text-lg font-bold duration-200 ease-linear`,
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
