import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// import inputReducer from "./store/userInputSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
    },
});
