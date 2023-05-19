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
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { getCategories } from "../../../connections/category";
import { deleteProduct, getProductsBy } from "../../../connections/product";
import { NavContext } from "../../../contexts/NavContext";

export default function ProductList({ callback, authToken }) {
  const { alert, setAlert, loading, setLoading } = useContext(NavContext);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orderBy, setOrderBy] = useState("ASC");
  const [sortBy, setSortBy] = useState("title");
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleQueryChange = (e) => setQuery(e.target.value);
  const handleOrderByChange = (e) => setOrderBy(e.target.value);
  const handleSortByChange = (e) => setSortBy(e.target.value);

  const handleUpdateClick = (productDetails) =>
    callback("update", productDetails);

  const filterByQuery = () => {
    setLoading(true);
    setFilteredProducts(
      products.filter((ad) => ad.title.toLowerCase().includes(query))
    );
    setLoading(false);
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(
      { authToken, productId },
      {
        success: (res) => {
          setLoading(false);
          // const data = res.data.data;
          setProducts([...products.filter((p) => p.productId !== productId)]);
          // console.log(categories[0]);
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
  };

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

    getProductsBy(
      { order: orderBy, sort: sortBy },
      {
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
      }
    );
  }, [sortBy, orderBy]);

  const component = (row, i) => (
    <TableRow
      key={row.productId}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {i + 1}
      </TableCell>
      <TableCell component="th" scope="row">
        {row.productId}
      </TableCell>
      <TableCell align="left">{row.title}</TableCell>
      <TableCell align="center">{row.price}</TableCell>
      <TableCell align="center">{row.stock}</TableCell>
      <TableCell align="center">
        {categories.find((cat) => cat.categoryId === row.categoryId)?.name}
      </TableCell>
      <TableCell align="center">{row.updatedAt?.split("T")[0]}</TableCell>
      <TableCell align="right">
        <Button
          variant="outlined"
          color="error"
          onClick={(e) => handleDeleteProduct(row.productId)}
        >
          Delete
        </Button>
        &nbsp;
        <Button
          variant="outlined"
          color="warning"
          onClick={(e) => {
            handleUpdateClick(row);
          }}
        >
          Update
        </Button>
        &nbsp;
        <Button
          variant="outlined"
          color="success"
          component="a"
          target="_blank"
          href={`http://localhost:3000/view/product/${row.productId}`}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      <Grid container alignContent={"center"} justifyContent={"center"}>
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
              disabled={loading}
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
              disabled={loading}
            >
              <MenuItem value="ASC">ASC</MenuItem>
              <MenuItem value="DESC">DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        &nbsp;
        <Grid item xs={12} sm={12} md={12} lg={12}>
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
                    <b>Stock</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Category</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Updated At</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {query
                  ? filteredProducts.map(component)
                  : products.map(component)}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
