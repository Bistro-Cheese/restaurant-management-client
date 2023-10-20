"use client"

import { FoodCard } from "@/components/food/food-card";

export type FoodProps = {
    id: string
    name: string,
    price: string,
    category: string,
}

interface FoodListProps {
    items: FoodProps[];
}
export const FoodList = ({ items }: FoodListProps) => {

    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <FoodCard
                        key={item.id}
                        category={item.category}
                        id={item.id}
                        name={item.name}
                        price={item.price}

                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No Foods found
                </div>
            )}
        </div>
    )
}