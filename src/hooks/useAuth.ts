import { useMemo } from 'react';
import { useAppSelector } from './redux-hook';

export const useAuth = () => {
    const { status } = useAppSelector((state) => state.reducer.auth);

    return useMemo(() => ({ status }), [status]);
};
