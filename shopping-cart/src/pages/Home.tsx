import { useQuery } from "@tanstack/react-query"
import { allProducts } from "../api/Apis"
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItems } from "../slices/productSlice";

export default function Home() {
    const { data, isLoading } = useQuery({
        queryKey: ["fetchProducts"],
        queryFn: allProducts
    })
    const loading = isLoading;
    const dispatch = useDispatch()
    const selector = useSelector((state: any) => state.product)
    return (
        <div>
            <div className=" hidden flex items-center justify-around flex-wrap gap-10 md:flex">
                {
                    loading ? <Loader /> :
                        data?.data?.products.map((product: any, index: any) => {
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
                {
                    loading ? <Loader /> :
                        data?.data?.products.map((product: any, index: any) => {
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
