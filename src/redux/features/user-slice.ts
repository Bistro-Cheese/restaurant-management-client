import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { SocketAddress } from 'net';

export const userKey = 'user';

export type UserStatus = 'unauthenticated' | 'authenticated';

export type UserInfo = {
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    dob?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
    address?: {
        addressLine?: string | null;
        city?: string | null;
        region?: string | null;
    };
    status?: string | null;
};

export type IUserState = {
    status: UserStatus;
    userInfo: UserInfo;
};

const initialState: IUserState = {
    status: 'unauthenticated',
    userInfo: {
        firstName: '',
        lastName: '',
        username: '',
        dob: '',
        phoneNumber: '',
        role: '',
        address: {
            addressLine: '',
            city: '',
            region: ''
        },
        status: ''
    }
};

export const userSlice = createSlice({
    name: userKey,
    initialState,
    reducers: {
        setProfile: (
            state,
            { payload: { status, userInfo } }: PayloadAction<IUserState>
        ) => {
            state.status = status;
            state.userInfo = userInfo;
        }
    }
});

export const { setProfile } = userSlice.actions;
