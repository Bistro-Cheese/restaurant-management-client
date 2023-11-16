import {
    EntityState,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';
import { UserInfo } from '../features/user-slice';
import { apiSlice } from './base-api';

const usersAdapter = createEntityAdapter<UserInfo>({
    selectId: (user) => user.id,
    sortComparer: (a, b) => a.role.localeCompare(b.role)
});

const initialState = usersAdapter.getInitialState();

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<EntityState<UserInfo>, void>({
            query: () => '/users',
            transformResponse(response: { message: string; data: UserInfo[] }) {
                return usersAdapter.setAll(initialState, response.data);
            },
            // highlight-start
            providesTags: (result) =>
                result
                    ? [
                          ...result.ids.map((id) => ({
                              type: 'User' as const,
                              id
                          })),
                          { type: 'User', id: 'LIST' }
                      ]
                    : [{ type: 'User', id: 'LIST' }]
            // highlight-end
        }),
        addNewUser: builder.mutation({
            query: (initialUserData) => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }]
        }),
        updateUser: builder.mutation({
            query: ({ user_id, data }) => ({
                url: `/users/${user_id}`, // pass the id parameter into the URL
                method: 'PUT',
                body: {
                    ...data
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ user_id }) => ({
                url: `/users/${user_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        getProfile: builder.query<{ message: string; data: UserInfo }, void>({
            query: () => '/users/profile'
        })
    })
});

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetProfileQuery
} = usersApi;
// returns the query result object
export const selectUsersResult = usersApi.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    (usersResult) => usersResult.data // normalized state object with ids & entities
);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
    usersAdapter.getSelectors(
        (state: any) => selectUsersData(state) ?? initialState
    );
