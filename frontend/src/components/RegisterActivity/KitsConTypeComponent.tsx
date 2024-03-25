import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { types } from '@kokitotsos/react-components';

type TypeComponentProps = {
  TypeFormStyled: any;
  TypeSelectStyled: any;
  type: types.TimeslotType;
  handleActivityInputChange: (e: SelectChangeEvent<types.TimeslotType>) => void;
};

const TypeComponent: React.FC<TypeComponentProps> = ({
  TypeFormStyled,
  TypeSelectStyled,
  type,
  handleActivityInputChange,
}) => {
  return (
    <FormControl sx={{ ...TypeFormStyled }}>
      <InputLabel id='type-label'>Type</InputLabel>
      <Select
        MenuProps={{
          PaperProps: {
            sx: { ...TypeSelectStyled },
          },
        }}
        labelId='type-label'
        id='activity-type'
        name='type'
        value={type}
        onChange={handleActivityInputChange}
        input={<OutlinedInput label='Type' />}
      >
        {Object.keys(types.TimeslotType).map((key) => (
          <MenuItem key={key} value={types.TimeslotType[key as keyof typeof types.TimeslotType]}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeComponent;
