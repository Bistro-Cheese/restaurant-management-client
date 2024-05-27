import { apiSlice } from './base-api';

export const billApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBill: builder.mutation({
            query: (body) => ({
                url: '/bills',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Bill', 'Order']
        }),

        getBillByOrderId: builder.mutation({
            query: (orderId) => ({
                url: `/bills/${orderId}`,
                method: 'GET'
            }),
            invalidatesTags: ['Bill']
        })
    })
});

export const { useCreateBillMutation, useGetBillByOrderIdMutation } = billApi;
