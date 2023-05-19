import {
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { getUserDetails } from "../../../connections/user-details";
import { getAddress } from "../../../connections/address";
import { NavContext } from "../../../contexts/NavContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";
import { getImages } from "../../../connections/upload-image";
import { getCategory } from "../../../connections/category";
import { getProduct } from "../../../connections/product";
import { placeOrder } from "../../../connections/order";

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return `${result.getDate()}-${result.getMonth() + 1}-${result.getFullYear()}`;
}

export default function Order({ productId, orderCallback = null }) {
  const { loading, setLoading, setAlert } = useContext(NavContext);
  const { authToken, userId } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({
    emailId: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    gender: "male",
    password: "",
  });
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    pin: "",
    state: "",
  });
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const handleQuantityChange = (e) => setQuantity(e.target.value);

  const handlePlaceOrder = () => {
    setLoading(true);
    setAlert({});
    const products = [{ productId: product.productId, quantity }];

    // console.log("UserId", userId);

    placeOrder(
      { authToken, products, userId },
      {
        success: (res) => {
          router.push("/");
          setLoading(false);
        },
        error: (error) => {
          const msg = error?.response?.data?.message;
          setAlert({
            severity: "error",
            message: msg ? msg : error.message,
          });
          setLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    if (!authToken) router.push(router.basePath);

    document.title = "Order Confirmation";

    if (!productId) return;

    getProduct(
      { productId: productId },
      {
        success: (res) => {
          const data = res.data.data;
          if (!data.error) {
            setProduct(data);

            getCategory(
              { categoryId: data.categoryId },
              {
                success: (res) => {
                  const data = res.data.data;
                  setCategory(data.name);
                },
                error: (err) => {},
              }
            );
          }

          console.log(temp);
        },
        error: (err) => {},
      }
    );
  }, [productId]);

  useEffect(() => {
    if (!userId || !authToken) return;

    setAlert({});
    setLoading(true);

    getUserDetails(
      { authToken, userId },
      {
        success: (res) => {
          setUserDetails({ ...res.data.data });
          setLoading(false);
        },
        error: (error) => {
          const msg = error?.response?.data?.message;
          setAlert({
            severity: "error",
            message: msg ? msg : error.message,
          });
          setLoading(false);
        },
      }
    );

    getAddress(
      { authToken, userId },
      {
        success: (res) => {
          setAddress({ ...res.data.data[0] });
          setLoading(false);
        },
        error: (error) => {
          const msg = error?.response?.data?.message;
          setAlert({
            severity: "error",
            message: msg ? msg : error.message,
          });
          setLoading(false);
        },
      }
    );
  }, [userId]);

  const typoStyle = {
    padding: "10px",
    // border: "solid",
    borderWidth: "thin",
    borderColor: "black",
  };

  return (
    <Container>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{ padding: "10px", width: "25%" }}
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Please wait" : "Place Order"}
        </Button>
      </Box>
      <Grid
        container
        alignContent={"center"}
        justifyContent={"center"}
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography
            align="left"
            variant="overline"
            sx={{ paddingBottom: "10px" }}
          >
            Customer Details
          </Typography>

          <Box sx={typoStyle}>
            <TextField
              fullWidth
              value={`${userDetails?.firstName} ${userDetails?.lastName}`}
              label="Full Name"
              variant="outlined"
              contentEditable={false}
            />

            <br />
            <br />

            <TextField
              fullWidth
              value={userDetails?.emailId}
              label="Email"
              variant="outlined"
              contentEditable={false}
            />

            <br />
            <br />

            <TextField
              fullWidth
              value={userDetails?.mobileNumber}
              label="Mobile Number"
              variant="outlined"
              contentEditable={false}
            />

            <br />
            <br />
            <TextField
              fullWidth
              value={userDetails?.gender.toUpperCase()}
              label="Gender"
              variant="outlined"
              contentEditable={false}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography
            align="left"
            variant="overline"
            sx={{ paddingBottom: "10px" }}
          >
            Shipping Address
          </Typography>

          <Box sx={typoStyle}>
            <TextField
              fullWidth
              value={address?.addressLine1}
              label="Address Line 1"
              variant="outlined"
              type="text"
              contentEditable={false}
            />

            <br />
            <br />

            <TextField
              fullWidth
              value={address?.addressLine2}
              label="Address Line 2"
              variant="outlined"
              type="text"
              contentEditable={false}
            />

            <br />
            <br />

            <TextField
              fullWidth
              value={address?.city}
              label="City"
              variant="outlined"
              type="text"
              contentEditable={false}
            />

            <br />
            <br />

            <TextField
              fullWidth
              value={address?.state}
              label="State"
              variant="outlined"
              contentEditable={false}
            />

            <br />
            <br />

            <TextField
              fullWidth
              value={address?.pin}
              label="PIN"
              variant="outlined"
              type="text"
              contentEditable={false}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography
            align="left"
            variant="overline"
            sx={{ paddingBottom: "10px" }}
          >
            Order Details
          </Typography>
          <Box sx={typoStyle}>
            <TableContainer container={Paper}>
              <Table sx={{ minWidth: "100%" }} aria-label="Products table">
                <TableHead>
                  <TableRow sx={{ background: "#cacaca" }}>
                    <TableCell>
                      <b>SL No.</b>
                    </TableCell>
                    <TableCell>
                      <b>Product Id</b>
                    </TableCell>
                    <TableCell align="left">
                      <b>Title</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Price(&#8377;)</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Quantity</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Category</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Total Price (&#8377;)</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{1}</TableCell>
                    <TableCell>{product?.productId}</TableCell>
                    <TableCell align="left">{product?.title}</TableCell>
                    <TableCell align="center">{product?.price}</TableCell>
                    <TableCell align="center">
                      <TextField
                        sx={{ width: "50px" }}
                        variant="standard"
                        type="number"
                        label="Quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                    </TableCell>
                    <TableCell align="center">{category}</TableCell>
                    <TableCell align="center">
                      {product.price * quantity}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <br />
          <Typography variant="h6">
            Estimated Delivery date is <b>{addDays(new Date(), 7)}</b>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
