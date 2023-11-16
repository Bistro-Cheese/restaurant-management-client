'use client';

import { useSearchFoodsQuery } from "@/redux/services/food-api";
import { useEffect, useState } from "react";
import { useGetParams } from "../use-get-params";

import qs from "query-string"

export const useGetSearchFoods = () => {
    const [requestParams, setRequestParams] = useState<string>("")
    console.log("requestParams:::", requestParams)

    const {
        searchParams,
        category,
        searchKey,
        sortCase,
        isAscSort,
        minPrice,
        maxPrice
    } = useGetParams()

    console.log("searchParams:::", searchParams.size)

    const { 
        data: searchFoods, 
        error:searchFoodsError, 
        isLoading: isSearchFoodsLoading, 
        isError: isSearchFoodsError, 
        isFetching: isSearchFoodsFetching,
        isSuccess: isSearchFoodsSuccess,
     } = useSearchFoodsQuery(requestParams);
    console.log("searchFoods:::", searchFoods)

    useEffect(() => {
        if (searchParams.size > 0) {
            const url = qs.stringifyUrl({
                url: "",
                query: {
                    category: category,
                    search_key: searchKey,
                    sort_case: sortCase,
                    min_price: minPrice,
                    max_price: maxPrice,
                    is_asc_sort: isAscSort
                }
            }, { skipNull: true, skipEmptyString: true });
            console.log("url:::", url)
            setRequestParams(url)
        }
    }, [searchParams])

    
    return {
        searchParams,
        searchFoods, 
        searchFoodsError, 
        isSearchFoodsLoading, 
        isSearchFoodsError, 
        isSearchFoodsFetching, 
        isSearchFoodsSuccess
    };
};