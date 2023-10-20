'use client';

import {
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode
} from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface Category {
    id: string,
    name: string
}

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Appetizer": FcMusic,
    "Main Course": FcOldTimeCamera,
    "Drink": FcSportsMode,
    "Dessert": FcSalesPerformance,
};

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="flex flex-row items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}