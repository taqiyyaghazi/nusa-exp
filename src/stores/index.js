import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authUser/authUserSlice';
import { authApi } from '@/services/api/authApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        authUser: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
