import { Link } from "react-router-dom";


export default function Profile() {
   
    const storedProducts = localStorage.getItem("ProfileProducts") ? JSON.parse(localStorage.getItem("ProfileProducts") || "[]") : [];
    const products = Array.isArray(storedProducts) ? storedProducts : [storedProducts];
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-6 ">

            {products.length > 0 ? (
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-5 mt-3">
                    <h3 className="text-base font-semibold text-gray-700 mb-4">Your Purchases</h3>
                    <div className="flex flex-col gap-3">
                        {products.map((item: any, index: number) => (
                            <div key={index} className="flex items-center gap-4 border border-gray-200 rounded-2xl bg-gray-50 p-4">
                                <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                                    <img
                                        src={item.thumbnail || item.image || 'https://via.placeholder.com/80'}
                                        alt={item.title || item.name || 'Product'}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="font-medium text-sm text-gray-800 truncate">{item.title || item.name || 'Item'}</div>
                                    <div className="mt-1 text-xs text-gray-500">Qty {item.quantity ?? item.qty ?? 1}</div>
                                </div>
                                <div className="font-semibold text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        ))}
                        <div className="font-bold text-lg text-gray-900 flex justify-between gap-2 mt-4">
                           <h2 className="text-sm p-1">GrandTotal : </h2>  
                           <span className="text-sm bg-red-200 p-1 rounded">${products.reduce((total: number, item: any) => total + (item.price ?? 0) * (item.quantity ?? item.qty ?? 1), 0).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <p>No purchases found, please make a purchase.</p>
                    <Link to="/" className="text-blue-500 hover:text-blue-700 underline">Shop Now</Link>
                </div>  
            )}

        </div>
    );
}