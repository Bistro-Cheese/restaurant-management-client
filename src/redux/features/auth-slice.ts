import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const authKey = 'auth';

export type UserStatus = 'unauthenticated' | 'authenticated';

export type AuthState = {
    status?: UserStatus;
    access_token?: string | null;
};

const initialState: AuthState = {
    status: 'unauthenticated',
    access_token: null
};

export const authSlice = createSlice({
    name: authKey,
    initialState,
    reducers: {
        setCredentials: (
            state,
            { payload: { access_token } }: PayloadAction<AuthState>
        ) => {
            state.status = 'authenticated';
            state.access_token = access_token;
        },
        removeCredentials: (state) => {
            state.status = 'unauthenticated';
            state.access_token = null;
        },
        tokenUpdated: (
            state,
            { payload: access_token }: PayloadAction<string | null>
        ) => {
            state.access_token = access_token;
        }
    }
});

export const { setCredentials, removeCredentials, tokenUpdated } =
    authSlice.actions;
