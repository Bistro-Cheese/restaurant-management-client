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
        })
    })
});

export const { useCreateBillMutation } = billApi;
