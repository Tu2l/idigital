import {
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import ItemCard from "./ItemCard";

export default function ItemList(props) {
  const [items, setItems] = useState(props.items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

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
      ) : (
        items.map((i) => (
          <Grid key={i.id} item xs={12} sm={6} md={4} lg={4}>
            <ItemCard item={i} />
          </Grid>
        ))
      )}

      {/* <Grid
        sx={{
          display: "flex",
          justifyContent: "end",
          padding: "20px",
        }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Button variant="contained">Pre</Button>
        <Button variant="contained">Next</Button>

        <FormControl sx={{ width: "100px" }}>
          <InputLabel id="items-per-page-select">Items</InputLabel>
          <Select
            labelId="items-per-page-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </Grid> */}
    </Grid>
  );
}
