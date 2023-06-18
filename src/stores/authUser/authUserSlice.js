import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state = action.payload;
            return state
        },
        unsetAuthUser: (state) => {
            state = null;
            return state
        },
    },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
