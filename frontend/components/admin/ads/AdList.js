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
import { getAdsBy, getAdsByStatus } from "../../../connections/ads";
import { getCategories } from "../../../connections/category";
import { AuthContext } from "../../../contexts/AuthContext";
import { NavContext } from "../../../contexts/NavContext";

export default function AdList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orderBy, setOrderBy] = useState("ASC");
  const [sortBy, setSortBy] = useState("title");
  const [adStatus, setAdStatus] = useState("ALL");
  const [reload, setReload] = useState(1);
  const [query, setQuery] = useState("");
  const [filteredAds, setFilteredAds] = useState([]);

  const { loading, setLoading, setAlert } = useContext(NavContext);
  const { authToken } = useContext(AuthContext);

  const handleQueryChange = (e) => setQuery(e.target.value);
  const handleOrderByChange = (e) => setOrderBy(e.target.value);
  const handleSortByChange = (e) => setSortBy(e.target.value);
  const handleAdStatusChange = (e) => {
    if (e.target.value === "ALL" && e.target.value !== adStatus)
      setReload(reload + 1);

    setAdStatus(e.target.value);
  };

  const adsResponse = {
    success: (res) => {
      const data = res.data.data;
      setLoading(false);
      setProducts(data);
    },
    error: (err) => {
      setLoading(false);
      const msg = err?.response?.data?.message;
      setAlert({
        severity: "error",
        message: msg ? msg : err.message,
      });

      console.log(msg ? msg : err.message);
    },
  };

  const filterByQuery = () => {
    setLoading(true);
    setFilteredAds(
      products.filter((ad) => ad.title.toLowerCase().includes(query))
    );
    setLoading(false);
  };

  const filterAdsByStatus = () => {
    if (adStatus === "ALL") return;
    setLoading(true);
    getAdsByStatus({ authToken, status: adStatus }, adsResponse);
  };

  useEffect(() => {
    filterAdsByStatus();
  }, [adStatus]);

  useEffect(() => {
    filterByQuery();
  }, [query]);

  useEffect(() => {
    setLoading(true);
    if (categories.length === 0) {
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
    }

    getAdsBy({ authToken, order: orderBy, sort: sortBy }, adsResponse);
  }, [sortBy, orderBy, reload]);

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
      <TableCell component="th" scope="row">
        {row.adId}
      </TableCell>
      <TableCell align="left">{row.userId}</TableCell>
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
    <>
      <Grid
        container
        alignContent={"center"}
        justifyContent={"center"}
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            placeholder="Search"
            type="text"
            value={query}
            onChange={handleQueryChange}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <FormControl>
            <InputLabel id="status-select-label">Sort By</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={sortBy}
              label="Sort By"
              onChange={handleSortByChange}
              disabled={loading || adStatus !== "ALL"}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="updatedAt">Updated At</MenuItem>
            </Select>
          </FormControl>
          &nbsp;
          <FormControl>
            <InputLabel id="status-select-label">Order by</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={orderBy}
              label="order By"
              onChange={handleOrderByChange}
              disabled={loading || adStatus !== "ALL"}
            >
              <MenuItem value="ASC">ASC</MenuItem>
              <MenuItem value="DESC">DESC</MenuItem>
            </Select>
          </FormControl>
          &nbsp;
          <FormControl>
            <InputLabel id="status-select-label">Ad Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={adStatus}
              label="Ad Status"
              onChange={handleAdStatusChange}
              disabled={loading}
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="ACCEPTED">Accepted</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TableContainer container={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="Products table">
              <TableHead>
                <TableRow sx={{ background: "#cacaca" }}>
                  <TableCell>
                    <b>SL No.</b>
                  </TableCell>
                  <TableCell>
                    <b>Ad Id</b>
                  </TableCell>
                  <TableCell>
                    <b>User Id</b>
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
              <TableBody>
                {query
                  ? filteredAds.map(adsComponent)
                  : products.map(adsComponent)}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
