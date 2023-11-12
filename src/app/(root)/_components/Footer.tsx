import Image from 'next/image';
import { BsGithub, BsInstagram, BsTwitter, BsFacebook } from 'react-icons/bs';

function Footer() {
    return (
        <footer className='flex justify-between gap-28 bg-[#474747] px-40 py-20 text-white'>
            <div className='flex flex-1 flex-col justify-between'>
                <div>
                    <div className='flex items-center'>
                        <Image
                            src='/cheese-logo.png'
                            alt='cheese-logo'
                            width={30}
                            height={30}
                        />
                        <p className='ml-2 text-2xl font-bold italic'>
                            Cheese Bistro
                        </p>
                    </div>

                    <p className='mt-4 text-gray-400'>
                        Introducing the Cheese Bistro Restaurant Management
                        System, a sophisticated solution catering to diverse
                        operational needs.
                    </p>

                    {/* Social */}
                    <ul className='mt-4 flex items-center gap-4'>
                        <li className='rounded-full bg-[#AD343E] p-2'>
                            <BsInstagram size={16} />
                        </li>
                        <li className='rounded-full bg-[#AD343E] p-2'>
                            <BsTwitter size={16} />
                        </li>
                        <li className='rounded-full bg-[#AD343E] p-2'>
                            <BsFacebook size={16} />
                        </li>
                        <li className='rounded-full bg-[#AD343E] p-2'>
                            <BsGithub size={16} />
                        </li>
                    </ul>
                </div>

                {/* Copyright */}
                <div>
                    <div className='border-t-[1px] border-t-gray-400' />
                    <p className='mt-4 text-gray-400'>
                        Copyright © 2023 Cheese Bistro. All Rights Reserved
                    </p>
                </div>
            </div>
            <div className='flex-1'>
                <p className='font-bold'>Follow Us On Github</p>
                <ul className='mt-4 flex flex-wrap gap-6'>
                    <li>
                        <Image
                            src='/footer-1.png'
                            alt='footer-1'
                            width={200}
                            height={200}
                            className='rounded-lg'
                        />
                    </li>
                    <li>
                        <Image
                            src='/footer-2.png'
                            alt='footer-2'
                            width={200}
                            height={200}
                            className='rounded-lg'
                        />
                    </li>
                    <li>
                        <Image
                            src='/footer-3.png'
                            alt='footer-3'
                            width={200}
                            height={200}
                            className='rounded-lg'
                        />
                    </li>
                    <li>
                        <Image
                            src='/footer-4.png'
                            alt='footer-4'
                            width={200}
                            height={200}
                            className='rounded-lg'
                        />
                    </li>
                </ul>
            </div>
        </footer>
    );
}
export default Footer;
