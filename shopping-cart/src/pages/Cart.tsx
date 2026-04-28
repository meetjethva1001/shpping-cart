

export default function Cart() {
    const cartData = JSON.parse(localStorage.getItem("products"));
    return (
        <div>

            <div className="hidden flex justify-center items-center w-full flex-wrap gap-10 md:flex">
                {
                    cartData.map((item: any, index: any) => {
                        return (
                            <div className="h-85 w-80  flex items-center  shadow-xl flex-col rounded-2xl p-5  p-3 mt-15" key={index}>
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
                                <div className="line-clamp-3 text-xs mt-2">
                                    {item.description}
                                </div>
                                <div className="flex justify-around mt-3 items-center w-full">
                                    <strong>Price : ${item.price}</strong>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="flex items-center justify-around flex-wrap gap-4 md:hidden">
                {
                  
                        cartData.map((item: any, index: any) => {
                            return (
                                <div className="h-85 w-80  flex items-center  shadow-xl flex-col rounded-2xl p-5  p-3 mt-50" key={index}>
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
                                    <div className="line-clamp-3 text-xs mt-2">
                                        {item.description}
                                    </div>
                                    <div className="flex justify-around mt-3 items-center w-full">
                                        <strong>Price : ${item.price}</strong>
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
