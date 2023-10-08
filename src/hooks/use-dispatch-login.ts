import { useLoginMutation } from '@/redux/services/auth-api';
import { useAppDispatch } from './redux-hook';
import { setCredentials } from '@/redux/features/auth-slice';
import { useRouter } from 'next/navigation';

export const useDispatchLogin = () => {
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

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
                router.push('/');
            }
        } catch (err) {
            console.log('sign in fail::::', err);
        }
    };

    return { isLoading, dispatchLogin };
};
