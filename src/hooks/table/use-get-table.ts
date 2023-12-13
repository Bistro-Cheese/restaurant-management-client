'use client';
import { useGetTablesQuery } from '@/redux/services/table-api';

export const useGetAllTables = () => {
    const {
        data: tables,
        isLoading: isTablesLoading,
        isSuccess: isTablesSuccess
    } = useGetTablesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    return {
        tables,
        isTablesLoading,
        isTablesSuccess
    };
};
