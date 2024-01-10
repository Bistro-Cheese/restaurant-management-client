import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { DailyReportType, FoodType, MonthlyReportType } from '@/types';
import { RootState } from '../store';

const monthlyReportAdapter = createEntityAdapter<MonthlyReportType>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (report) => report.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.id.localeCompare(b.id)
});

const initialState = monthlyReportAdapter.getInitialState();

export const monthylyReportsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMonthlyReport: builder.query<EntityState<MonthlyReportType>, string>(
            {
                query: (year) => ({
                    url: `/report/monthly-report`,
                    body: { year: year }
                }),
                transformResponse(response: any) {
                    return monthlyReportAdapter.setAll(
                        initialState,
                        response.data
                    );
                },
                providesTags: (result) =>
                    result
                        ? [
                              ...result.ids.map((id) => ({
                                  type: 'MonthlyReport' as const,
                                  id
                              })),
                              { type: 'MonthlyReport', id: 'LIST' }
                          ]
                        : [{ type: 'MonthlyReport', id: 'LIST' }]
            }
        )
    })
});

export const { useGetMonthlyReportQuery } = monthylyReportsApi;

// returns the query result object
export const selectMonthlyReportResult =
    monthylyReportsApi.endpoints.getMonthlyReport.select('');

// creates memoized selector
const selectMonthlyReportData = createSelector(
    selectMonthlyReportResult,
    (report) => report.data // normalized state object with ids & entities
);

export const {
    selectAll: selectAllMonthlyReport,
    selectById: selectMonthlyReportById
} = monthlyReportAdapter.getSelectors(
    (state: RootState) => selectMonthlyReportData(state) ?? initialState
);
