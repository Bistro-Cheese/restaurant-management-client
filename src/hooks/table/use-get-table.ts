'use client';
import { useGetTablesQuery } from '@/redux/services/table-api';

export const useGetAllTables = () => {
    const {
        data: getTablesData,
        isLoading: isTablesLoading,
        isSuccess: isTablesSuccess,
        isError: isTablesError
    } = useGetTablesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    return {
        getTablesData,
        isTablesLoading,
        isTablesSuccess,
        isTablesError
    };
};
