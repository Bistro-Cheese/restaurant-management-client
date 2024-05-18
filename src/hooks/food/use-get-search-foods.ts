'use client';

import { useSearchFoodsQuery } from '@/redux/services/food-api';
import { useEffect, useState } from 'react';
import { useGetParams } from '../use-get-params';

import qs from 'query-string';

export const useGetSearchFoods = () => {
    const [requestParams, setRequestParams] = useState<string>('');

    const {
        searchParams,
        category,
        name,
        sortCase,
        isAscSort,
        fromPrice,
        toPrice
    } = useGetParams();

    const {
        data: searchFoods,
        error: searchFoodsError,
        isLoading: isSearchFoodsLoading,
        isError: isSearchFoodsError,
        isFetching: isSearchFoodsFetching,
        isSuccess: isSearchFoodsSuccess,
        refetch: refetchSearchFoods
    } = useSearchFoodsQuery(requestParams);

    useEffect(() => {
        if (searchParams.size > 0) {
            const url = qs.stringifyUrl(
                {
                    url: '',
                    query: {
                        category: category,
                        name: name,
                        sortCase: sortCase,
                        fromPrice: fromPrice,
                        toPrice: toPrice,
                        isAscSort: isAscSort
                    }
                },
                { skipNull: true, skipEmptyString: true }
            );
            setRequestParams(url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return {
        searchParams,
        searchFoods,
        searchFoodsError,
        isSearchFoodsLoading,
        isSearchFoodsError,
        isSearchFoodsFetching,
        isSearchFoodsSuccess,
        refetchSearchFoods
    };
};
