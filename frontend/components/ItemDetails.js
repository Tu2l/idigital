import { Grid, Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";

export default function ItemDetails({ authToken, product, images, category }) {
  const router = useRouter();

  const typoStyle = {
    padding: "10px",
    border: "solid",
    borderWidth: "thin",
    borderColor: "black",
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Carousel>
            {images.map((url, i) => (
              <Box
                key={i}
                component="img"
                sx={{
                  width: "100%",
                  height: "inherit",
                }}
                alt={product?.title}
                src={url}
              />
            ))}
          </Carousel>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={typoStyle}>
            <Box sx={typoStyle}>
              <Typography gutterBottom align="left" variant="h3">
                {product.title}
              </Typography>
            </Box>
            <Box sx={typoStyle}>
              <Typography gutterBottom align="left" variant="p">
                <strong>{category} </strong>
              </Typography>
            </Box>
            <Box sx={typoStyle}>
              <Typography gutterBottom align="left" variant="p">
                {product.description}
              </Typography>
            </Box>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={typoStyle}
            >
              &#8377;{product.price}
            </Typography>
            {!authToken ? (
              <Typography
                gutterBottom
                variant="overline"
                component="div"
                // sx={typoStyle}
              >
                You need to <strong>Login</strong> to Buy or Add to cart
              </Typography>
            ) : null}
            {/* <Button variant="contained" disabled={!authToken}>
              Add to Cart
            </Button> */}
            &nbsp;
            <Button
              variant="contained"
              disabled={!authToken}
              onClick={(e) =>
                router.push(`${router.basePath}/order/${product.productId}`)
              }
            >
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
