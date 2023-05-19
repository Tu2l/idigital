import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/admin/Dashboard";
import Login from "../../components/admin/Login";
import { Container } from "@mui/system";
import { logout } from "../../connections/login-register";
import { AuthContext } from "../../contexts/AuthContext";
import Category from "../../components/admin/Category";
import ProductPanel from "../../components/admin/product/ProductPanel";
import { NavContext } from "../../contexts/NavContext";
import { useRouter } from "next/router";

export const ADMIN_MENU_ACTIONS = {
  DASHBOARD: "dashboard",
  LOGIN: "login",
  LOGOUT: "logout",
  ORDERS: "orders",
  PRODUCTS: "products",
  CATEGORIES: "categories",
};

export default function Admin() {
  const { authToken, isAdmin } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // console.log(authToken, isAdmin);

    document.title = "Buy Sell Trade:Admin";
    if (authToken && isAdmin) router.push(`${router.pathname}/dashboard`);
  }, [authToken, isAdmin]);

  return (
    <>
      <Container maxWidth="lg">
        {!authToken || !isAdmin ? <Login /> : null}
      </Container>
    </>
  );
}
