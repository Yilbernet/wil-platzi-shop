import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import registerSlice from "./slices/register.slice";
import cartSlice from "./slices/cart.slice";
import updateSlice from "./slices/update.slice";

const store = configureStore({
    reducer: {
        userSlice,
        registerSlice,
        cartSlice,
        updateSlice,
    }
});

export default store;