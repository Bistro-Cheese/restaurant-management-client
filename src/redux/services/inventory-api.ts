import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { InventoryType } from '@/types';

const inventoryAdapter = createEntityAdapter<InventoryType>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (Inventory) => Inventory.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.ingredient.name.localeCompare(b.ingredient.name)
});

const initialState = inventoryAdapter.getInitialState();

export const inventoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInventory: builder.query<EntityState<InventoryType>, void>({
            query: () => '/inventory',
            transformResponse(response: { message: string; data: InventoryType[] }) {
                return inventoryAdapter.setAll(initialState, response.data);
            },
            // highlight-start
            providesTags: (result) =>
                result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'Inventory' as const,
                              id
                          })),
                          { type: 'Inventory', id: 'LIST' }
                      ]
                    : [{ type: 'Inventory', id: 'LIST' }]
            // highlight-end
        }),
        importInventory: builder.mutation<any, {ingredient_id: number, payload: {quantity: number}}>({
            query: ({ingredient_id, payload}) => ({
                url: `/inventory/${ingredient_id}`,
                method: 'POST',
                body: {
                    ...payload
                }
            }),
            invalidatesTags: [{ type: 'Inventory', id: 'LIST' }]
        }),
       
    })
});

export const {
    useGetInventoryQuery,
    useImportInventoryMutation
} = inventoryApi;

// returns the query result object
export const selectInventoryResult = inventoryApi.endpoints.getInventory.select();

// creates memoized selector
const selectInventoryData = createSelector(
    selectInventoryResult,
    (inventoryResult) => inventoryResult.data // normalized state object with ids & entities
);

export const { selectAll: selectInventory, selectById: selectInventoryById } =
   inventoryAdapter.getSelectors(
        (state: any) => selectInventoryData(state) ?? initialState
    );
