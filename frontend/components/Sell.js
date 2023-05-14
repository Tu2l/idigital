import React, { useState } from "react";
import {
  Alert,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function Sell() {
  const [fileList, setFileList] = useState([]);
  const [showWarning, setShowWarning] = useState(true);

  const handleFileChange = (e) => {
    setShowWarning(e.target.files.length < 2 || e.target.files.length > 5);
    setFileList([...e.target.files]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    //files to be send
    const data = new FormData();
    fileList.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid
          style={{
            backgroundColor: "#ecedee",
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
          }}
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
        >
          <h1>Sell a furniture</h1>
          {showWarning ? (
            <>
              <Alert severity={"warning"}>Min 2 image and max 5 images</Alert>
              <br />
            </>
          ) : null}

          <Button
            variant={showWarning ? "outlined" : "contained"}
            sx={{
              background: showWarning ? "red" : "green",
              color: "white",
            }}
            component="label"
            fullWidth
          >
            Select Images to Upload
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              multiple
              hidden
            />
          </Button>

          <ul>
            {fileList.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
          {/* <br /> */}
          <br />

          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            type="text"
            required
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Product Price (RS)"
            variant="outlined"
            type="number"
            required
          />
          <br />
          <br />

          <TextField
            fullWidth
            label="Product Description"
            variant="outlined"
            type="text"
            multiline
            rows={4}
            required
          />
          <br />
          <br />
          <FormControl fullWidth required>
            <InputLabel id="product-category">Product Category</InputLabel>
            <Select
              labelId="product-category"
              // value={age}
              label="Age"
              // onChange={handleChange}
              defaultValue="chair"
            >
              <MenuItem value={"chair"}>Chair</MenuItem>
              <MenuItem value={"table"}>Table</MenuItem>
              <MenuItem value={"tvconsole"}>TV Console</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <Button
            variant="contained"
            type="submit"
            disabled={showWarning}
            fullWidth
          >
            Submit Sell Request
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
