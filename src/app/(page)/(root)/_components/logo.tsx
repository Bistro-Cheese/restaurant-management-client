import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Logo = () => {
    const pathname = usePathname();
    return (
        <Link
            href='#'
            className='flex items-center transition-all duration-200 ease-linear'
        >
            <div className='relative h-10 w-10 shrink-0'>
                <Image
                    src='/cheese-logo.png'
                    alt='cheese-logo'
                    fill
                    className=' object-cover object-center'
                />
            </div>
            {pathname.includes('/staff') ? (
                <span className='ml-2 line-clamp-1 hidden truncate font-primary text-xl font-bold text-tertiary sml:inline-block'>
                    Cheese Bistro
                </span>
            ) : (
                <span className='ml-2 line-clamp-1 hidden font-primary text-xl font-bold text-tertiary lgl:inline-block'>
                    Cheese Bistro
                </span>
            )}
        </Link>
    );
};
