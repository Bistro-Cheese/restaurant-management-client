import { useUpdateIngredientMutation } from '@/redux/services/ingredient-api';

const useUpdateIngredient = () => {
    const [
        updateIngredient,
        {
            data: updateIngredientData,
            isLoading: isUpdateIngredientLoading,
            isSuccess: isUpdateIngredientSuccess,
            isError: isUpdateIngredientError,
            error: updateIngredientError
        }
    ] = useUpdateIngredientMutation();

    return {
        updateIngredient,
        updateIngredientData,
        isUpdateIngredientLoading,
        isUpdateIngredientSuccess,
        isUpdateIngredientError,
        updateIngredientError
    };
};

export default useUpdateIngredient;
