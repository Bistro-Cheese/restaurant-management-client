export type FoodType = {
    id: string;
    name: string;
    description: string;
    category: {
        id: string;
        name: string;
    };
    product_image: string;
    price: string;
    status: string;
};

export type Category = {
    id: string;
    name: string;
};
