'use client';

import Image from 'next/image';

import SignInForm from '../_components/sign-in-form';

const SignIn = () => {
    return (
        <div className='relative flex h-screen flex-col items-center justify-center'>
            <div className='flex items-center justify-center'>
                <div className='relative h-11 w-11 sm:h-12 sm:w-12 mdl:h-14 mdl:w-14'>
                    <Image
                        src='/cheese-logo.png'
                        alt='cheese logo'
                        fill
                        className='object-contain object-center'
                    />
                </div>
                <span className='ml-4 font-primary text-2xl font-bold text-tertiary sm:text-4xl mdl:text-5xl'>
                    Cheese Bistro
                </span>
            </div>
            <SignInForm />
            <div className='absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[30%] rounded-full bg-harvest-gold-500 mdl:h-48 mdl:w-48 mdl:blur-2xl'></div>
        </div>
    );
};

export default SignIn;
