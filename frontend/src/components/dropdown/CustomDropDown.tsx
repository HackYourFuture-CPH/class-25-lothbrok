import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

type DropdownType = {
  options: string[];
  selectedValue: string;
  fieldName: string;
  handleInputChange: (fieldName: string, e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Dropdown = ({
  options,
  selectedValue,
  fieldName,
  handleInputChange,
}: DropdownType) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'></InputLabel>
        <NativeSelect value={selectedValue} onChange={(e) => handleInputChange(fieldName, e)}>
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
