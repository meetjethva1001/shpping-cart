import { useQuery } from "@tanstack/react-query"
import { allProducts, categoryProducts } from "../api/Apis"
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import category from "../categories/categories.json"
import { addItems, removeItems } from "../slices/productSlice";
import { useState } from "react";

export default function Home() {
    const { data, isLoading } = useQuery({
        queryKey: ["fetchProducts"],
        queryFn: allProducts
    })
    const loading = isLoading;
    const dispatch = useDispatch()
    const selector = useSelector((state: any) => state.product)

    //-----------------Search products --------------------------

    const [searchProducts, setSearchProducts] = useState<string | null>(null);
    const { data: categories, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ["fetchCategories"],
        queryFn: categoryProducts
    })

    const filteredProducts = searchProducts
        ? data?.data?.products.filter((product: any) => product.category === searchProducts)
        : data?.data?.products;
    console.log(categories?.data, isCategoriesLoading);

    //-----------------Search products --------------------------

    return (
        <div>
            <div className=" hidden flex items-center justify-around flex-wrap gap-6 md:flex flex-row">
                <div className="w-full mt-20 flex items-center justify-center gap-4">
                    <select name="" className="bg-white border p-2 rounded"
                        value={searchProducts}
                        onChange={(e) => setSearchProducts(e.target.value)}
                    >
                        <option value="" disabled>All Categories</option>
                        {category.map((cat: string, index: number) => (
                            <option key={index} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                {
                    loading ? <Loader /> :
                        filteredProducts?.map((product: any, index: any) => {
                            return (
                                <div className="h-85 w-80  flex items-center  shadow-xl flex-col rounded-2xl p-5  p-3 mt-15" key={index}>
                                    <div className="h-25 bg-gray-100 rounded-xl w-full">
                                        <img src={product.thumbnail} alt="" className="w-full object-contain h-full" />
                                    </div>
                                    <div className="mt-5 h-11">
                                        {product.title}
                                    </div>
                                    <div className="text-xs  px-2 rounded mt-2 text-right w-full flex justify-between">
                                        <span className="bg-gray-200 px-2 py-1 rounded text-xs">{product.category}</span>
                                        {
                                            product.brand ? <span className="bg-blue-100 px-2 py-1 rounded text-xs">{product.brand}</span> : <span></span>
                                        }
                                    </div>
                                    <div className="line-clamp-3 text-xs mt-2">
                                        {product.description}
                                    </div>
                                    <div className="flex justify-around mt-3 items-center w-full">
                                        <strong>Price : ${product.price}</strong>

                                        {
                                            selector.products.find((item: any) => item.id === product.id) ?
                                                <button className="px-2 bg-red-400 text-white rounded hover:cursor-pointer"
                                                    onClick={() => dispatch(removeItems(product))}
                                                >Remove item</button> : <button className="px-2 bg-gray-400 text-white rounded hover:cursor-pointer"
                                                    onClick={() => dispatch(addItems(product))}
                                                >Add to cart</button>
                                        }


                                    </div>
                                </div>


                            )
                        })
                }
            </div>

            <div className="flex items-center justify-around flex-wrap gap-4 md:hidden">
                <div className="w-full mt-50 flex items-center justify-center gap-4">
                    <select name="" className="bg-white border p-2 rounded"
                        value={searchProducts}
                        onChange={(e) => setSearchProducts(e.target.value)}
                    >
                        <option value="" disabled>All Categories</option>
                        {category.map((cat: string, index: number) => (
                            <option key={index} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                {
                    loading ? <Loader /> :
                       filteredProducts.map((product: any, index: any) => {
                            return (
                                <div className="h-85 w-80  flex items-center  shadow-xl flex-col rounded-2xl p-5  p-3 mt-50" key={index}>
                                    <div className="h-25 bg-gray-100 rounded-xl w-full">
                                        <img src={product.thumbnail} alt="" className="w-full object-contain h-full" />
                                    </div>
                                    <div className="mt-5 h-11">
                                        {product.title}
                                    </div>
                                    <div className="text-xs  px-2 rounded mt-2 text-right w-full flex justify-between">
                                        <span className="bg-gray-200 px-2 py-1 rounded text-xs">{product.category}</span>
                                        {
                                            product.brand ? <span className="bg-blue-100 px-2 py-1 rounded text-xs">{product.brand}</span> : <span></span>
                                        }
                                    </div>
                                    <div className="line-clamp-3 text-xs mt-2">
                                        {product.description}
                                    </div>
                                    <div className="flex justify-around mt-3 items-center w-full">
                                        <strong>Price : ${product.price}</strong>

                                        <button className="px-2 bg-gray-400 text-white rounded hover:cursor-pointer">Add to cart</button>
                                    </div>
                                </div>


                            )
                        })
                }
            </div>

        </div>
    )
}
