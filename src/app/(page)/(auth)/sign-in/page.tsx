'use client';

import Image from 'next/image';

import SignInForm from '../_components/sign-in-form';

const SignIn: React.FC = () => {
    return (
        <div className='relative flex h-screen flex-col items-center justify-center px-6 lg:px-8'>
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
            {/* <div className='absolute -left-[40%] -top-[5%] h-72 w-72 rounded-full bg-primary opacity-10 blur-2xl mdl:h-96 mdl:w-96'></div>
            <div className='absolute -right-[40%] -top-[5%] h-72 w-72 rounded-full bg-tertiary opacity-10 blur-2xl mdl:h-96 mdl:w-96'></div>
            <div className='absolute left-[50%] top-[60%] h-80 w-80 -translate-x-[60%] rounded-full bg-secondary opacity-10 blur-2xl mdl:h-96 mdl:w-96'></div> */}
        </div>
    );
};

export default SignIn;
