import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { FoodType, InventoryReportType } from '@/types';
import { RootState } from '../store';

const inventoryReportsAdapter = createEntityAdapter<InventoryReportType>({
    selectId: (inventoryReport) => inventoryReport.ingredientName,
    sortComparer: (a, b) => a.ingredientName.localeCompare(b.ingredientName)
});

const initialState = inventoryReportsAdapter.getInitialState();

type InventoryReportsRequest = {
    date: string;
};

export const inventoryReportsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInventoryReports: builder.query<
            EntityState<InventoryReportType>,
            string
        >({
            query: (date) => ({
                url: `/report/inventory-report`,
                // body: {}
                params: { date: date }
            }),
            transformResponse(response: {
                message: string;
                data: InventoryReportType[];
            }) {
                return inventoryReportsAdapter.setAll(
                    initialState,
                    response.data
                );
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'InventoryReport' as const,
                              id
                          })),
                          { type: 'InventoryReport', id: 'LIST' }
                      ]
                    : [{ type: 'InventoryReport', id: 'LIST' }]
        })
    })
});

export const { useGetInventoryReportsQuery } = inventoryReportsApi;

// returns the query result object
export const selectInventoryReportsResult =
    inventoryReportsApi.endpoints.getInventoryReports.select('');

// creates memoized selector
const selectInventoryReportsData = createSelector(
    selectInventoryReportsResult,
    (inventoryReportsResult) => inventoryReportsResult.data // normalized state object with ids & entities
);

export const {
    selectAll: selectAllInventoryReports,
    selectById: selectInventoryReportById
} = inventoryReportsAdapter.getSelectors(
    (state: RootState) => selectInventoryReportsData(state) ?? initialState
);
