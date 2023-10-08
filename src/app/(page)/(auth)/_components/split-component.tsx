import Link from 'next/link';
import React from 'react';

type SplitProps = {
    isLogin: boolean;
};

const SplitComponent = (props: SplitProps) => {
    return (
        <div>
            <div
                className="mx-auto my-4 flex w-full items-center justify-evenly 
    before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400
    after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400"
            >
                or
            </div>
            {props.isLogin ? (
                <p className="text-center text-sm text-gray-600 mt-2">
                    If you don&apos;t have an account, please&nbsp;
                    <Link className="text-blue-500 hover:underline" href="/sign-up">
                        Sign up
                    </Link>
                </p>
            ) : (
                <p className="text-center text-sm text-gray-600 mt-2">
                    If you have an account, back to &nbsp;
                    <Link className="text-blue-500 hover:underline" href="/sign-in">
                        Sign In
                    </Link>
                </p>
            )}
        </div>
    );
};

export default SplitComponent;
