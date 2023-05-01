import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { NAV_CLICK_ACTION } from "./App";
import SearchBar from "./SearchBar";

export default function Navbar({ navClickCallback }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Buy Sell Trade
          </Typography>

          <Button
            color="inherit"
            onClick={() => navClickCallback(NAV_CLICK_ACTION.HOME)}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => navClickCallback(NAV_CLICK_ACTION.SELL)}
          >
            Sell
          </Button>
          <Button
            color="inherit"
            onClick={() => navClickCallback(NAV_CLICK_ACTION.SEARCH)}
          >
            Search
          </Button>
          <Button
            color="inherit"
            onClick={() => navClickCallback(NAV_CLICK_ACTION.LOGIN)}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
