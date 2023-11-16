import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { IngredientType } from '@/types';

const ingredientAdapter = createEntityAdapter<IngredientType>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (ingredient) => ingredient.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = ingredientAdapter.getInitialState();

export const ingredientApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIngredients: builder.query<EntityState<IngredientType>, void>({
            query: () => '/ingredients',
            transformResponse(response: { message: string; data: IngredientType[] }) {
                return ingredientAdapter.setAll(initialState, response.data);
            },
            // highlight-start
            providesTags: (result) =>
                result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'Ingredient' as const,
                              id
                          })),
                          { type: 'Ingredient', id: 'LIST' }
                      ]
                    : [{ type: 'Ingredient', id: 'LIST' }]
            // highlight-end
        }),
       
    })
});

export const {
    useGetIngredientsQuery,
} = ingredientApi;

// returns the query result object
export const selectIngredientResult = ingredientApi.endpoints.getIngredients.select();

// creates memoized selector
const selectIngredientsData = createSelector(
    selectIngredientResult,
    (ingredientResult) => ingredientResult.data // normalized state object with ids & entities
);

export const { selectAll: selectIngredients, selectById: selectIngredientById } =
   ingredientAdapter.getSelectors(
        (state: any) => selectIngredientsData(state) ?? initialState
    );
