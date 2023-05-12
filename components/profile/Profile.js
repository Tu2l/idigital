import {
  Alert,
  Button,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Box,
  Container,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { NAV_CLICK_ACTION } from "../../App";
import {
  getUserDetails,
  updateUserDetails,
} from "../../connections/user-details";
import { AuthContext } from "../../contexts/AuthContext";
import AddressForm from "./AddressForm";
import BasicDetailsForm from "./BasicDetailsForm";

export default function Profile({ callback }) {
  const MENU_ACTIONS = {
    BASIC_DETAILS: "basic",
    ADDRESS: "address",
    ORDERS: "order",
    ADS: "ads",
  };

  const [selected, setSelected] = useState(MENU_ACTIONS.BASIC_DETAILS);
  const { authToken } = useContext(AuthContext);

  const userId = localStorage.getItem("userId");
  if (!userId || !authToken) callback(NAV_CLICK_ACTION.LOGIN);

  const handleMenuSelect = (action) => setSelected(action);

  const gridStyle = {
    backgroundColor: "#ecedee",
    padding: "30px",
    margin: "5px",
    borderRadius: "10px",
    textAlign: "center",
  };

  let component;
  switch (selected) {
    case MENU_ACTIONS.BASIC_DETAILS:
      component = <BasicDetailsForm authToken={authToken} userId={userId} />;
      break;

    case MENU_ACTIONS.ADDRESS:
      component = <AddressForm authToken={authToken} userId={userId} />;
      break;

    case MENU_ACTIONS.ORDERS:
      component = (
        <>
          <h3 authToken={authToken} userId={userId}>
            Orders
          </h3>
        </>
      );
      break;

    case MENU_ACTIONS.ADS:
      component = component = (
        <>
          <h3 authToken={authToken} userId={userId}>
            Ads
          </h3>
        </>
      );
      break;
  }

  return (
    <Grid container alignContent={"center"} justifyContent={"center"}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Container
          align="center"
          sx={{
            // backgroundColor: "#cacaca",
            width: "100%",
            height: "100px",
            paddingTop: "30px",
          }}
        >
          <Button
            sx={{ margin: "2px" }}
            variant={
              selected === MENU_ACTIONS.BASIC_DETAILS ? "contained" : "outlined"
            }
            onClick={(e) => {
              handleMenuSelect(MENU_ACTIONS.BASIC_DETAILS);
            }}
          >
            Basic Details
          </Button>
          <Button
            sx={{ margin: "2px" }}
            variant={
              selected === MENU_ACTIONS.ADDRESS ? "contained" : "outlined"
            }
            onClick={(e) => {
              handleMenuSelect(MENU_ACTIONS.ADDRESS);
            }}
          >
            Address
          </Button>
          <Button
            sx={{ margin: "2px" }}
            variant={
              selected === MENU_ACTIONS.ORDERS ? "contained" : "outlined"
            }
            onClick={(e) => {
              handleMenuSelect(MENU_ACTIONS.ORDERS);
            }}
          >
            Orders
          </Button>
          <Button
            sx={{ margin: "2px" }}
            variant={selected === MENU_ACTIONS.ADS ? "contained" : "outlined"}
            onClick={(e) => {
              handleMenuSelect(MENU_ACTIONS.ADS);
            }}
          >
            Ads
          </Button>
        </Container>
      </Grid>
      <Grid style={gridStyle} item xs={12} sm={12} md={5} lg={5}>
        {component}
      </Grid>
    </Grid>
  );
}
