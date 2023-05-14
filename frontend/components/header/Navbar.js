import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { NAV_CLICK_ACTION } from "../../App";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar({ navClickCallback }) {
  const { authToken } = useContext(AuthContext);

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

          {authToken ? (
            <Button
              color="inherit"
              onClick={() => navClickCallback(NAV_CLICK_ACTION.SELL)}
            >
              Sell
            </Button>
          ) : null}

          <Button
            color="inherit"
            onClick={() => navClickCallback(NAV_CLICK_ACTION.SEARCH)}
          >
            Search
          </Button>

          {authToken ? (
            <Button
              color="inherit"
              onClick={() => navClickCallback(NAV_CLICK_ACTION.PROFILE)}
            >
              Profile
            </Button>
          ) : null}

          <Button
            color="inherit"
            onClick={() => {
              if (authToken) {
                navClickCallback(NAV_CLICK_ACTION.LOGOUT);
                return;
              }
              navClickCallback(NAV_CLICK_ACTION.LOGIN);
            }}
          >
            {authToken ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
