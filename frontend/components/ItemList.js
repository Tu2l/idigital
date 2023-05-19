import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../connections/product";
import { NavContext } from "../contexts/NavContext";

export default function ItemList({ callback }) {
  const [products, setProducts] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const { searchQuery, loading, setLoading, setAlert } = useContext(NavContext);

  const filterProductsByQuery = () => {
    setLoading(true);
    if (searchQuery)
      setFilteredList(
        products?.filter((prod) =>
          prod.title.toLowerCase().includes(searchQuery?.toLowerCase())
        )
      );
    setLoading(false);
  };

  useEffect(() => {
    filterProductsByQuery();
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    setAlert({});

    getProducts({
      success: (res) => {
        const data = res.data.data;
        // console.log(data);
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
    });
  }, []);

  const component = (product) => (
    <Grid key={product.productId} item xs={6} sm={4} md={3} lg={3}>
      <ItemCard product={product} callback={callback} />
    </Grid>
  );

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      justifyContent="center"
      style={{
        padding: "20px",
      }}
    >
      {loading ? (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h5" align="center">
            Loading please wait
          </Typography>
        </Grid>
      ) : searchQuery ? (
        filteredList.map(component)
      ) : (
        products.map(component)
      )}
    </Grid>
  );
}
