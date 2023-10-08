"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Categories } from "@/components/category/categories"
import { SearchInput } from "@/components/search-input"
import { FoodList } from "@/app/(page)/(root)/(admin)/_components/food-list"
import { categories, foodList } from "@/utils/fake-data"
import { FoodFilter } from "@/components/food-filter"

interface SearchFoodProps {
    searchParams: {
        food: string,
        categoryId: string,
    }
}

const FoodMenu = ({ searchParams }: SearchFoodProps) => {
    return (
        <>
            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput />
            </div>
            <div className="p-6">
                <div className="p-6 space-y-4">
                    <div className="flex flex-row justify-between items-center">
                        <Categories items={categories} />
                        <Link href="/owner/create-food">
                            <Button>
                                NEW FOOD
                            </Button>
                        </Link>
                    </div>
                    <FoodList items={foodList} />
                </div>

            </div>
        </>
    )
}

export default FoodMenu