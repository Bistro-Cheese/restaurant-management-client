import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function Header() {
    const router = useRouter();

    return (
        <header className='sticky top-0 z-10 w-full bg-white'>
            {/* Header */}
            <div className='flex items-center justify-between px-32 py-5'>
                {/* Logo */}
                <div className='flex items-start'>
                    <Image
                        src='/cheese-logo.png'
                        alt='cheese-logo'
                        width={40}
                        height={40}
                    />
                    <p className='ml-2 text-4xl font-bold italic'>
                        Cheese Bistro
                    </p>
                </div>

                {/* Navbar */}
                <nav className='flex items-center space-x-8'>
                    {/* Active */}
                    <a
                        href='#home'
                        className='rounded-full px-6 py-2 text-base font-semibold hover:bg-[#eceeea] active:bg-[#9ca584] active:text-white'
                    >
                        Home
                    </a>
                    <a
                        href='#services'
                        className='rounded-full px-6 py-2 text-base font-semibold hover:bg-[#eceeea] active:bg-[#9ca584] active:text-white'
                    >
                        Services
                    </a>
                    <a
                        href='#about'
                        className='rounded-full px-6 py-2 text-base font-semibold hover:bg-[#eceeea] active:bg-[#9ca584] active:text-white'
                    >
                        About
                    </a>
                    <a
                        href='#contact'
                        className='rounded-full px-6 py-2 text-base font-semibold hover:bg-[#eceeea] active:bg-[#9ca584] active:text-white'
                    >
                        Contact
                    </a>
                </nav>

                {/* Actions */}
                <div className='flex'>
                    <Button
                        className='rounded-3xl bg-white text-black outline outline-1 outline-black hover:bg-black hover:text-white'
                        onClick={() => {
                            router.push('/sign-in');
                        }}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </header>
    );
}
export default Header;
