'use client';
import { useEffect } from 'react';

import { useGetProfileQuery } from '@/redux/services/user-api';
import { useAppDispatch } from './redux-hook';
import { setProfile } from '@/redux/features/user-slice';

export const useGetProfile = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetProfileQuery();

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
