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

export type InventoryType = {
    id: string,
    ingredient: {
        id: string,
        name: string,
        ingredientType: number
    }
    quantity: number
}

export type Category = {
    id: string;
    name: string;
};
