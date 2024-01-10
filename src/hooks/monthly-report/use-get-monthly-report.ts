import { useGetMonthlyReportQuery } from '@/redux/services/monthly-report-api';

const useGetMonthlyReport = ({ year }: { year: string }) => {
    const {
        data: monthlyReports,
        isLoading: isMonthlyReportsLoading,
        isSuccess: isMonthlyReportsSuccess,
        isError: isMonthlyReportError,
        error: monthlyReportError,
        isFetching: isMonthlyReportsFetching
    } = useGetMonthlyReportQuery(year, {
        pollingInterval: 300000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    return {
        monthlyReports,
        isMonthlyReportsLoading,
        isMonthlyReportsSuccess,
        isMonthlyReportError,
        monthlyReportError,
        isMonthlyReportsFetching
    };
};

export default useGetMonthlyReport;
