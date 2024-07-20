import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BearerToken from "../../utils/BearerToken";
const urlBase = 'https://api.escuelajs.co/api/v1';

const user = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (_state, {payload}) => payload,
        delUser: () => null,
    }
});

export const { setUser, delUser } = user.actions;

export default user.reducer;

export const getUserThunk = (path) => (dispatch) => {
    if (!localStorage.getItem('access_token')) {
        return;
    }
    const url = `${urlBase}${path}`;
    axios.get(url, BearerToken())
        .then(res => dispatch(setUser(res.data)))
        .catch(err => console.log(err));
}