'use client';

import { useGetPaymentsQuery } from '@/redux/services/payment-api';

export const useGetAllPayments = () => {
    const {
        data: payments,
        error: paymentsError,
        isSuccess: isPaymentsSuccess,
        isError: isPaymentsError,
        isLoading: isPaymentsLoading,
        isFetching: isPaymentsFetching
    } = useGetPaymentsQuery();

    return {
        payments,
        paymentsError,
        isPaymentsSuccess,
        isPaymentsError,
        isPaymentsLoading,
        isPaymentsFetching
    };
};
