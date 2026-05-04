import { useQuery } from "@tanstack/react-query";
import { allProducts, productsByCategory, onlyCategoryProduct } from "../api/Apis";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import category from "../categories/categories.json";
import { addItems, removeItems } from "../slices/productSlice";
import { useState, useEffect } from "react";

export default function Home() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const dispatch = useDispatch();
    const selector = useSelector((state: any) => state.product);

    const { data, isLoading } = useQuery({
        queryKey: ["products", searchQuery, categoryFilter, currentPage],
        queryFn: () => {
            
            if (searchQuery) {
                return onlyCategoryProduct(searchQuery);
            }

            if (categoryFilter) {
                return productsByCategory(categoryFilter, 10, currentPage * 10);
            }

            return allProducts(10, currentPage * 10);
        }
    });

    const products = data?.data?.products || [];
    const totalPages = Math.ceil((data?.data?.total || 0) / 10);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(0);
    }, [searchQuery, categoryFilter]);

    return (
        <div>

            <div className="w-full flex justify-center px-4 ">
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl mt-21">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border p-2 rounded w-full sm:w-2/3"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <select
                        className="bg-white border p-2 rounded w-full sm:w-1/3"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {category.map((cat: string, index: number) => (
                            <option key={index} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>

                </div>
            </div>


            <div className="flex flex-wrap justify-center items-center mt-6 gap-6 px-4">
                {isLoading ? (
                    <div className="flex items-center justify-center"><Loader /></div>
                ) : (
                    products.map((product: any) => (
                        <div
                            key={product.id}
                            className="w-full max-w-sm mx-auto shadow-xl rounded-2xl p-4 flex flex-col"
                        >
                            <div className="h-32 bg-gray-100 rounded-xl w-full">
                                <img
                                    src={product.thumbnail}
                                    alt=""
                                    className="w-full object-contain h-full"
                                />
                            </div>

                            <div className="mt-4 font-medium line-clamp-2">
                                {product.title}
                            </div>

                            <div className="text-xs mt-2 flex justify-between">
                                <span className="bg-gray-200 px-2 py-1 rounded">
                                    {product.category}
                                </span>

                                {product.brand && (
                                    <span className="bg-blue-100 px-2 py-1 rounded">
                                        {product.brand}
                                    </span>
                                )}
                            </div>

                            <div className="text-xs mt-2 line-clamp-3">
                                {product.description}
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <strong className="text-sm">
                                    ${product.price}
                                </strong>

                                {selector.products.find(
                                    (item: any) => item.id === product.id
                                ) ? (
                                    <button
                                        className="px-2 py-1 bg-red-400 text-white rounded text-xs"
                                        onClick={() => dispatch(removeItems(product))}
                                    >
                                        Remove
                                    </button>
                                ) : (
                                    <button
                                        className="px-2 py-1 bg-gray-400 text-white rounded text-xs hover:bg-gray-500 hover:cursor-pointer"
                                        onClick={() => dispatch(addItems(product))}
                                    >
                                        Add Item
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>


            {!searchQuery && totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center mt-6 gap-3 px-4 mb-5 text-sm">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(0, prev - 1))
                        }
                        disabled={currentPage === 0}
                        className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Prev
                    </button>

                    <span>
                        {currentPage + 1} / {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(totalPages - 1, prev + 1)
                            )
                        }
                        disabled={currentPage === totalPages - 1}
                        className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}