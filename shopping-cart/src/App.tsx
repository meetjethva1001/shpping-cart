import axios from "axios"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  axios.defaults.baseURL = " https://dummyjson.com/products";
  axios.defaults.withCredentials = true;
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
