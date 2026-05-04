import { Link, NavLink } from "react-router-dom";
import CartIcon from "./CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../slices/productSlice";

export default function Navbar() {
    const navigate = useNavigate()
    const selector = useSelector((state: any) => state.product)
    const authSelector = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()
    const logoutAction = () => {
        dispatch(logout())
        dispatch(clearCart())
        navigate("/signup")
    }

    // const grandTotal = selector?.products.reduce(
    //     (total: number, item: any) => total + item.quantity * item.price,
    //     0
    // );

    return (
        <nav className="w-full shadow-md bg-white fixed">
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
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `block px-3 py-1 rounded-lg ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                    >
                        Profile
                    </NavLink>
                </div>


                {
                    authSelector.isAuthenticate ? <div className="hidden md:flex items-center gap-4"><button className="px-4 py-1 bg-black text-white rounded-lg hover:cursor-pointer"
                        onClick={logoutAction}
                    >Logout</button>
                        <Link to={'/cart'}> <CartIcon value={selector?.products.length} /> </Link>
                    </div>
                        : <div className="hidden md:flex items-center gap-4">

                            <Link to={'/login'} className="px-4 py-1 border rounded-lg hover:bg-gray-100 hover:cursor-pointer">
                                Login
                            </Link>
                            <Link to={'/signup'} className="px-4 py-1 bg-black text-white rounded-lg hover:cursor-pointer">
                                Register
                            </Link>
                            {/* <Link to={'/cart'}> <CartIcon value={selector?.products.length} /> </Link> */}

                        </div>
                }
                {/* {
                    authSelector.isAuthenticate ? <div className="font-bold">
                        Grand-total : <span className="bg-red-200 px-1  rounded-xl ">{grandTotal.toFixed(2)}</span>
                    </div> : ""
                } */}


            </div>

            <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`
                    }
                >
                    Profile
                </NavLink>

                {
                    authSelector.isAuthenticate ? <div className=" md:flex items-center gap-4"><button className="px-4 py-1 bg-black text-white rounded-lg hover:cursor-pointer"
                        onClick={logoutAction}
                    >Logout</button>
                        <Link to={'/cart'}> <CartIcon value={selector?.products.length} /> </Link>
                    </div> : <div className="flex gap-2 pt-2">
                        <Link to={'/login'} className="px-3 py-1 border rounded-lg w-full hover:cursor-pointer">
                            Login
                        </Link>
                        <Link to={'/signup'} className="px-3 py-1 bg-black text-white rounded-lg w-full hover:cursor-pointer">
                            Register
                        </Link>
                        <div className="flex"><Link to={'/cart'}> <CartIcon value={selector?.products.length} /> </Link></div>
                    </div>
                }
                {/* {
                    authSelector.isAuthenticate ? <div className="font-bold">
                        Grand-total : <span className="bg-red-200 px-1  rounded-xl ">{grandTotal.toFixed(2)}</span>
                    </div> : ""
                } */}

            </div>

        </nav>
    );
}