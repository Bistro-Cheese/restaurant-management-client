export type Ingredient = {
    id: number;
    name: string;
    ingredientType: number;
};

type Inventory = {
    id: string;
    ingredientName: string;
    supplier: string;
    totalQuantity: number;
    unit: string;
};

export default Inventory;
