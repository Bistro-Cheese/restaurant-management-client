import { useUpdateStockMutation } from '@/redux/services/inventory-api';

export const useUpdateStock = () => {
    const [
        updateStock,
        {
            data: updateStockData,
            error: updateStockError,
            isLoading: isUpdateStockLoading,
            isError: isUpdateStockError,
            isSuccess: isUpdateStockSuccess
        }
    ] = useUpdateStockMutation();

    return {
        updateStock,
        updateStockData,
        updateStockError,
        isUpdateStockLoading,
        isUpdateStockError,
        isUpdateStockSuccess
    };
};
