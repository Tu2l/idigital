import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import ItemList from "../components/ItemList";
import Navbar from "./Navbar";
import Login from "../components/Login";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { generateDemoData } from "../demo-data";

export const NAV_CLICK_ACTION = {
  HOME: "home",
  SELL: "sell",
  SEARCH: "search",
  LOGIN: "login",
};

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [enableSearchBar, setEnableSearchBar] = useState(false);

  const handleNavClick = (action) => {
    switch (action) {
      case NAV_CLICK_ACTION.HOME:
        if (showLogin === false) return;
        setShowLogin(false);
        break;
      case NAV_CLICK_ACTION.SELL:
        break;
      case NAV_CLICK_ACTION.SEARCH:
        if (showLogin) return;
        setEnableSearchBar(!enableSearchBar);
        break;
      case NAV_CLICK_ACTION.LOGIN:
        if (setShowLogin === true) return;
        setEnableSearchBar(false);
        if (setShowLogin) setShowLogin(true);
        break;
    }
  };

  return (
    <>
      <CssBaseline />
      <Navbar navClickCallback={handleNavClick} />
      <Container maxWidth="lg">
        {enableSearchBar ? <SearchBar /> : null}
        {showLogin ? <Login /> : <ItemList items={generateDemoData} />}
      </Container>
    </>
  );
}
