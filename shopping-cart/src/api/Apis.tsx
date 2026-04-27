import axios from "axios"

export const allProducts = async () =>{
    const products = await axios.get("/");
    return products;
}