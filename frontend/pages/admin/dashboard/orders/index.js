import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import BackButton from "../../../../components/BackButton";
import { getAllOrders, updateOrderStatus } from "../../../../connections/order";
import { AuthContext } from "../../../../contexts/AuthContext";
import { NavContext } from "../../../../contexts/NavContext";

export default function Index() {
  const { setLoading, setAlert } = useContext(NavContext);
  const { authToken, isAdmin } = useContext(AuthContext);
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.title = "Admin: Orders";
    if (!authToken || !isAdmin) router.push(`${router.basePath}/admin`);
  }, [authToken]);

  useEffect(() => {
    setLoading(true);
    setAlert({});
    getAllOrders(
      { authToken },
      {
        success: (res) => {
          setLoading(false);
          // console.log(res.data.data);
          setOrders(res.data.data);
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
  }, []);

  return (
    <Container>
      <BackButton />
      <br /> <br />
      {/* {authToken && isAdmin ? <ProductPanel /> : null} */}
      <TableContainer container={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="Products table">
          <TableHead>
            <TableRow sx={{ background: "#cacaca" }}>
              <TableCell>
                <b>SL No.</b>
              </TableCell>
              <TableCell>
                <b>Order Id</b>
              </TableCell>
              <TableCell align="left">
                <b>User Id</b>
              </TableCell>
              <TableCell align="center">
                <b>Total Price (&#8377;)</b>
              </TableCell>
              <TableCell align="center">
                <b>No.of Products</b>
              </TableCell>
              <TableCell align="center">
                <b>Delivery Date</b>
              </TableCell>
              <TableCell align="center">
                <b>Ordered At</b>
              </TableCell>
              <TableCell align="center">
                <b>Updated At</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order, i) => (
              <TableRow key={order.orderId}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{order.orderId}</TableCell>
                <TableCell align="left">{order.userId}</TableCell>
                <TableCell align="center">{order.totalPrice}</TableCell>
                <TableCell align="center">{order.products.length}</TableCell>
                <TableCell align="center">{order.deliveryDate}</TableCell>
                <TableCell align="center">{order.createdAt}</TableCell>
                <TableCell align="center">{order.updatedAt}</TableCell>
                <TableCell align="center">
                  <OrderStatuOption
                    selected={order.status}
                    orderId={order.orderId}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

function OrderStatuOption({ selected, orderId }) {
  const status = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "FAILED",
    "CANCELLED",
  ];
  const { authToken } = useContext(AuthContext);
  const { setAlert, loading, setLoading } = useContext(NavContext);

  const [orderStatus, setOrderStatus] = useState(selected);
  const handleOrderStatusChange = (e) => {
    setOrderStatus(e.target.value);
    setAlert({});
    updateOrderStatus(
      { authToken, orderId, status: e.target.value },
      {
        success: (res) => {
          console.log(res.data.data);
          setLoading(false);
          setAlert({
            severity: "success",
            message: "Status updated successfully",
          });
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

  return (
    <Select
      labelId="status"
      value={orderStatus}
      onChange={handleOrderStatusChange}
      disabled={loading}
      sx={{ width: "120px", fontSize: "0.8rem" }}
    >
      {status.map((row, i) => {
        return (
          <MenuItem key={i} value={row}>
            {row}
          </MenuItem>
        );
      })}
    </Select>
  );
}
