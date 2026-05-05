import axios from "axios"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Cart from "./pages/Cart";
import ProtectedRoutes from "./guards/ProtectedRoutes";
import Profile from "./pages/Profile";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  axios.defaults.baseURL = "https://dummyjson.com/products";
  axios.defaults.withCredentials = true;
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes/> }>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile/>}/>
        </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        aria-label="toast-container"
      />
    </>
  )
}

export default App 
