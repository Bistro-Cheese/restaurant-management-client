import { EntityId } from '@reduxjs/toolkit';

export type Category = {
    id: string;
    name: string;
};

type Food = {
    id: EntityId;
    name: string;
    description: string;
    category: Category;
    image: string;
    price: string;
    status: string;
};

export default Food;
