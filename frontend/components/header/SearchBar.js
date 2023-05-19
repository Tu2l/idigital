import { TextField, Box, Button, Divider } from "@mui/material";
import React, { useContext } from "react";
import { NavContext } from "../../contexts/NavContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(NavContext);
  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);

  const style = {
    display: "flex",
    padding: "10px",
  };
  return (
    <Box sx={style}>
      <TextField
        fullWidth
        value={searchQuery}
        onChange={handleSearchQueryChange}
        label="Search"
        variant="filled"
        type="text"
        placeholder="Chair"
        required
      />
    </Box>
  );
}
