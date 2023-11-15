import { apiSlice } from './base-api';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: { username, password }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            })
        })
    })
});

export const { useLoginMutation, useLogoutMutation } = authApi;
