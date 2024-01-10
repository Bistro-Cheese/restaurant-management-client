type InventoryReportType = {
    id: string;
    ingredientName: string;
    supplier: string;
    unit: string;
    quantity: number;
    importQuantity: number;
    exportQuantity: number;
    operationDate: string;
};

export default InventoryReportType;
