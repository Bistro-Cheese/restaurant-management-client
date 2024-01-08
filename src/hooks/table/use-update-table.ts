'use client';
import { useUpdateTableMutation } from '@/redux/services/table-api';

export const useUpdateTable = () => {
    const [
        updateTable,
        {
            isLoading: isUpdateTableLoading,
            isSuccess: isUpdateTableSuccess,
            isError: isUpdateTableError,
            data: updateTableData,
            error: updateTableError
        }
    ] = useUpdateTableMutation();

    return {
        updateTable,
        isUpdateTableLoading,
        isUpdateTableSuccess,
        isUpdateTableError,
        updateTableData,
        updateTableError
    };
};
