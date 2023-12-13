import { useCreateOrderMutation } from '@/redux/services/order-api';

export const useCreateOrder = () => {
    const [
        createOrder,
        {
            isLoading: isCreatingLoading,
            isSuccess: isCreatedSuccess,
            isError: isCreatingError,
            error: creatingError
        }
    ] = useCreateOrderMutation();

    return {
        createOrder,
        isCreatingLoading,
        isCreatedSuccess,
        isCreatingError,
        creatingError
    };
};
