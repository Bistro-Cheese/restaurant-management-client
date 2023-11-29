'use client';

import { useRouter, usePathname } from 'next/navigation';

function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const activeClassname = 'bg-darkGold text-white';

    const isTableActive = pathname.includes('/staff/tables')
        ? activeClassname
        : 'hover:bg-gold-300/40 cursor-pointer';
    const isOrderActive = pathname.includes('/staff/orders')
        ? activeClassname
        : 'hover:bg-gold-300/40 cursor-pointer';

    return (
        <nav className='px-10'>
            <ul className='flex items-center gap-5'>
                <div
                    onClick={() => router.push('/staff/tables')}
                    className={`rounded-full px-4 py-2 ${isTableActive} duration-200 ease-linear`}
                >
                    Table
                </div>
                <div
                    onClick={() => router.push('/staff/orders')}
                    className={`rounded-full px-4 py-2 ${isOrderActive} duration-200 ease-linear`}
                >
                    Order
                </div>
            </ul>
        </nav>
    );
}
export default Navbar;
