import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { DailyReportType, FoodType } from '@/types';
import { RootState } from '../store';

const dailyReportAdapter = createEntityAdapter<DailyReportType>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (report) => report.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.id.localeCompare(b.id)
});

const initialState = dailyReportAdapter.getInitialState();

export const dailyReportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDailyReport: builder.query<EntityState<DailyReportType>, string>({
            query: (date) => ({
                url: `/report/daily-report`,
                body: { date: date }
            }),
            transformResponse(response: any) {
                return dailyReportAdapter.setAll(initialState, response.data);
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'DailyReport' as const,
                              id
                          })),
                          { type: 'DailyReport', id: 'LIST' }
                      ]
                    : [{ type: 'DailyReport', id: 'LIST' }]
        })
    })
});

export const { useGetDailyReportQuery } = dailyReportApi;

// returns the query result object
export const selectDailyReportResult =
    dailyReportApi.endpoints.getDailyReport.select('');

// creates memoized selector
const selectDailyReportData = createSelector(
    selectDailyReportResult,
    (report) => report.data // normalized state object with ids & entities
);

export const {
    selectAll: selectAllDailyReport,
    selectById: selectDailyReportById
} = dailyReportAdapter.getSelectors(
    (state: RootState) => selectDailyReportData(state) ?? initialState
);
