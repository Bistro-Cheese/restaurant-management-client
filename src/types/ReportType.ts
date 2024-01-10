export type MonthlyReportType = {
    id: string;
    month: number;
    year: number;
    revenue: number;
    numOfCustomers: number;
    numOfOrders: number;
};

export type YearlyReportType = {
    id: string;
    year: number;
    revenue: number;
    numOfCustomers: number;
    numOfOrders: number;
};

export type DailyReportType = {
    id: string;
    date: string;
    revenue: number;
    numOfCus: number;
    numOfOrders: number;
};
