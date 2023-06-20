import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authUser/authUserSlice';
import { authApi } from '@/services/api/authApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { placesApi } from '@/services/api/placesApi';

export const store = configureStore({
    reducer: {
        authUser: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [placesApi.reducerPath]: placesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(placesApi.middleware),
});

setupListeners(store.dispatch);
