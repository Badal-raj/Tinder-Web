import { Routes, Route } from "react-router-dom";
import { LoginRegistrationPage } from "../pages/loginRegpage";

import { Profile } from "../pages/profile";

import { ProtectedRoute } from "./ProtectedRoute";
import { RouteLayout } from "./RouteLayout";


export const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<RouteLayout />}>
          <Route path="/" element={<LoginRegistrationPage />} /> 
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
