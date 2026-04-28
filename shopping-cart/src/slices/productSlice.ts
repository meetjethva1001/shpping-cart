import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
}

const addCart = createSlice({
    name : "productSlice",
    initialState , 
    reducers : {
        //Add cart
        addItems : (state : any , actions : any ) =>{
            const isExists = state.products.find((items:any)=>items.id === actions.payload.id)
            if(isExists) return alert("Item already added..")
            state.products.push({...actions.payload});
            localStorage.setItem("products" , JSON.stringify(state.products));
        },
        removeItems : (state : any , actions : any ) =>{
            const updatedProducts = state.products.filter((items : any ) => items.id != actions.payload.id);
            state.products = updatedProducts;
            localStorage.setItem("products" , JSON.stringify(updatedProducts));
        }
    }
})
export const {addItems, removeItems} = addCart.actions;
export default addCart.reducer; 