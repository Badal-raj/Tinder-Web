import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const RouteLayout = () => {
  const token = useSelector((state) => state.authReducer.accessToken);
  const isAuth = !!token;
  return (
    <>
      <Header isAuth={isAuth} />
      <Outlet />
      <Footer />
    </>
  );
};
