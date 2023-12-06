import Food from './FoodType';

export type OrderLine = Food & {
    quantity: number;
};

export default OrderLine;
