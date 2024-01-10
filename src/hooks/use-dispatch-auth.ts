import { useLoginMutation, useLogoutMutation } from '@/redux/services/auth-api';
import { useAppDispatch } from './redux-hook';
import { setCredentials, removeCredentials } from '@/redux/features/auth-slice';
import { redirect, useRouter } from 'next/navigation';
import { removeProfile } from '@/redux/features/user-slice';
import { resetOrderState } from '@/redux/features/order-slice';

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
                router.push('/auth');
                console.log(userData?.data);
                // router.push('/owner/foods/menu');
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
            await logout({})
                .unwrap()
                .finally(() => {
                    dispatch(removeCredentials());
                    dispatch(removeProfile());
                    dispatch(resetOrderState());
                    redirect('/');
                });
        } catch (err) {
            console.log('sign out fail::::', err);
        }
    };

    return { isLogoutLoading, dispatchLogout };
};
