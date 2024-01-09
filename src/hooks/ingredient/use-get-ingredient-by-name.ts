import { useGetIngredientByNameMutation } from '@/redux/services/ingredient-api';

const useGetIngredientByName = () => {
    const [
        getIngredientByName,
        {
            data: getIngredientData,
            isSuccess: isGetIngredientSuccess,
            isLoading: isGetIngredientLoading,
            isError: isGetIngredientError,
            error: getIngredientError
        }
    ] = useGetIngredientByNameMutation();

    return {
        getIngredientByName,
        getIngredientData,
        isGetIngredientSuccess,
        isGetIngredientLoading,
        isGetIngredientError,
        getIngredientError
    };
};

export default useGetIngredientByName;
