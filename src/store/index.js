import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import registerSlice from "./slices/register.slice";
import cartSlice from "./slices/cart.slice";

const store = configureStore({
    reducer: {
        userSlice,
        registerSlice,
        cartSlice,
    }
});

export default store;