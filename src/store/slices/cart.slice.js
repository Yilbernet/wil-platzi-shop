import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: 'cart',
    initialState: JSON.parse(localStorage.getItem('products')) || [],
    reducers: {
        setCart: (_state, {payload}) => {
            localStorage.setItem('products', JSON.stringify(payload));
            return payload;
        },
        addCart: (state, {payload}) => {
            if (state.findIndex(prod =>
                prod.id===payload.id) === -1) {
                const newCart = [...state, payload];
                localStorage.setItem('products', JSON.stringify(newCart));
                return newCart;
            }
        },
        delCart: (state, {payload}) => {
            newCart = state.filter(prod.id!==payload);
            localStorage.setItem('products', JSON.stringify(newCart));
            return newCart;
        },
        updCart: (state, {payload}) => (
            state.map(prod => {
                const {id, quantity} = payload;
                let newCart;
                if (prod.id===id) {
                    newCart = {...prod, quantity:
                        prod.quantity + quantity,};
                } else {
                    newCart = prod;
                }
                localStorage.setItem('products', JSON.stringify(newCart));
                return newCart;
            })
        ),
    }
});

export const { setCart, addCart, delCart, updCart } = cart.actions;

export default cart.reducer;