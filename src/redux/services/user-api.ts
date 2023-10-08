import { UserInfo } from '../features/user-slice';
import { apiSlice } from './base-api';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<{ message: string; data: UserInfo }, void>({
            query: () => '/users/profile'
        })
    })
});

export const { useGetProfileQuery } = userApi;
