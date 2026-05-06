import { Link, NavLink } from "react-router-dom";
import CartIcon from "./CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../slices/productSlice";
import { useState } from "react";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const selector = useSelector((state: any) => state.product)
    const navigate = useNavigate()
    const authSelector = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()
    const logoutAction = () => {
        dispatch(logout())
        dispatch(clearCart())
        setIsMobileMenuOpen(false)
        navigate("/signup")
    }
    const authData = authSelector.isAuthenticate;
    return (
        <nav className="w-full shadow-md bg-white fixed z-40">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                <div className="text-xl font-bold">
                    ShopEase
                </div>


                <div className="hidden md:flex items-center gap-6 text-gray-700">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block px-3 py-1 rounded-lg ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                    >
                        Home
                    </NavLink>
                    {
                        authData && <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `block px-3 py-1 rounded-lg ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`
                            }
                        >
                            Orders
                        </NavLink>
                    }
                </div>


                {
                    authSelector.isAuthenticate ? <div className="hidden md:flex items-center gap-4">
                        {/* <Link to={'/cart'}> <CartIcon value={selector?.products?.length} /> </Link> */}
                        {/* <div className="relative">
                            <img
                                src="/src/assets/user.png"
                                alt="user image"
                                className="w-8 h-8 rounded-full hover:cursor-pointer"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            />
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <img src="/src/assets/user.png" alt="user" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-semibold text-sm text-gray-800">{authSelector?.name || 'User'}</p>
                                            <p className="text-xs text-gray-500">{authSelector?.email || 'email@example.com'}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 hover:cursor-pointer"
                                        onClick={logoutAction}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div> */}
                    </div>
                        : <div className="hidden md:flex items-center gap-4">

                            <Link to={'/login'} className="px-4 py-1 border rounded-lg hover:bg-gray-100 hover:cursor-pointer">
                                Login
                            </Link>
                            <Link to={'/signup'} className="px-4 py-1 bg-black text-white rounded-lg hover:cursor-pointer">
                                Register
                            </Link>

                        </div>
                }
                {
                    authSelector.isAuthenticate &&
                    <div className="flex items-center gap-1">
                        {
                            authSelector.isAuthenticate ?
                                <div className="flex items-center justify-around mb-1 ml-35">
                                    <Link to={'/cart'} className="flex items-center gap-2 px-3 py-2 mt-2 hover:bg-gray-100 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                                        <CartIcon value={selector?.products?.length} />
                                    </Link>
                                    <div className="relative mt-2">
                                        <img
                                            src="/src/assets/user.png"
                                            alt="user image"
                                            className="w-8 h-8 rounded-full hover:cursor-pointer"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        />
                                        {isDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <img src="/src/assets/user.png" alt="user" className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <p className="font-semibold text-sm text-gray-800">{authSelector?.name || 'User'}</p>
                                                        <p className="text-xs text-gray-500">{authSelector?.email || 'email@example.com'}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 hover:cursor-pointer"
                                                    onClick={logoutAction}
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div> : ""
                        }

                    </div>
                }
                <button
                    className="md:hidden flex items-center justify-center w-8 h-8 hover:cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700 border-t">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    {
                        authData && <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-lg ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Orders
                        </NavLink>
                    }

                    {
                        authSelector.isAuthenticate ? <div className="space-y-2 flex items-center justify-between flex-row">
                            {/* <Link to={'/cart'} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                                <CartIcon value={selector?.products?.length} />
                            </Link> */}
                            {/* <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:cursor-pointer"
                                onClick={() => {
                                    logoutAction();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Logout
                            </button> */}

                        </div> : <div className="flex gap-2 pt-2">
                            <Link to={'/login'} className="px-3 py-2 border rounded-lg w-full hover:bg-gray-100 hover:cursor-pointer text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to={'/signup'} className="px-3 py-2 bg-black text-white rounded-lg w-full hover:cursor-pointer text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                Register
                            </Link>
                        </div>
                    }
                </div>
            )}

        </nav>
    );
}