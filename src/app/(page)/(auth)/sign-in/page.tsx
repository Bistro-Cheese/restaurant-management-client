'use client';

import SignInForm from '../_components/sign-in-form';

const SignIn = () => {
    return (
        <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            <SignInForm />
        </div>
    );
};

export default SignIn;
