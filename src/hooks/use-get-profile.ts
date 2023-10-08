'use client';
import { useEffect } from 'react';

import { useGetProfileQuery } from '@/redux/services/user-api';
import { useAppDispatch } from './redux-hook';
import { setProfile } from '@/redux/features/user-slice';

import { useRouter } from 'next/navigation';

export const useGetProfile = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetProfileQuery();

    console.log('GET PROFILE:::', data);
    useEffect(() => {
        if (data?.data) {
            dispatch(
                setProfile({ status: 'authenticated', userInfo: data.data })
            );
        }
    }, [data, dispatch]);
    return {
        data,
        isLoading
    };
};
