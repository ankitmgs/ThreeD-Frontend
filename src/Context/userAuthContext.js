import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate()

  const handleLogin = () => {
    if (sessionStorage.getItem("user")) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    navigate("/login")
    setIsAuthenticated(false);

  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout, setIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
