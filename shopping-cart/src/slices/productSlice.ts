import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: typeof window !== "undefined" && localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products") as string)
        : []
}
const addCart = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        //Add cart
        addItems: (state: any, actions: any) => {
            state.products.push({ ...actions.payload, quantity: 1 });
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        removeItems: (state: any, actions: any) => {
            const updatedProducts = state.products.filter((items: any) => items.id != actions.payload.id);
            state.products = updatedProducts;
            localStorage.setItem("products", JSON.stringify(updatedProducts));
        },
        clearCart: (state: any) => {
            state.products = []
            localStorage.removeItem("products")
        },
        increaseQuantity: (state: any, actions: any) => {
            const findProduct = state.products.find((items: any) => items.id === actions.payload.id);
            if (findProduct) findProduct.quantity += 1;
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        decreaseQuantity: (state: any, actions: any) => {
            const findProduct = state.products.find((items: any) => items.id === actions.payload.id);
            if (findProduct) findProduct.quantity -= 1;
            if(findProduct.quantity <= 1) findProduct.quantity = 1;
            localStorage.setItem("products", JSON.stringify(state.products));
        }
    }
})
export const { addItems, removeItems, clearCart , increaseQuantity ,decreaseQuantity} = addCart.actions;
export default addCart.reducer; 