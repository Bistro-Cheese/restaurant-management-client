import { authKey, authSlice } from './auth-slice';
import { userKey, userSlice } from './user-slice';
import { orderKey, orderSlice } from './order-slice';
import { tableOrderKey, tableOrderSlice } from './table-order-slice';
import { paymentKey, paymentSlice } from './payment-slice';

type ReduxState = {
    [userKey]: typeof userSlice.reducer;
    [authKey]: typeof authSlice.reducer;
    [orderKey]: typeof orderSlice.reducer;
    [tableOrderKey]: typeof tableOrderSlice.reducer;
    [paymentKey]: typeof paymentSlice.reducer;
};

export const reducers: ReduxState = {
    [userKey]: userSlice.reducer,
    [authKey]: authSlice.reducer,
    [orderKey]: orderSlice.reducer,
    [tableOrderKey]: tableOrderSlice.reducer,
    [paymentKey]: paymentSlice.reducer
};
