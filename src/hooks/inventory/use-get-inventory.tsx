'use client';

import { useGetInventoryQuery } from '@/redux/services/inventory-api';

export const useGetInventory = () => {
    const {
        data: inventory,
        error: inventoryError,
        isLoading: isInventoryLoading,
        isError: isInventoryError,
        isFetching: isInventoryFetching,
        isSuccess: isInventorySuccess } = useGetInventoryQuery(undefined, {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        });

    return {
        inventory,
        inventoryError,
        isInventoryLoading,
        isInventoryError,
        isInventoryFetching,
        isInventorySuccess
    };
};