'use client';

import { useSearchFoodsQuery } from '@/redux/services/food-api';

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

    return {
        foods,
        foodsError,
        isFoodsLoading,
        isFoodsError,
        isFoodsFetching,
        isFoodsSuccess
    };
};
