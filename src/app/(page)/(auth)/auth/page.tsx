'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { paths } from '@/constants/routes';

import { useGetProfile } from '@/hooks/use-dispatch-user';

const AuthScreen = () => {
    const { data, isLoading } = useGetProfile();

    const router = useRouter();

    useEffect(() => {
        if (data && !isLoading) {
            switch (data?.data?.role) {
                case 'owner':
                    router.push(paths.owner.dashboard);
                    break;
                case 'manager':
                    router.push(paths.manager.timekeeping);
                    break;
                case 'staff':
                    router.push(paths.staff.tables);
                    break;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isLoading]);

    if (isLoading) return <div>Loading...</div>;
};

export default AuthScreen;
