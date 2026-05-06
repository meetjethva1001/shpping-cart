import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    products: (() => {
        const stored = localStorage.getItem("products");
        return stored ? JSON.parse(stored) : [];
    })()
}
const addCart = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        //Add cart
        addItems: (state: any, actions: PayloadAction<any>) => {
            const existingProduct = state.products.find((item: any) => item.id === actions.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.products.push({ ...actions.payload, quantity: 1 });
            }
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        removeItems: (state: any, actions: PayloadAction<any>) => {
            const updatedProducts = state.products.filter((items: any) => items.id != actions.payload.id);
            state.products = updatedProducts;
            localStorage.setItem("products", JSON.stringify(updatedProducts));
        },
        clearCart: (state: any) => {
            state.products = []
            localStorage.removeItem("products")
        },
        increaseQuantity: (state: any, actions: PayloadAction<any>) => {
            const findProduct = state.products.find((items: any) => items.id === actions.payload.id);
            if (findProduct) findProduct.quantity += 1;
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        decreaseQuantity: (state: any, actions: PayloadAction<any>) => {
            const findProduct = state.products.find((items: any) => items.id === actions.payload.id);
            if (findProduct) findProduct.quantity -= 1;
            if (findProduct && findProduct.quantity <= 1) findProduct.quantity = 1;
            localStorage.setItem("products", JSON.stringify(state.products));
        },
    }
})
export const { addItems, removeItems, clearCart , increaseQuantity ,
    decreaseQuantity } = addCart.actions;
export default addCart.reducer; 