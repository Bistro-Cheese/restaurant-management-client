"use client"

import { FoodList } from "@/app/(page)/(root)/(admin)/_components/food-list"
import { foodList } from "@/utils/fake-data"
import { FoodsFilter } from "@/components/food/foods-filter"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useGetFoodsQuery } from "@/redux/services/food-api"
import { useEffect } from "react"

// interface SearchFoodProps {
//     searchParams: {
//         food: string,
//         categoryId: string,
//     }
// }

const FoodMenu = () => {
    const { data: foods, isLoading, isSuccess } = useGetFoodsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    console.log("FOODDATA:::", foods)

    if (isLoading) {
        return <div>Loading All Foods...</div>
    }

    if (isSuccess) {
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