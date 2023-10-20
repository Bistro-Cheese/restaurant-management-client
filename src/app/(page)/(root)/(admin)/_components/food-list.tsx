"use client"

import { FoodCard } from "@/components/food/food-card";
import { FoodType } from "@/types";
import { Dictionary } from "@reduxjs/toolkit";



interface FoodListProps {
    items: any;
}
export const FoodList = ({ items }: FoodListProps) => {

    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {Object.keys(items).map((item, id) => {
                    return (
                        <FoodCard
                            key={items[item].id}
                            category={items[item].categoryId}
                            id={items[item].id}
                            name={items[item].name}
                            price={items[item].price}
                        />
                    )
                })}
                {/* {items.forEach((item: any) => (
                    <FoodCard
                        key={item.id}
                        category={item.categoryId}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                    />
                ))} */}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No Foods found
                </div>
            )}
        </div>
    )
}