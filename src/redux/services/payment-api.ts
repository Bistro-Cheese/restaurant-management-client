import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';

import { apiSlice } from './base-api';
import PaymentType from '@/types/PaymentType';

const paymentAdapter = createEntityAdapter<PaymentType>({
    selectId: (payment) => payment.id,
    sortComparer: (a, b) =>
        a.accountHolderName.localeCompare(b.accountHolderName)
});

const initialState = paymentAdapter.getInitialState();

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query<EntityState<PaymentType>, void>({
            query: () => '/payments',
            transformResponse(response: {
                message: string;
                data: PaymentType[];
            }) {
                return paymentAdapter.setAll(initialState, response.data);
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'Payment' as const,
                              id
                          })),
                          'Payment'
                      ]
                    : ['Payment']
        }),

        createPayment: builder.mutation<PaymentType, Omit<PaymentType, 'id'>>({
            query: (body) => ({
                url: '/payments',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Payment']
        }),

        updatePayment: builder.mutation<PaymentType, PaymentType>({
            query: (body) => ({
                url: `/payments/${body.id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Payment', id: arg.id }
            ]
        }),

        deletePayment: builder.mutation({
            query: (id) => ({
                url: `/payments/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Payment', id: arg.id }
            ]
        })
    })
});

export const {
    useGetPaymentsQuery,
    useCreatePaymentMutation,
    useUpdatePaymentMutation,
    useDeletePaymentMutation
} = paymentApi;

export const selectPaymentsResult = paymentApi.endpoints.getPayments.select();

const selectPaymentsData = createSelector(
    selectPaymentsResult,
    (paymentsResult) => paymentsResult?.data
);

export const { selectAll: selectAllPayments, selectById: selectPaymentById } =
    paymentAdapter.getSelectors(
        (state: any) => selectPaymentsData(state) ?? initialState
    );
