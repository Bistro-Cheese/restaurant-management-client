import { authKey, authSlice } from './auth-slice';
import { userKey, userSlice } from './user-slice';

type ReduxState = {
    [userKey]: typeof userSlice.reducer;
    [authKey]: typeof authSlice.reducer;
};

export const reducers: ReduxState = {
    [userKey]: userSlice.reducer,
    [authKey]: authSlice.reducer
};
