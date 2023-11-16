"use client"

import { FoodList } from "@/app/(page)/(root)/(admin)/_components/food-list"
import { FoodsFilter } from "@/components/food/foods-filter"
import { useGetAllFoods } from "@/hooks/food/use-get-foods"
import { useGetSearchFoods } from "@/hooks/food/use-get-search-foods"

const FoodMenu = () => {

    const {
        foods,
        isFoodsLoading,
        isFoodsSuccess } = useGetAllFoods()

    const {
        searchParams,
        searchFoods,
        isSearchFoodsLoading,
        isSearchFoodsSuccess } = useGetSearchFoods();

    if (isFoodsLoading) {
        return <div>Loading All Foods...</div>
    }

    if (searchFoods && searchParams.size > 0) {
        const { entities } = searchFoods
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
        console.log("foods:::", foods)
        return (
            <div>
                <div className="p-6">
                    <div className="flex flex-col p-6 gap-y-0 space-y-2">
                        <FoodsFilter />
                    </div>
                    <FoodList items={foods?.entities} />
                </div>
            </div>
        )
    }


}

export default FoodMenu