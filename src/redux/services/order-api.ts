import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { OrderType } from '@/types/OrderType';

const ordersAdapter = createEntityAdapter<OrderType>({
    selectId: (order) => order.id,
    sortComparer: (a, b) => a.id.localeCompare(b.id)
});

const initialState = ordersAdapter.getInitialState();

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<EntityState<OrderType>, void>({
            query: () => '/orders/search',
            transformResponse(data: OrderType[]) {
                return ordersAdapter.setAll(initialState, data);
            },
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
        }),

        getOrderByTableId: builder.mutation<any, any>({
            query: (table_id: string) => `/orders/tables/${table_id}`
        }),

        createOrder: builder.mutation({
            query: (body) => ({
                url: '/orders',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }]
        }),

        updateOrder: builder.mutation({
            query: (body) => ({
                url: `/orders`,
                method: 'PUT',
                body
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
        })
    })
});

export const {
    useGetOrdersQuery,
    useGetOrderByTableIdMutation,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = ordersApi;
// returns the query result object
export const selectOrdersResult = ordersApi.endpoints.getOrders.select();

// creates memoized selector
const selectOrdersData = createSelector(
    selectOrdersResult,
    (ordersResult) => ordersResult.data // normalized state object with ids & entities
);

export const { selectAll: selectAllOrders, selectById: selectOrderById } =
    ordersAdapter.getSelectors(
        (state: any) => selectOrdersData(state) ?? initialState
    );
