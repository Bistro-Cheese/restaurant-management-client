type IngredientType = {
    id: number;
    name: string;
    ingredientType: number;
    supplier: string;
    unit: string;
};

type InventoryType = {
    id: string;
    ingredient: IngredientType;
    totalQuantity: number;
};

type OperationType = {
    id: string;
    inventory: InventoryType;
    quantity: number;
    type: number;
    createdAt: string;
};

export default OperationType;
