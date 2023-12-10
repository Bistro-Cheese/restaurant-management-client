'use client';
import {
    useGetTablesQuery,
    useSearchTablesQuery
} from '@/redux/services/table-api';

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

    console.log('TABLEQUERY:::', tables);

    return {
        tables,
        isTablesLoading,
        isTablesSuccess
    };
};
