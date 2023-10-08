export type Product = {
    name: string;
    description: string;
    categoryId: string;
    image: string;
    price: number;
    quantity: number;
    isInStock: boolean;
    isSelling: boolean;
};

export type Category = {
    id: string;
    name: string;
};
