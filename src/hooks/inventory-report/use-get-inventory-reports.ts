import { useGetInventoryReportsQuery } from '@/redux/services/inventory-report-api';

const useGetAllInventoryReports = ({ date }: { date: string }) => {
    const {
        data: inventoryReports,
        isLoading: isInventoryReportsLoading,
        isSuccess: isInventoryReportsSuccess,
        isError: isInventoryReportError,
        error: inventoryReportError,
        isFetching: isInventoryReportsFetching
    } = useGetInventoryReportsQuery(date, {
        pollingInterval: 300000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    return {
        inventoryReports,
        isInventoryReportsLoading,
        isInventoryReportsSuccess,
        isInventoryReportError,
        inventoryReportError,
        isInventoryReportsFetching
    };
};

export default useGetAllInventoryReports;
