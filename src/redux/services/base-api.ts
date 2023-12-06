import { removeCredentials, tokenUpdated } from '../features/auth-slice';
import { Mutex } from 'async-mutex';
import { RootState } from '@/redux/store';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery
} from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
interface RefreshResult {
    message: string;
    data: {
        access_token: string;
    };
}
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).reducer.auth.access_token;
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
        api.dispatch(tokenUpdated(null));
        console.log('sending refresh token');
        // try to get a new token
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    '/auth/refresh-token',
                    api,
                    extraOptions
                );
                if (refreshResult?.data) {
                    const refreshToken = refreshResult.data as RefreshResult;
                    // store the new token
                    api.dispatch(tokenUpdated(refreshToken.data.access_token));
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(removeCredentials());
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Food', 'User', 'Ingredient', 'Inventory', 'Order'],
    endpoints: (builder) => ({})
});
