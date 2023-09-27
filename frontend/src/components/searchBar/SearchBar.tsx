import React from 'react';
import './SearchBar.css';
import { Paper, InputBase, IconButton } from '@mui/material';

const SearchBar = () => {
  return (
    <Paper
      component='form'
      sx={{ p: '10px 12px', display: 'flex', alignItems: 'center', width: 213, borderRadius: '8' }}
    >
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
        <img src='../../assets/icons/search.png' />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search anything...'
        inputProps={{ 'aria-label': 'Search anything' }}
      />
    </Paper>
  );
};

export default SearchBar;
