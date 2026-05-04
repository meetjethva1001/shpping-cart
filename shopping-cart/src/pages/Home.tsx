import { useQuery } from "@tanstack/react-query"
import { allProducts, productsByCategory, categoryProducts } from "../api/Apis"
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import category from "../categories/categories.json"
import { addItems, removeItems } from "../slices/productSlice";
import { useState, useEffect } from "react";

export default function Home() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchProducts, setSearchProducts] = useState<string | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: searchProducts ? ["fetchProducts", searchProducts, currentPage] : ["fetchProducts", currentPage],
        queryFn: searchProducts ? () => productsByCategory(searchProducts, 10, currentPage * 10) : () => allProducts(10, currentPage * 10)
    })
    const loading = isLoading;
    const dispatch = useDispatch();
    const selector = useSelector((state: any) => state.product)

    //-----------------category products --------------------------

    const { data: categories, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ["fetchCategories"],
        queryFn: categoryProducts
    })

    const products = data?.data?.products;

    const totalPages = Math.ceil((data?.data?.total || 0) / 10);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchProducts]);

    //-----------------category products --------------------------

    return (
        <div>
            <div className=" hidden flex items-center justify-around flex-wrap gap-6 md:flex flex-row">
                <div className="w-full mt-20 flex items-center justify-center gap-4">
                    <input type="text" placeholder="Search products..." className="border p-2 rounded w-1/2"/>
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
                        products?.map((product: any, index: any) => {
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
                        <input type="text" placeholder="Search products..." className="border p-2 rounded w-1/2"/>
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
                       products.map((product: any, index: any) => {
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

            {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-4 mb-5">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))} 
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">Page {currentPage + 1} of {totalPages}</span>
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))} 
                        disabled={currentPage === totalPages - 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    )
}
