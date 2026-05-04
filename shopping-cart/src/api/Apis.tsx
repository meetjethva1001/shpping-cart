import axios from "axios"

export const allProducts = async (limit: number = 10, skip: number = 0) =>{
    const products = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    return products;
}

export const productsByCategory = async (category: string, limit: number = 10, skip: number = 0) =>{
    const products = await axios.get(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`);
    return products;
}

export const categoryProducts = async () =>{
    const categories = await axios.get("/categories");
    return categories;
}

export const onlyCategoryProduct = async (category: string) =>{
    const products = await axios.get(`https://dummyjson.com/products/search?q=${category}`);
    return products;
}
