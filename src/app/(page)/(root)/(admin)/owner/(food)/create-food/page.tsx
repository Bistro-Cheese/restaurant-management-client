"use client";

import { categories } from "@/utils/fake-data";
import { FoodForm } from "../../_components/create-food-form";

const CreateFood = () => {

    const initialData = null

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <FoodForm categories={categories} initialData={initialData} />
            </div>
        </div>

    );
};

export default CreateFood;
