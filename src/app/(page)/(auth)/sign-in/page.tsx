'use client';

import Image from 'next/image';

import SignInForm from '../_components/sign-in-form';

const SignIn = () => {
    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <div className='flex items-center justify-center'>
                <Image
                    src='/cheese-logo.png'
                    alt='cheese logo'
                    width={50}
                    height={50}
                />
                <h2 className='ml-4 text-5xl font-bold tracking-tight text-gray-900'>
                    Cheese Bistro
                </h2>
            </div>
            <SignInForm />
        </div>
    );
};

export default SignIn;
