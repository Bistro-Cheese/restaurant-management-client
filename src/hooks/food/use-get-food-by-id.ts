'use client';

import { useGetFoodByIdQuery } from '@/redux/services/food-api';

export const useGetFoodById = (foodId: string) => {
    const {
        data: food,
        error: foodError,
        isLoading: isGetFoodByIdLoading,
        isSuccess: isGetFoodByIdSuccess
    } = useGetFoodByIdQuery(foodId, {
        pollingInterval: 120000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    return {
        food,
        foodError,
        isGetFoodByIdLoading,
        isGetFoodByIdSuccess
    };
};
