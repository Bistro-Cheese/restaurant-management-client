import { useLoginMutation, useLogoutMutation } from '@/redux/services/auth-api';
import { useAppDispatch } from './redux-hook';
import { setCredentials, removeCredentials } from '@/redux/features/auth-slice';
import { useRouter } from 'next/navigation';

export const useDispatchLogin = () => {
    const dispatch = useAppDispatch();
    const [login, { isLoading: isLoginLoading, error: loginError }] =
        useLoginMutation();

    const router = useRouter();

    const dispatchLogin = async (username: string, password: string) => {
        try {
            const userData = await login({
                username: username,
                password: password
            }).unwrap();
            console.log('userData:::', userData);
            if (userData) {
                dispatch(
                    setCredentials({
                        access_token: userData?.data?.access_token
                    })
                );
                router.push('/owner/foods/menu');
            }
        } catch (err) {
            console.log('sign in fail::::', err);
        }
    };

    return { isLoginLoading, dispatchLogin, loginError };
};

export const useDispatchLogout = () => {
    const dispatch = useAppDispatch();
    const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

    const router = useRouter();

    const dispatchLogout = async () => {
        try {
            await logout({}).unwrap();
            dispatch(removeCredentials());
            router.push('/');
        } catch (err) {
            console.log('sign out fail::::', err);
        }
    };

    return { isLogoutLoading, dispatchLogout };
};
