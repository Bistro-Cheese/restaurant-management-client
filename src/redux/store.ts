'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducers } from './features';
import { userKey } from './features/user-slice';
import { authKey } from './features/auth-slice';
import { orderLineKey } from './features/order-line-slice';
import { apiSlice } from './services/base-api';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [authKey, userKey, orderLineKey]
};

const combinedReducer = combineReducers({
    ...reducers
});

const rootReducer = (state: any, action: any) => {
    return combinedReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        reducer: persistedReducer
    },
    //   Adding the api middleware enables caching, invalidation, polling,
    //   and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }).concat([apiSlice.middleware])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
