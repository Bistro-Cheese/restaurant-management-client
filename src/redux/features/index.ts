import { authKey, authSlice } from './auth-slice';
import { userKey, userSlice } from './user-slice';
import { orderLineKey, orderLineSlice } from './order-line-slice';

type ReduxState = {
    [userKey]: typeof userSlice.reducer;
    [authKey]: typeof authSlice.reducer;
    [orderLineKey]: typeof orderLineSlice.reducer;
};

export const reducers: ReduxState = {
    [userKey]: userSlice.reducer,
    [authKey]: authSlice.reducer,
    [orderLineKey]: orderLineSlice.reducer
};
