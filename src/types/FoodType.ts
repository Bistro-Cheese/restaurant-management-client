import { EntityId } from '@reduxjs/toolkit';

export type Category = {
    id: string;
    name: string;
};

type Food = {
    id: string;
    name: string;
    description: string;
    category: Category;
    image: string;
    price: number;
    status: string;
};

export default Food;
