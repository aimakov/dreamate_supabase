import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "auth",
    initialState: {
        user: {},
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },

        loginError: (state, action) => {
            state.user = {};
        },

        logoutSuccess: (state, action) => {
            state.user = {};
        },
    },
});

export const { loginSuccess, loginError, logoutSuccess } = slice.actions;

export const selectUser = (state: any) => state.auth.user;

export default slice.reducer;
