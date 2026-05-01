import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../slices/productSlice";
import { removeItems } from '../slices/productSlice'

export default function Cart() {
    const cartData = useSelector((state: any) => state.product)
    const dispatch = useDispatch()
    const grandTotal = cartData?.products.reduce(
        (total: number, item: any) => total + item.quantity * item.price,
        0
    );
    return (
        <div>

            <div className="hidden flex justify-center items-center w-full flex-wrap gap-10 md:flex">
                {
                    cartData?.products.length <= 0 ? <h1>No items found!!</h1> : cartData?.products.map((item: any, index: any) => {
                        return (
                            <div className="h-90 w-80  flex items-center  shadow-xl flex-col rounded-2xl p-5  p-3 mt-15 " key={index}>
                                <div className="h-25 bg-gray-100 rounded-xl w-full">
                                    <img src={item.thumbnail} alt="" className="w-full object-contain h-full" />
                                </div>
                                <div className="mt-5 h-11">
                                    {item.title}
                                </div>
                                <div className="text-xs  px-2 rounded mt-2 text-right w-full flex justify-between">
                                    <span className="bg-gray-200 px-2 py-1 rounded text-xs">{item.category}</span>
                                    {
                                        item.brand ? <span className="bg-blue-100 px-2 py-1 rounded text-xs">{item.brand}</span> : <span></span>
                                    }
                                </div>
                                <div className="line-clamp-2 text-xs mt-2">
                                    {item.description}
                                </div>
                                <div className="flex justify-around mt-3 items-center w-full">
                                    <div className="flex gap-2">
                                        <button className="bg-gray-200 rounded px-1 hover:cursor-pointer"
                                            onClick={() => dispatch(increaseQuantity(item))}
                                        >+</button>
                                        <div className="bg-gray-100">{item.quantity}</div>
                                        <button className="bg-gray-200 rounded px-1 hover:cursor-pointer"
                                            onClick={() => dispatch(decreaseQuantity(item))}
                                        >-</button>
                                    </div>
                                    <strong>Price : ${(item.price * item.quantity).toFixed(2)}</strong>
                                </div>
                                <button className="bg-red-200 px-1 mt-2 rounded w-full hover:cursor-pointer py-1"
                                    onClick={() => dispatch(removeItems(item))}
                                >Remove item</button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="m-auto w-[95%] p-10">
                <div className="w-full mt-5 bg-white border py-4 px-6 flex items-center justify-between rounded-xl">

                    <div className="flex gap-6 text-gray-700">
                        <div>
                            <span className="text-sm">Items</span>
                            <p className="font-medium">{cartData.products.length}</p>
                        </div>

                        <div>
                            <span className="text-sm">Total</span>
                            <p className="font-medium">${grandTotal.toFixed(2)}</p>
                        </div>
                    </div>

                    <button className="bg-black text-white px-6 py-2 rounded-md hover:opacity-90">
                        Place Order
                    </button>

                </div>
            </div>

            

            <div className="flex items-center justify-around flex-wrap gap-4 md:hidden">
                {

                    cartData?.products.map((item: any, index: any) => {
                        return (
                            <div className="h-85 w-80  flex items-center  shadow-xl flex-col rounded-2xl p-5  p-3 mt-50 " key={index}>
                                <div className="h-25 bg-gray-100 rounded-xl w-full">
                                    <img src={item.thumbnail} alt="" className="w-full object-contain h-full" />
                                </div>
                                <div className="mt-5 h-11">
                                    {item.title}
                                </div>
                                <div className="text-xs  px-2 rounded mt-2 text-right w-full flex justify-between">
                                    <span className="bg-gray-200 px-2 py-1 rounded text-xs">{item.category}</span>
                                    {
                                        item.brand ? <span className="bg-blue-100 px-2 py-1 rounded text-xs">{item.brand}</span> : <span></span>
                                    }
                                </div>
                                <div className="line-clamp-2 text-xs mt-2">
                                    {item.description}
                                </div>
                                <div className="flex justify-around mt-3 items-center w-full">
                                    <div className="flex gap-2">
                                        <button className="bg-gray-200 rounded px-1 hover:cursor-pointer"
                                            onClick={() => dispatch(increaseQuantity(item))}
                                        >+</button>
                                        <div className="bg-gray-100">{item.quantity}</div>
                                        <button className="bg-gray-200 rounded px-1 hover:cursor-pointer"
                                            onClick={() => dispatch(decreaseQuantity(item))}
                                        >-</button>
                                    </div>
                                    <strong>Price : ${(item.price * item.quantity).toFixed(2)}</strong>
                                </div>
                                <button className="bg-red-200 px-1 rounded w-full hover:cursor-pointer py-1"
                                    onClick={() => dispatch(removeItems(item))}
                                >Remove item</button>
                            </div>


                        )
                    })
                }
            </div>

        </div>
    )
}
