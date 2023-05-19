import { Grid, Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { acceptAd, rejectAd } from "../connections/ads";
import { AuthContext } from "../contexts/AuthContext";
import { NavContext } from "../contexts/NavContext";

export default function AdDetails({ authToken, ad, images, category }) {
  const { loading, setLoading, setAlert } = useContext(NavContext);
  const { isAdmin } = useContext(AuthContext);

  const router = useRouter();

  const typoStyle = {
    padding: "10px",
    border: "solid",
    borderWidth: "thin",
    borderColor: "black",
  };

  const resCallback = {
    success: (res) => {
      setLoading(false);
      router.reload(window.location.pathname);
    },
    error: (err) => {
      setLoading(false);
      const msg = err?.response?.data?.message;
      setAlert({
        severity: "error",
        message: msg ? msg : err.message,
      });
    },
  };

  const handleAccept = () => {
    setLoading(true);
    setAlert({});
    acceptAd({ authToken, adId: ad.adId }, resCallback);
  };

  const handleReject = () => {
    setLoading(true);
    setAlert({});
    rejectAd({ authToken, adId: ad.adId }, resCallback);
  };

  useEffect(() => {
    console.log(isAdmin);
  }, []);

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
                alt={ad?.title}
                src={url}
              />
            ))}
          </Carousel>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={typoStyle}>
            <Box sx={typoStyle}>
              <Typography gutterBottom align="left" variant="h3">
                {ad.title}
              </Typography>
            </Box>
            <Box sx={typoStyle}>
              <Typography gutterBottom align="left" variant="p">
                <strong>{category} </strong>
              </Typography>
            </Box>
            <Box sx={typoStyle}>
              <Typography gutterBottom align="left" variant="p">
                {ad.description}
              </Typography>
            </Box>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={typoStyle}
            >
              &#8377;{ad.price}
            </Typography>

            {!authToken || !isAdmin ? (
              <Typography
                gutterBottom
                variant="overline"
                component="div"
                sx={{ color: "red" }}
              >
                You need to <strong>Login</strong> as Admin to Accept or Reject
                the ad
              </Typography>
            ) : ad.status === "PENDING" ? (
              <>
                <Button
                  variant="contained"
                  color="error"
                  disabled={!authToken || loading}
                  onClick={handleReject}
                >
                  Reject
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="success"
                  disabled={!authToken || loading}
                  onClick={handleAccept}
                >
                  Accept
                </Button>
              </>
            ) : (
              <Button fullWidth variant="text" color="warning">
                {ad.status}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
