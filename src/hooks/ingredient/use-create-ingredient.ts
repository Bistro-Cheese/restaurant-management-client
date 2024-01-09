import { useCreateIngredientMutation } from '@/redux/services/ingredient-api';

const useCreateIngredient = () => {
    const [
        createIngredient,
        {
            isLoading: isAddIngredientLoading,
            isSuccess: isAddIngredientSuccess,
            isError: isAddIngredientError,
            data: addIngredientData,
            error: addIngredientError
        }
    ] = useCreateIngredientMutation();

    return {
        createIngredient,
        isAddIngredientLoading,
        isAddIngredientSuccess,
        isAddIngredientError,
        addIngredientData,
        addIngredientError
    };
};

export default useCreateIngredient;
