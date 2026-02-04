import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
const [authLoading, setAuthLoading] = useState(true);

  // Load auth state from sessionStorage on app start
  useEffect(() => {
    const token = sessionStorage.getItem("user-auth");
     if (token) {
      setIsAuth(true);
    }
    setAuthLoading(false); // 👈 important
  }, []);

  const loginAction = (token) => {
    sessionStorage.setItem("user-auth", token);
    setIsAuth(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user-auth");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, loginAction, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
