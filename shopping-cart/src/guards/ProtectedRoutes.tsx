import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoutes() {
    const navigate = useNavigate()

    const isLoggedIn = localStorage.getItem("credentials");
    const data = isLoggedIn ? JSON.parse(isLoggedIn) : null;
    const isAuthenticate = data.isAuthenticate;

    useEffect(() => {
        if (!isAuthenticate) navigate("/login")
    }, [])

    isAuthenticate ? <Outlet/> : null;
    return (
        <>
        </>
    )
}
