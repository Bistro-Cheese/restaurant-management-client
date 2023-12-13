import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { TableType } from '@/types';

const tablesAdapter = createEntityAdapter<TableType>({
    selectId: (table) => table.tableNumber,
    sortComparer: (a, b) =>
        a.tableNumber.toString().localeCompare(b.tableNumber.toString())
});

const initialState = tablesAdapter.getInitialState();

export const tablesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTables: builder.query<EntityState<TableType>, void>({
            query: () => '/tables',
            transformResponse(response: {
                code: any;
                message: string;
                data: TableType[];
            }) {
                return tablesAdapter.setAll(initialState, response.data);
            },
            // highlight-start
            providesTags: (result) =>
                result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'Table' as const,
                              id
                          })),
                          { type: 'Table', id: 'LIST' }
                      ]
                    : [{ type: 'Table', id: 'LIST' }]
            // highlight-end
        }),
        createNewTable: builder.mutation({
            query: (initialTableData) => ({
                url: '/tables',
                method: 'POST',
                body: {
                    ...initialTableData
                }
            }),
            invalidatesTags: [{ type: 'Table', id: 'LIST' }]
        }),
        updateTable: builder.mutation({
            query: ({ table_id, data }) => ({
                url: `/tables/${table_id}`, // pass the id parameter into the URL
                method: 'PUT',
                body: {
                    ...data
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Table', id: arg.id }
            ]
        }),
        deleteTable: builder.mutation({
            query: ({ table_id }) => ({
                url: `/tables/${table_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Table', id: arg.id }
            ]
        })
    })
});

export const {
    useGetTablesQuery,
    useCreateNewTableMutation,
    useUpdateTableMutation,
    useDeleteTableMutation
} = tablesApi;

// returns the query result object
export const selectTablesResult = tablesApi.endpoints.getTables.select();

// creates memoized selector
const selectTablesData = createSelector(
    selectTablesResult,
    (tablesResult) => tablesResult.data // normalized state object with ids & entities
);

export const { selectAll: selectAllTables, selectById: selectTableById } =
    tablesAdapter.getSelectors(
        (state: any) => selectTablesData(state) ?? initialState
    );
