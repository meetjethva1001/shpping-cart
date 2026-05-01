import axios from "axios"

export const allProducts = async () =>{
    const products = await axios.get("/");
    return products;
}

export const categoryProducts = async () =>{
    const categories = await axios.get("/categories");
    return categories;
}