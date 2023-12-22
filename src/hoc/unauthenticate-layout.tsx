'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export const UnauthenticateLayout = ({ children }: { children: React.ReactNode }) => {
    const { status } = useAuth();
    const [canRenderChildren, setCanRenderChildren] = useState(false)


    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/sign-in');
        }
        if (status === 'authenticated') {
            setCanRenderChildren(true)
        }
    }, [status]);


    return canRenderChildren && <div>{children}</div>;
};
