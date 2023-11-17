'use client';

import { useRouter, usePathname } from 'next/navigation';

function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const activeClassname = 'bg-[#F59E0B] text-white';

    const isTableActive = pathname.includes('/staff/tables')
        ? activeClassname
        : 'hover:bg-[#f59f0b70] cursor-pointer';
    const isOrderActive = pathname.includes('/staff/orders')
        ? activeClassname
        : 'hover:bg-[#f59f0b70] cursor-pointer';

    return (
        <nav className='px-10'>
            <ul className='flex items-center gap-10'>
                <div
                    onClick={() => router.push('/staff/tables')}
                    className={`rounded-full px-4 py-2 ${isTableActive}`}
                >
                    Table
                </div>
                <div
                    onClick={() => router.push('/staff/orders')}
                    className={`rounded-full px-4 py-2 ${isOrderActive}`}
                >
                    Order
                </div>
            </ul>
        </nav>
    );
}
export default Navbar;
