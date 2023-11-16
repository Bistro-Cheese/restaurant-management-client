"use client"

import { FoodList } from "@/app/(page)/(root)/(admin)/_components/food-list"
import { FoodsFilter } from "@/components/food/foods-filter"
import { useGetParams } from "@/hooks/use-get-params"
import { useGetFoodsQuery, useSearchFoodsQuery } from "@/redux/services/food-api"

import qs from "query-string"
import { useEffect, useState } from "react"


const FoodMenu = () => {


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


    const { data: foods, isLoading: isFoodsLoading, isSuccess: isFoodsSuccess } = useGetFoodsQuery(undefined, {
        pollingInterval: 120000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const { data: searchFoods, isLoading: isSearchFoodsLoading, isSuccess: isSearchFoodsSuccess } = useSearchFoodsQuery(requestParams);
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


    if (isFoodsLoading) {
        return <div>Loading All Foods...</div>
    }

    if (searchFoods && searchParams.size > 0) {
        const { entities } = searchFoods
        console.log("entities:::", entities)
        return (
            <div>
                <div className="p-6">
                    <div className="flex flex-col p-6 gap-y-0 space-y-2">
                        <FoodsFilter />
                    </div>
                    <FoodList items={entities} />
                </div>
            </div>
        )
    }



    if (isFoodsSuccess) {
        const { entities } = foods
        console.log("entities:::", entities)
        return (
            <div>
                <div className="p-6">
                    <div className="flex flex-col p-6 gap-y-0 space-y-2">
                        <FoodsFilter />
                    </div>
                    <FoodList items={entities} />
                </div>
            </div>
        )
    }


}

export default FoodMenu