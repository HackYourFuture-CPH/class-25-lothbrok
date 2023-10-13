import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

type DropdownType = {
  options: string[];
  defaultValue: string;
};

export const Dropdown = ({ options, defaultValue }: DropdownType) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as string);
  };
  console.log(selectedValue);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'></InputLabel>
        <NativeSelect value={selectedValue} onChange={handleChange}>
          {options.map((option: string, index: number) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};
