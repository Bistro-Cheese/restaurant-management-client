import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { OrderLineType } from '@/types';

const orderLinesAdapter = createEntityAdapter<OrderLineType>({
    selectId: (orderLine) => orderLine.id,
    sortComparer: (a, b) => a.category.id.localeCompare(b.category.id)
});

const initialState = orderLinesAdapter.getInitialState();

export const orderLinesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrderLines: builder.query<EntityState<OrderLineType>, void>({
            query: () => '/orders',
            transformResponse(response: {
                message: string;
                data: OrderLineType[];
            }) {
                return orderLinesAdapter.setAll(initialState, response.data);
            },
            // highlight-start
            providesTags: (result) =>
                result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'Order' as const,
                              id
                          })),
                          { type: 'Order', id: 'LIST' }
                      ]
                    : [{ type: 'Order', id: 'LIST' }]
            // highlight-end
        }),
        createNewOrder: builder.mutation({
            query: (initialOrderData) => ({
                url: '/orders',
                method: 'POST',
                body: {
                    ...initialOrderData
                }
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }]
        }),
        updateOrder: builder.mutation({
            query: ({ order_id, data }) => ({
                url: `/orders/${order_id}`, // pass the id parameter into the URL
                method: 'PUT',
                body: {
                    ...data
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
        deleteOrder: builder.mutation({
            query: ({ order_id }) => ({
                url: `/orders/${order_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
        getOrderLine: builder.query<
            { message: string; data: OrderLineType },
            void
        >({
            query: () => '/orders/orderline'
        })
    })
});

export const {
    useGetOrderLinesQuery,
    useCreateNewOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useGetOrderLineQuery
} = orderLinesApi;
// returns the query result object
export const selectOrderLinesResult =
    orderLinesApi.endpoints.getOrderLines.select();

// creates memoized selector
const selectOrderLinersData = createSelector(
    selectOrderLinesResult,
    (usersResult) => usersResult.data // normalized state object with ids & entities
);

export const {
    selectAll: selectAllOrderLines,
    selectById: selectOrderLineById
} = orderLinesAdapter.getSelectors(
    (state: any) => selectOrderLinersData(state) ?? initialState
);
