import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { FoodType } from '@/types';
import { RootState } from '../store';

const foodsAdapter = createEntityAdapter<FoodType>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (food) => food.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = foodsAdapter.getInitialState();

export const foodsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchFoods: builder.query<EntityState<FoodType>, string>({
            query: (pathUrl) => `/foods/search${pathUrl}`,
            transformResponse(response: any) {
                return foodsAdapter.setAll(initialState, response.content);
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'Food' as const,
                              id
                          })),
                          { type: 'Food', id: 'LIST' }
                      ]
                    : [{ type: 'Food', id: 'LIST' }]
        }),
        addNewFood: builder.mutation({
            query: (initialFoodData) => ({
                url: '/foods',
                method: 'POST',
                body: {
                    ...initialFoodData
                }
            }),
            invalidatesTags: [{ type: 'Food', id: 'LIST' }]
        }),
        updateFood: builder.mutation({
            query: ({ food_id, data }) => ({
                url: `/foods/${food_id}`, // pass the id parameter into the URL
                method: 'PUT',
                body: {
                    ...data
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Food', id: arg.id }
            ]
        }),
        deleteFood: builder.mutation({
            query: (food_id) => ({
                url: `/foods/${food_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Food', id: arg.id }
            ]
        })
    })
});

export const {
    useSearchFoodsQuery,
    useAddNewFoodMutation,
    useUpdateFoodMutation,
    useDeleteFoodMutation
} = foodsApi;

// returns the query result object
export const selectFoodsResult = foodsApi.endpoints.searchFoods.select('');

// creates memoized selector
const selectFoodsData = createSelector(
    selectFoodsResult,
    (foodsResult) => foodsResult.data // normalized state object with ids & entities
);

export const { selectAll: selectAllFoods, selectById: selectFoodById } =
    foodsAdapter.getSelectors(
        (state: RootState) => selectFoodsData(state) ?? initialState
    );
