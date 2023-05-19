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
import { getOrders } from "../../connections/order";
import { AuthContext } from "../../contexts/AuthContext";
import { NavContext } from "../../contexts/NavContext";

export default function Order({ userId }) {
  const { setLoading, setAlert } = useContext(NavContext);
  const { authToken } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setAlert({});

    console.log(userId);

    getOrders(
      { authToken, userId },
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
                <TableCell align="center">{order.totalPrice}</TableCell>
                <TableCell align="center">{order.products.length}</TableCell>
                <TableCell align="center">{order.deliveryDate}</TableCell>
                <TableCell align="center">{order.createdAt}</TableCell>
                <TableCell align="center">{order.updatedAt}</TableCell>
                <TableCell align="center">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
