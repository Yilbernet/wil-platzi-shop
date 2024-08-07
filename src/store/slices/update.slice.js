import { createSlice } from "@reduxjs/toolkit";

const update = createSlice({
    name: 'update',
    initialState: null,
    reducers: {
        setUpdate: (_state, {payload}) => payload,
    }
});

export const { setUpdate } = update.actions;

export default update.reducer;