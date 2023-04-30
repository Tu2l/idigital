import { Alert, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    //validate passwod
    if (password.length < 5) {
      setAlert({
        severity: "error",
        message: "Password must be greater than or equal to 5 characters",
      });

      return;
    }

    setAlert({});
    //submit request for login
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{
          marginTop: "10%",
        }}
      >
        <Grid
          style={{
            backgroundColor: "#ecedee",
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
          }}
          item
          xs={4}
        >
          <h1>Login</h1>
          <TextField
            fullWidth
            value={email}
            onChange={handleEmailChange}
            label="Email"
            variant="outlined"
            type="email"
            required
          />

          <br />
          <br />

          <TextField
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            label="Password"
            variant="outlined"
            type="password"
            required
          />

          <br />
          <br />

          <Button fullWidth variant="contained" type="submit">
            Login
          </Button>
          <br />
          {alert.message ? (
            <Alert severity={alert.severity}>{alert.message}</Alert>
          ) : null}
        </Grid>
      </Grid>
    </form>
  );
}
