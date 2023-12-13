import { useUpdateOrderMutation } from '@/redux/services/order-api';

export const useUpdateOrder = () => {
    const [
        updateOrder,
        {
            isLoading: isUpdatingLoading,
            isSuccess: isUpdatedSuccess,
            isError: isUpdatedError,
            error: updatedError
        }
    ] = useUpdateOrderMutation();
    return {
        updateOrder,
        isUpdatingLoading,
        isUpdatedSuccess,
        isUpdatedError,
        updatedError
    };
};
