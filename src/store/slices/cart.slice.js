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
            if (!state.find(prod => prod.id===payload.id)) {
                const {item, quantity} = payload;
                const product = {...item, quantity: quantity};
                const newCart = [...state, product];
                localStorage.setItem('products', JSON.stringify(newCart));
                return newCart;
            }
        },
        delCart: (state, {payload}) => {
            const newCart = state.filter(prod => prod.id!==payload);
            localStorage.setItem('products', JSON.stringify(newCart));
            return newCart;
        },
        updCart: (state, {payload}) => {
            const {id, quantity} = payload;
            const newCart = state.map(prod => {
                if (prod.id===id) {
                    return {...prod, quantity:
                        prod.quantity + quantity};
                } else {
                    return prod;
                }
            });
            localStorage.setItem('products', JSON.stringify(newCart));
            return newCart;
        },
    }
});

export const { setCart, addCart, delCart, updCart } = cart.actions;

export default cart.reducer;