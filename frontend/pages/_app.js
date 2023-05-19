import { CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/header/Navbar";
import { logout } from "../connections/login-register";
import { AuthContext } from "../contexts/AuthContext";
import { NavContext } from "../contexts/NavContext";

export default function MyApp({ Component, pageProps }) {
  const [authToken, setAuthToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [navAction, setNavAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const setAdmin = () => {
    const role = localStorage.getItem("role");
    setIsAdmin(role && role === "ADMIN");
  };

  const setLogin = (data) => {
    console.log(data);
    if (data.token && data.userid) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      localStorage.setItem("userId", data.userid);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setAdmin();
      setAuthToken(data.token);
      return;
    }

    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthToken(null);
    logout(
      { authToken },
      {
        success: (res) => {},
        error: (err) => {
          console.log(err);
        },
      }
    );
  };

  const authValues = {
    authToken,
    setAuthToken,
    setLogin,
    userId,
    setUserId,
    isAdmin,
    setAdmin,
  };
  const navValues = {
    navAction,
    setNavAction,
    loading,
    setLoading,
    alert,
    setAlert,

    searchQuery,
    setSearchQuery,
  };

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
    setAdmin();
  }, []);

  return (
    <AuthContext.Provider value={authValues}>
      <NavContext.Provider value={navValues}>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />;
        <Footer />
      </NavContext.Provider>
    </AuthContext.Provider>
  );
}
