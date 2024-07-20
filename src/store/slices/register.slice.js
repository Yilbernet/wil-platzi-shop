import { createSlice } from "@reduxjs/toolkit";

const register = createSlice({
    name: 'register',
    initialState: null,
    reducers: {
        setRegister: (_state, {payload}) => payload,
    }
});

export const { setRegister } = register.actions;

export default register.reducer;