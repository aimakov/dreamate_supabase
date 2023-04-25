import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "modal",
  initialState: {
    message: "",
    confirmAction: null,
  },
  reducers: {
    showModal: (state, action) => {
      state.message = action.payload.message;
      state.confirmAction = action.payload.confirmAction;
    },

    hideModal: (state, action) => {
      state.message = action.payload.message;
      state.confirmAction = action.payload.confirmAction;
    },
  },
});

export const { showModal, hideModal } = slice.actions;

export const selectMessage = (state: any) => state.modal.message;

export const selectConfirmAction = (state: any) => state.modal.confirmAction;

export default slice.reducer;
