import { Button, Grid, Container } from "@mui/material";
import React, { useContext, useState } from "react";
import { NAV_CLICK_ACTION } from "../../nav-actions";
import { AuthContext } from "../../contexts/AuthContext";
import AddressForm from "./AddressForm";
import BasicDetailsForm from "./BasicDetailsForm";
import Ads from "./Ads";
import Order from "./Order";

export default function Profile({ callback }) {
  const MENU_ACTIONS = {
    BASIC_DETAILS: "basic",
    ADDRESS: "address",
    ORDERS: "order",
    ADS: "ads",
  };

  const { authToken, userId } = useContext(AuthContext);

  // if (!userId || !authToken) callback(NAV_CLICK_ACTION.LOGIN);

  // console.log(userId, authToken);

  const [selected, setSelected] = useState(MENU_ACTIONS.BASIC_DETAILS);
  const [gridSize, setGridSize] = useState(5);
  const [component, setComponent] = useState(
    <BasicDetailsForm authToken={authToken} userId={userId} />
  );

  const handleMenuSelect = (action) => {
    setSelected(action);
    switch (action) {
      case MENU_ACTIONS.BASIC_DETAILS:
        if (gridSize !== 5) setGridSize(5);
        setComponent(
          <BasicDetailsForm authToken={authToken} userId={userId} />
        );
        break;

      case MENU_ACTIONS.ADDRESS:
        if (gridSize !== 5) setGridSize(5);
        setComponent(<AddressForm authToken={authToken} userId={userId} />);
        break;

      case MENU_ACTIONS.ORDERS:
        if (gridSize !== 12) setGridSize(12);
        setComponent(<Order userId={userId} />);
        break;

      case MENU_ACTIONS.ADS:
        if (gridSize !== 12) setGridSize(12);
        setComponent(<Ads userId={userId} />);
        break;
    }
  };

  const gridStyle = {
    backgroundColor: "#ecedee",
    padding: "30px",
    margin: "5px",
    borderRadius: "10px",
    textAlign: "center",
  };

  return (
    <Grid container alignContent={"center"} justifyContent={"center"}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Container
          align="center"
          sx={{
            // backgroundColor: "#cacaca",
            width: "100%",
            height: "100px",
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
      <Grid style={gridStyle} item xs={12} sm={12} md={gridSize} lg={gridSize}>
        {component}
      </Grid>
    </Grid>
  );
}
