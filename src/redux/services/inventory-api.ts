import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { InventoryType } from '@/types';
import OperationType from '@/types/OperationType';

const inventoryAdapter = createEntityAdapter<InventoryType>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (Inventory) => Inventory.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.ingredientName.localeCompare(b.ingredientName)
});

const operationAdapter = createEntityAdapter<OperationType>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (Operation) => Operation.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt)
});

const initialInventoryState = inventoryAdapter.getInitialState();
const initialOperationState = operationAdapter.getInitialState();

export const inventoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInventory: builder.query<EntityState<InventoryType>, void>({
            query: () => '/inventory',
            transformResponse(response: {
                pageable: Object;
                content: InventoryType[];
            }) {
                return inventoryAdapter.setAll(
                    initialInventoryState,
                    response.content
                );
            },
            providesTags: (result) => {
                return result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'Inventory' as const,
                              id
                          })),
                          { type: 'Inventory', id: 'LIST' }
                      ]
                    : [{ type: 'Inventory', id: 'LIST' }];
            }
        }),

        updateStock: builder.mutation({
            query: (body) => ({
                url: '/inventory/stock',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Inventory', id: 'LIST' }]
        }),

        getOperations: builder.query<EntityState<OperationType>, void>({
            query: () => '/inventory/operations',
            transformResponse(response: { data: OperationType[] }) {
                return operationAdapter.setAll(
                    initialOperationState,
                    response.data
                );
            },
            providesTags: (result) => {
                return result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'Inventory' as const,
                              id
                          })),
                          { type: 'Inventory', id: 'LIST' }
                      ]
                    : [{ type: 'Inventory', id: 'LIST' }];
            }
        })
    })
});

export const {
    useGetInventoryQuery,
    useUpdateStockMutation,
    useGetOperationsQuery
} = inventoryApi;

// returns the query result object
export const selectInventoryResult =
    inventoryApi.endpoints.getInventory.select();

// creates memoized selector
const selectInventoryData = createSelector(
    selectInventoryResult,
    (inventoryResult) => inventoryResult.data // normalized state object with ids & entities
);

export const { selectAll: selectInventory, selectById: selectInventoryById } =
    inventoryAdapter.getSelectors(
        (state: any) => selectInventoryData(state) ?? initialInventoryState
    );

export const selectOperationsResult =
    inventoryApi.endpoints.getOperations.select();

const selectOperationsData = createSelector(
    selectOperationsResult,
    (operationsResult) => operationsResult.data
);

export const { selectAll: selectOperations, selectById: selectOperationById } =
    operationAdapter.getSelectors(
        (state: any) => selectOperationsData(state) ?? initialOperationState
    );
