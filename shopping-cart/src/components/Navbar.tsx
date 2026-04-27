import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="w-full shadow-md bg-white fixed">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                <div className="text-xl font-bold">
                    ShopEase
                </div>


                <div className="hidden md:flex items-center gap-6 text-gray-700">
                    <Link to="/" className="block">Home</Link>
                    <Link to="#" className="block">Cart</Link>
                    <Link to="/profile" className="block">Profile</Link>
                </div>


                <div className="hidden md:flex items-center gap-4">
                    <button className="px-4 py-1 border rounded-lg hover:bg-gray-100 hover:cursor-pointer">
                        Login
                    </button>
                    <button className="px-4 py-1 bg-black text-white rounded-lg hover:cursor-pointer">
                        Register
                    </button>
                </div>


                <div className="md:hidden">
                    <button className="text-2xl">☰</button>
                </div>
            </div>


            <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700">
                <Link to="/" className="block">Home</Link>
                <Link to="#" className="block">Cart</Link>
                <Link to="/profile" className="block">Profile</Link>
                <div className="flex gap-2 pt-2">
                    <button className="px-3 py-1 border rounded-lg w-full hover:cursor-pointer">
                        Login
                    </button>
                    <button className="px-3 py-1 bg-black text-white rounded-lg w-full hover:cursor-pointer">
                        Register
                    </button>
                </div>
            </div>
        </nav>
    );
}