'use client';
import { useEffect } from 'react';

import {
    useGetFoodsQuery,
    useSearchFoodsQuery
} from '@/redux/services/food-api';

export const useGetAllFoods = () => {
    const {
        data: foods,
        error: foodsError,
        isLoading: isFoodsLoading,
        isError: isFoodsError,
        isFetching: isFoodsFetching,
        isSuccess: isFoodsSuccess
    } = useSearchFoodsQuery('', {
        pollingInterval: 120000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    console.log('FOODQUERY:::', foods);

    return {
        foods,
        foodsError,
        isFoodsLoading,
        isFoodsError,
        isFoodsFetching,
        isFoodsSuccess
    };
};
