import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const isAuth = !!token;

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
