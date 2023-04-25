import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import popupReducer from "./popupSlice";
import modalSlice from "./modalSlice";

// import inputReducer from "./store/userInputSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    modal: modalSlice,
  },
});
