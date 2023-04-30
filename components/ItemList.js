import { Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import ItemCard from "./ItemCard";

export default function ItemList(props) {
  const [items, setItems] = useState(props.items);
  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      {items.map((i) => (
        <Grid key={i.id} item xs={4} s={4} md={4} lg={3}>
          <ItemCard item={i} />
        </Grid>
      ))}
    </Grid>
  );
}
