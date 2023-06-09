import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authUser/authUserSlice';

export const store = configureStore({
    reducer: {
        authUser: authReducer,
    },
});
