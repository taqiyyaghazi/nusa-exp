import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authUser/authUserSlice';
import { authApi } from '@/services/api/authApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { placesApi } from '@/services/api/placesApi';
import { worklistsApi } from '@/services/api/worklistsApi';

export const store = configureStore({
    reducer: {
        authUser: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [placesApi.reducerPath]: placesApi.reducer,
        [worklistsApi.reducerPath]: worklistsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(placesApi.middleware)
            .concat(worklistsApi.middleware),
});

setupListeners(store.dispatch);
