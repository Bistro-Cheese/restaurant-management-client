import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const authKey = 'auth';

export type AuthState = {
    access_token?: string | null;
};

const initialState: AuthState = {
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
            state.access_token = access_token;
        },
        removeCredentials: (state) => {
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
