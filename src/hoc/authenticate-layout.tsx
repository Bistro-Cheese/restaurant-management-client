'use client';

import { useEffect, useState } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export const AuthenticateLayout = ({ children }: { children: React.ReactNode }) => {
    const { status } = useAuth();
    const router = useRouter()
    const pathName = usePathname()
    const [canRenderChildren, setCanRenderChildren] = useState(false)

    useEffect(() => {
        setCanRenderChildren(true)
        if (status === 'authenticated') {
            router.push('/auth')
        } else {
            router.push('/sign-in');
        }
    }, [status, router]);

    return canRenderChildren && <div>{children}</div>;
};
