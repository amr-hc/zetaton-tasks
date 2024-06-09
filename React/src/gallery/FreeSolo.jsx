import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

export default function FreeSolo({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleButtonClick = () => {
    onSearch(inputValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 800,
        }}
      >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={photoTypes.map((option) => option)}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
              sx={{ flex: 1 }}
            />
          )}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleButtonClick}>
          Search
        </Button>
      </Box>
    </Box>
  );
}

// Array of photo types
const photoTypes = [

];
