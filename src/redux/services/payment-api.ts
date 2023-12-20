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
                          { type: 'Payment', id: 'LIST' }
                      ]
                    : [{ type: 'Payment', id: 'LIST' }]
        })
    })
});

export const { useGetPaymentsQuery } = paymentApi;

export const selectPaymentsResult = paymentApi.endpoints.getPayments.select();

const selectPaymentsData = createSelector(
    selectPaymentsResult,
    (paymentsResult) => paymentsResult?.data
);

export const { selectAll: selectAllPayments, selectById: selectPaymentById } =
    paymentAdapter.getSelectors(
        (state: any) => selectPaymentsData(state) ?? initialState
    );
