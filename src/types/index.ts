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

export type Category = {
    id: string;
    name: string;
};
