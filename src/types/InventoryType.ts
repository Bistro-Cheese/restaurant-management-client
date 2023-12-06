export type Ingredient = {
    id: number;
    name: string;
    ingredientType: number;
};

type Inventory = {
    id: string;
    ingredient: Ingredient;
    quantity: number;
};

export default Inventory;
