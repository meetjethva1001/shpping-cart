import axios from "axios"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Cart from "./pages/Cart";
import ProtectedRoutes from "./guards/ProtectedRoutes";

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
        </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

      </Routes>
    </>
  )
}

export default App
