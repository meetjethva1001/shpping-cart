import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const navigate = useNavigate();

  const stored = localStorage.getItem("credentials");
  const token = localStorage.getItem("token");
  const data = stored ? JSON.parse(stored) : null;
  const isAuthenticated = data?.isAuthenticate;

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <Outlet />;
}