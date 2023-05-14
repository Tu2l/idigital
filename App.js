import React from "react";
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { generateDemoData } from "./demo-data";
import Navbar from "./components/header/Navbar";
import ItemList from "./components/ItemList";
import Login from "./components/login-register/Login";
import SearchBar from "./components/header/SearchBar";
import Footer from "./components/Footer";
import Register from "./components/login-register/Register";
import Sell from "./components/Sell";
import { AuthContext } from "./contexts/AuthContext";
import Profile from "./components/profile/Profile";
import { logout } from "./connections/login-register";

export const NAV_CLICK_ACTION = {
  HOME: "home",
  SELL: "sell",
  SEARCH: "search",
  LOGIN: "login",
  LOGOUT: "logout",
  REGISTER: "register",
  PROFILE: "profile",
};

export default function App() {
  const [authToken, setAuthToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [enableSearchBar, setEnableSearchBar] = useState(false);
  const [showSellPage, setShowSellPage] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleNavClick = (action) => {
    switch (action) {
      case NAV_CLICK_ACTION.HOME:
        if (
          showLogin === false &&
          showRegister === false &&
          showSellPage === false &&
          setShowProfile === false
        )
          return;
        setShowLogin(false);
        setShowRegister(false);
        setShowSellPage(false);
        setShowProfile(false);
        break;
      case NAV_CLICK_ACTION.SELL:
        if (showSellPage) return;

        setEnableSearchBar(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowProfile(false);

        setShowSellPage(true);

        break;
      case NAV_CLICK_ACTION.SEARCH:
        if (showLogin || showRegister || showSellPage || showProfile) return;
        setEnableSearchBar(!enableSearchBar);
        break;
      case NAV_CLICK_ACTION.LOGIN:
        if (setShowLogin === true) return;

        setEnableSearchBar(false);
        setShowSellPage(false);
        setShowProfile(false);

        setShowLogin(true);
        break;

      case NAV_CLICK_ACTION.REGISTER:
        if (setShowRegister === true) return;

        setEnableSearchBar(false);
        setShowLogin(false);
        setShowSellPage(false);
        setShowProfile(false);

        setShowRegister(true);
        break;

      case NAV_CLICK_ACTION.PROFILE:
        if (showProfile) return;

        setEnableSearchBar(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowSellPage(false);

        setShowProfile(true);
        break;

      case NAV_CLICK_ACTION.LOGOUT:
        logout(
          { authToken },
          {
            success: (res) => {
              setAuthToken(null);
              handleNavClick(NAV_CLICK_ACTION.HOME);
            },
            error: (err) => {
              console.log(err);
            },
          }
        );
        break;
    }
  };

  let component;

  if (showLogin) component = <Login callback={handleNavClick} />;
  else if (showRegister) component = <Register callback={handleNavClick} />;
  else if (showSellPage) component = <Sell callback={handleNavClick} />;
  else if (showProfile) component = <Profile callback={handleNavClick} />;
  else component = <ItemList items={generateDemoData} />;

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <CssBaseline />
      <Navbar navClickCallback={handleNavClick} />
      <Container maxWidth="lg">
        {enableSearchBar ? <SearchBar /> : null}
        {component}
      </Container>
      <Footer />
    </AuthContext.Provider>
  );
}
