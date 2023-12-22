import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { SocketAddress } from 'net';

export const userKey = 'user';

export type UserInfo = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    password: string;
    phoneNumber: string;
    role: string;
    status?: string;
    address?: {
        addressLine?: string;
        city?: string;
        region?: string;
    };
    email: string;
    experiencedYear?: string | undefined;
    certificationManagement?: string | undefined;
    foreignLanguage?: string | undefined;
    academicLevel?: string | undefined;
};

export type IUserState = {
    userInfo: UserInfo;
};

const initialState: IUserState = {
    userInfo: {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        password: '',
        phoneNumber: '',
        role: '',
        status: '',
        address: {
            addressLine: '',
            city: '',
            region: ''
        },
        email: '',
        experiencedYear: '',
        certificationManagement: '',
        foreignLanguage: '',
        academicLevel: ''
    }
};

export const userSlice = createSlice({
    name: userKey,
    initialState,
    reducers: {
        setProfile: (
            state,
            { payload: { userInfo } }: PayloadAction<IUserState>
        ) => {
            state.userInfo = userInfo;
        }
    }
});

export const { setProfile } = userSlice.actions;
