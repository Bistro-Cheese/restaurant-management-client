import { Button } from '@/components/ui/button';
import { Phone, Mail, Twitter, Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Header() {
    const router = useRouter();

    return (
        <header className='w-full'>
            {/* Top Bar */}
            <div className='flex items-center justify-between bg-[#474747] px-32 py-2 text-white'>
                {/* Contact */}
                <div className='flex'>
                    <div className='flex items-center'>
                        <Phone size={16} />
                        <p className='pl-1'>0813993353</p>
                    </div>
                    <div className='ml-4 flex items-center'>
                        <Mail size={16} />
                        <p className='pl-1'>cheesebistro.res@gmail.com</p>
                    </div>
                </div>

                {/* Social */}
                <div className='flex w-16 justify-between'>
                    <Twitter size={16} />
                    <Facebook size={16} />
                    <Instagram size={16} />
                </div>
            </div>

            {/* Header */}
            <div className='flex items-center justify-between bg-red-50 px-32 py-5'>
                {/* Logo */}
                <div className='flex'>
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

                {/* Actions */}
                <div className='flex'>
                    <Button
                        className='rounded-3xl'
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
