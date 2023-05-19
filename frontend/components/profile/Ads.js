import {
  Button,
  Grid,
  Paper,
  Table,
  TableContainer,
  TextField,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { getAdsByUser } from "../../connections/ads";
import { getCategories } from "../../connections/category";
import { AuthContext } from "../../contexts/AuthContext";
import { NavContext } from "../../contexts/NavContext";

export default function Ads({ userId }) {
  const { authToken } = useContext(AuthContext);
  const { loading, setLoading, setAlert } = useContext(NavContext);
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    setAlert({});

    getCategories(
      { authToken },
      {
        success: (res) => {
          setLoading(false);
          const data = res.data.data;
          setCategories(data);
        },
        error: (err) => {
          setLoading(false);
          const msg = err?.response?.data?.message;
          setAlert({
            severity: "error",
            message: msg ? msg : err.message,
          });
        },
      }
    );

    getAdsByUser(
      { userId, authToken },
      {
        success: (res) => {
          setLoading(false);
          setAds(res.data.data);
        },
        error: (err) => {
          setLoading(false);
          const msg = err?.response?.data?.message;
          setAlert({
            severity: "error",
            message: msg ? msg : err.message,
          });
        },
      }
    );
  }, []);

  const adsComponent = (row, i) => (
    <TableRow
      key={row.adId}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {i + 1}
      </TableCell>
      <TableCell align="left">{row.title}</TableCell>
      <TableCell align="center">{row.price}</TableCell>
      <TableCell align="center">{row.quantity}</TableCell>
      <TableCell align="center">
        {categories.find((cat) => cat.categoryId === row.categoryId)?.name}
      </TableCell>
      <TableCell align="center">{row.updatedAt?.split("T")[0]}</TableCell>
      <TableCell align="center">{row.quantity * row.price}</TableCell>
      <TableCell align="center">
        <Button
          variant="text"
          color={
            row.status === "PENDING"
              ? "warning"
              : row.status === "REJECTED"
              ? "error"
              : "success"
          }
          component="p"
        >
          {row.status}
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button
          variant="outlined"
          color="success"
          component="a"
          target="_blank"
          href={`http://localhost:3000/view/ad/${row.adId}`}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer container={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="Products table">
        <TableHead>
          <TableRow sx={{ background: "#cacaca" }}>
            <TableCell>
              <b>SL No.</b>
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
              <b>Updated At</b>
            </TableCell>
            <TableCell align="center">
              <b>Total Price (&#8377;)</b>
            </TableCell>
            <TableCell align="center">
              <b>Status</b>
            </TableCell>
            <TableCell align="right">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{ads.map(adsComponent)}</TableBody>
      </Table>
    </TableContainer>
  );
}
