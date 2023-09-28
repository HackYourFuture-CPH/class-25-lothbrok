import React from "react";
import './SearchBar.css';
import { Paper, InputBase, IconButton } from "@mui/material";

const SearchBar = () => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", alignItems: "center", width: 213 }}
      id="paper"
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <img className="img-search-icon" src="/assets/icons/search.svg" />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search anything..."
        inputProps={{ "aria-label": "search anything" }}
      />
    </Paper>
  );
};

export default SearchBar;