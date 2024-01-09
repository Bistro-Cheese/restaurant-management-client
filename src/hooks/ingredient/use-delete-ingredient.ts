import { useDeleteIngredientMutation } from '@/redux/services/ingredient-api';

const useDeleteIngredient = () => {
    const [
        deleteIngredient,
        {
            data: deleteIngredientData,
            isLoading: isDeleteIngredientLoading,
            isSuccess: isDeleteIngredientSuccess,
            isError: isDeleteIngredientError,
            error: deleteIngredientError
        }
    ] = useDeleteIngredientMutation();

    return {
        deleteIngredient,
        deleteIngredientData,
        isDeleteIngredientLoading,
        isDeleteIngredientSuccess,
        isDeleteIngredientError,
        deleteIngredientError
    };
};

export default useDeleteIngredient;
