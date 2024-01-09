import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { DiscountType } from '@/types';
import { RootState } from '../store';

const discountsAdapter = createEntityAdapter<DiscountType>({
    selectId: (discount) => discount.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = discountsAdapter.getInitialState();

export const discountsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDiscounts: builder.query<EntityState<DiscountType>, void>({
            query: () => '/discounts',
            transformResponse(response: {
                code: any;
                message: string;
                data: DiscountType[];
            }) {
                return discountsAdapter.setAll(initialState, response.data);
            },
            // highlight-start
            providesTags: (result) =>
                result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'Discount' as const,
                              id
                          })),
                          { type: 'Discount', id: 'LIST' }
                      ]
                    : [{ type: 'Discount', id: 'LIST' }]
            // highlight-end
        }),
        createNewDiscount: builder.mutation({
            query: (initialUserData) => ({
                url: '/discounts',
                method: 'POST',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: [{ type: 'Discount', id: 'LIST' }]
        }),
        updateDiscount: builder.mutation({
            query: ({ discount_id, data }) => ({
                url: `/discounts/${discount_id}`,
                method: 'PUT',
                body: {
                    ...data
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Discount', id: arg.id }
            ]
        }),
        deleteDiscount: builder.mutation({
            query: ({ discount_id }) => ({
                url: `/discounts/${discount_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Discount', id: arg.id }
            ]
        })
    })
});

export const {
    useGetDiscountsQuery,
    useCreateNewDiscountMutation,
    useUpdateDiscountMutation,
    useDeleteDiscountMutation
} = discountsApi;

// returns the query result object
export const selectDiscountsResult =
    discountsApi.endpoints.getDiscounts.select();

// creates memoized selector
const selectDiscountsData = createSelector(
    selectDiscountsResult,
    (discountsResult) => discountsResult.data // normalized state object with ids & entities
);

export const { selectAll: selectAllDiscounts, selectById: selectDiscountById } =
    discountsAdapter.getSelectors(
        (state: RootState) => selectDiscountsData(state) ?? initialState
    );
