'use client';
import { useCreateTableMutation } from '@/redux/services/table-api';

export const useCreateTable = () => {
    const [
        createTable,
        {
            isLoading: isCreateTableLoading,
            isSuccess: isCreateTableSuccess,
            isError: isCreateTableError,
            data: createTableData,
            error: createTableError
        }
    ] = useCreateTableMutation();

    return {
        createTable,
        isCreateTableLoading,
        isCreateTableSuccess,
        isCreateTableError,
        createTableData,
        createTableError
    };
};
