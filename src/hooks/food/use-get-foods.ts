'use client';
import { useEffect } from 'react';

import { useGetFoodsQuery} from "@/redux/services/food-api"



export const useGetAllFoods = () => {
    const { 
        data: foods, 
        error: foodsError, 
        isLoading: isFoodsLoading, 
        isError: isFoodsError, 
        isFetching: isFoodsFetching, 
        isSuccess: isFoodsSuccess } = useGetFoodsQuery(undefined, {
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