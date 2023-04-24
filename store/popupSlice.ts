import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "popup",
    initialState: {
        message: "",
        type: "",
        toggle: false,
    },
    reducers: {
        actionSuccess: (state, action) => {
            state.message = action.payload.message;
            state.type = "SUCCESS";
            state.toggle = !state.toggle;
        },

        actionInfo: (state, action) => {
            state.message = action.payload.message;
            state.type = "INFO";
            state.toggle = !state.toggle;
        },

        actionError: (state, action) => {
            state.message = action.payload.message;
            state.type = "ERROR";
            state.toggle = !state.toggle;
        },

        actionClear: (state, action) => {
            state.message = action.payload;
            state.type = action.payload;
        },
    },
});

export const { actionSuccess, actionInfo, actionError, actionClear } = slice.actions;

export const selectMessage = (state: any) => state.popup.message;

export const selectType = (state: any) => state.popup.type;

export const selectToggle = (state: any) => state.popup.toggle;

export default slice.reducer;
