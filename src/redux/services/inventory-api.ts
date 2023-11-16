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
       
    })
});

export const {
    useGetInventoryQuery,
} = inventoryApi;

// returns the query result object
export const selectFoodsResult = inventoryApi.endpoints.getInventory.select();

// creates memoized selector
const selectFoodsData = createSelector(
    selectFoodsResult,
    (foodsResult) => foodsResult.data // normalized state object with ids & entities
);

export const { selectAll: selectAllFoods, selectById: selectFoodById } =
   inventoryAdapter.getSelectors(
        (state: any) => selectFoodsData(state) ?? initialState
    );
