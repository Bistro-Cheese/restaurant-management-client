import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { apiSlice } from './base-api';
import { OrderLineType, OrderType } from '@/types';

const ordersAdapter = createEntityAdapter<OrderType>({
    selectId: (order) => order.id,
    sortComparer: (a, b) => a.id.localeCompare(b.id)
});

const initialState = ordersAdapter.getInitialState();

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<EntityState<OrderType>, void>({
            query: () => '/orders',
            transformResponse(response: {
                message: string;
                data: OrderType[];
            }) {
                return ordersAdapter.setAll(initialState, response.data);
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
        createOrder: builder.mutation({
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
            query: (data) => ({
                url: `/orders`,
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
        })
    })
});

export const {
    useGetOrdersQuery,
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
