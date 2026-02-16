import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { hangeGetUserDetails } from "../redux/features/profile/ProfileSlice";
import { setUser } from "../redux/features/AuthUser/authSlice";

export const RouteLayout = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.accessToken);
  const user = useSelector((state) => state.authReducer.user);

  const isAuth = !!token;

    useEffect(() => {
    const fetchUser = async () => {
      // Only call if token exists AND user not already loaded
      if (token && !user) {
        const result = await dispatch(hangeGetUserDetails());
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(setUser(result.payload?.result));
        }
      }
    };

    fetchUser();
  }, [token, user, dispatch]);

  return (
    <>
      <Header isAuth={isAuth} />
      <Outlet />
      <Footer />
    </>
  );
};
