import { Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import ItemCard from "./ItemCard";

export default function ItemList(props) {
  const [items, setItems] = useState(props.items);

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
      {items.map((i) => (
        <Grid key={i.id} item xs={12} sm={6} md={4} lg={4}>
          <ItemCard item={i} />
        </Grid>
      ))}
    </Grid>
  );
}
