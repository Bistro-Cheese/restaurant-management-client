'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export const AuthenticateLayout = ({ children }: { children: React.ReactNode }) => {
    const { status } = useAuth();
    const router = useRouter()
    const [canRenderChildren, setCanRenderChildren] = useState(false)

    useEffect(() => {
        setCanRenderChildren(true)
        if (status === 'authenticated') {
            router.push('/auth')
        } else {
            router.push('/sign-in');
        }
    }, [status, router]);

    return canRenderChildren && <>{children}</>;
};
