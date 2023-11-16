export type FoodType = {
    id: string;
    name: string;
    description: string;
    category: {
        id: string;
        name: string;
    };
    productImage: string;
    price: string;
    status: string;
};

export type IngredientType = {
    id: number,
    name: string,
    ingredientType: number
}

export type InventoryType = {
    id: string,
    ingredient: IngredientType
    quantity: number
}

export type Category = {
    id: string;
    name: string;
};
