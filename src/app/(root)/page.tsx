'use client';

import Image from 'next/image';

import { BiFoodMenu } from 'react-icons/bi';
import {
    BsNewspaper,
    BsTelephone,
    BsInstagram,
    BsTwitter,
    BsLinkedin,
    BsGithub
} from 'react-icons/bs';
import { MdOutlineTableBar } from 'react-icons/md';
import { PiUserListLight } from 'react-icons/pi';
import { FiMail } from 'react-icons/fi';
import { TfiLocationPin } from 'react-icons/tfi';
import { Button } from '@/components/ui/button';

const services = [
    {
        icon: <BiFoodMenu size={40} />,
        title: 'Menu',
        desscription:
            'Elevate your restaurant with dynamic menus and effortless culinary management'
    },
    {
        icon: <BsNewspaper size={40} />,
        title: 'Order',
        desscription:
            'Simplify restaurant orders with our intuitive management service for seamless efficiency'
    },
    {
        icon: <MdOutlineTableBar size={40} />,
        title: 'Table',
        desscription:
            'Elevate dining with our seamless table service for personalized hospitality'
    },
    {
        icon: <PiUserListLight size={40} />,
        title: 'Employee',
        desscription:
            'Boost efficiency and morale with our employee service for a positive workplace'
    }
];

const profiles = [
    {
        avatar: '/tuan-avatar.jpg',
        name: 'Nguyễn Văn Quốc Tuấn',
        position: 'Software Engineer',
        quote: '天上天下 唯我獨尊',
        email: '2152758@gm.uit.edu.vn'
    },
    {
        avatar: '/long-avatar.jpg',
        name: 'Trần Phước Long',
        position: 'Software Engineer',
        quote: 'No Pain No Gain',
        email: '21521103@gm.uit.edu.vn'
    },
    {
        avatar: '/nhat-avatar.jpg',
        name: 'Nguyễn Minh Nhật',
        position: 'Software Engineer',
        quote: 'Sống ở đời...',
        email: '21522419@gm.uit.edu.vn'
    }
];

const LandingPage = () => {
    return (
        <div id='home' className='w-full'>
            {/* Hero */}
            <div className='relative text-center'>
                <Image
                    src={'/hero-background.png'}
                    alt='hero-background'
                    width={1920}
                    height={1080}
                    style={{}}
                />
                <div className='absolute top-[30%] w-full'>
                    <p className='text-6xl'>Efficiency</p>
                    <p className='text-6xl'>Unleashed</p>
                    <p className='text-6xl'>Flavor</p>
                    <p className='text-6xl'>Elevated</p>
                    <p className='mt-8'>
                        Your Restaurant, Our Management Excellence!
                    </p>
                </div>
            </div>

            {/* Services */}
            <div id='services' className='pb-20 pt-28 text-center'>
                <h2 className='text-7xl'>Our Services</h2>
                <div className='mt-20 flex w-full items-center justify-center gap-10'>
                    {services.map((service, index) => {
                        return (
                            <div
                                key={index}
                                className='w-[20%] rounded px-6 py-10 outline outline-1 outline-[#fde68a]'
                            >
                                {/* icon */}
                                <div className='inline-block rounded-full bg-[#fde68a] p-4'>
                                    {service.icon}
                                </div>

                                {/* title */}
                                <h3 className='mt-4 text-4xl font-semibold'>
                                    {service.title}
                                </h3>

                                {/* description */}
                                <p className='mt-4'>{service.desscription}</p>

                                {/* button */}
                                <div className='mt-4 font-semibold text-[#AD343E]'>
                                    Explore Now
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* About */}
            <div id='about' className='flex bg-[#F9F9F7] px-20 pb-20 pt-28'>
                {/* Image */}
                <div className='relative flex-1'>
                    <Image
                        src={'/about-image.png'}
                        alt='about-image'
                        width={500}
                        height={800}
                        className='rounded-3xl shadow-2xl'
                    />

                    {/* Card */}
                    <div className='absolute bottom-[-28px] right-32 inline-block rounded-lg bg-[#474747] p-10 text-white shadow-2xl'>
                        <h3 className='text-lg font-bold'>Come and visit us</h3>
                        <ul className='mt-6'>
                            <li className='mt-4 flex'>
                                <BsTelephone size={20} />
                                <p className='ml-2'>(081) 3993353</p>
                            </li>
                            <li className='mt-4 flex'>
                                <FiMail size={20} />
                                <p className='ml-2'>
                                    cheesebistro@restaurant.com
                                </p>
                            </li>
                            <li className='mt-4 flex'>
                                <TfiLocationPin size={20} />
                                <p className='ml-2'>
                                    District 1, Ho Chi Minh city, Vietnam
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Content */}
                <div className='flex-1'>
                    <h2 className='text-5xl font-bold'>
                        The Big Cheese of Flavor
                    </h2>
                    <p className='mt-10 font-semibold'>
                        Introducing the Cheese Bistro Restaurant Management
                        System, a sophisticated solution catering to diverse
                        operational needs. With a focus on seamless user
                        experiences, our system offers robust features such as
                        secure authentication, user management with role-based
                        permissions, efficient food and order handling, and
                        streamlined inventory and timekeeping management. From
                        creating and updating food items to assigning and
                        tracking staff schedules, this system ensures precision
                        and simplicity.
                    </p>
                    <p className='mt-10'>
                        Cheese Bistro can now elevate its business operations,
                        providing an unparalleled dining experience through
                        enhanced menu control, order accuracy, and optimized
                        staff management. Welcome to a new era of restaurant
                        efficiency and customer satisfaction.
                    </p>

                    {/* Actions */}
                    <div className='mt-10'>
                        <Button className='rounded-3xl bg-white text-black outline outline-1 outline-black hover:bg-black hover:text-white'>
                            <a href='#contact'>More About Us</a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div id='contact' className='pb-20 pt-28'>
                <h2 className='text-center text-7xl'>About Us</h2>

                {/* Cards */}
                <div className='mt-10 flex w-full items-center justify-center gap-28'>
                    {/* Card */}
                    {profiles.map((profile, index) => {
                        return (
                            <div
                                key={index}
                                className='rounded-3xl px-16 py-10 text-center shadow-2xl'
                            >
                                <Image
                                    src={profile.avatar}
                                    alt='long-avatar'
                                    width={200}
                                    height={300}
                                    className='rounded-full outline outline-4 outline-[#fde68a]'
                                />

                                <p className='mt-8 font-bold'>{profile.name}</p>

                                <p className='mt-2'>{profile.position}</p>

                                <p className='mt-2'>
                                    &quot;{profile.quote}&quot;
                                </p>

                                <div className='mt-8 rounded-md bg-[#26235C] p-2'>
                                    <p className='text-white'>
                                        {profile.email}
                                    </p>
                                </div>

                                {/* Social */}
                                <ul className='mt-4 flex w-full justify-center gap-4 text-[#26235C]'>
                                    <li>
                                        <BsInstagram size={30} />
                                    </li>
                                    <li>
                                        <BsTwitter size={30} />
                                    </li>
                                    <li>
                                        <BsLinkedin size={30} />
                                    </li>
                                    <li>
                                        <BsGithub size={30} />
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
