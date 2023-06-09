import { createSlice } from '@reduxjs/toolkit';

const initialState = 'coba';

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state = action.payload;
        },
        unsetAuthUser: (state) => {
            state = null;
        },
    },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
