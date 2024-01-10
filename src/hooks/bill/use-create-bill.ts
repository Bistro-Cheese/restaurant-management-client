import { useCreateBillMutation } from '@/redux/services/bill-api';

export const useCreateBill = () => {
    const [createBill, { isLoading }] = useCreateBillMutation();

    return { createBill, isLoading };
};
