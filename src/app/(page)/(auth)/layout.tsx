import { AuthenticateLayout } from '@/hoc/authenticate-layout';
import React from 'react';

const AuthLayout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <div className='flex flex-col justify-center bg-background'>
            <div className='mx-auto w-full max-w-md'>
                <AuthenticateLayout>{children}</AuthenticateLayout>
            </div>
        </div>
    );
};

export default AuthLayout;
