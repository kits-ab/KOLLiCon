import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { types } from '@kokitotsos/react-components';
import './styledKitsKonType.css';

type TypeComponentProps = {
  TypeFormStyled: any;
  TypeSelectStyled: any;
  type: types.TimeslotType;
  handleActivityInputChange: (e: SelectChangeEvent<types.TimeslotType>) => void;
};

const EditTypeComponent: React.FC<TypeComponentProps> = ({
  TypeFormStyled,
  TypeSelectStyled,
  type,
  handleActivityInputChange,
}) => {
  const isValidType = Object.values(types.TimeslotType).includes(type);

  // Filter out menu items for Presentation and ExternalPresentation if type is not Presentation or ExternalPresentation
  const menuItems = Object.keys(types.TimeslotType).map((key) => {
    const timeslotType = types.TimeslotType[key as keyof typeof types.TimeslotType];
    if (
      type !== types.TimeslotType.Presentation &&
      type !== types.TimeslotType.ExternalPresentation &&
      (timeslotType === types.TimeslotType.Presentation ||
        timeslotType === types.TimeslotType.ExternalPresentation)
    ) {
      return null;
    }
    return (
      <MenuItem key={key} value={timeslotType}>
        {key}
      </MenuItem>
    );
  });

  return (
    <FormControl sx={{ ...TypeFormStyled, marginBottom: '3px' }}>
      <InputLabel id='type-label'>Type</InputLabel>
      <Select
       disabled={
        type === types.TimeslotType.Presentation ||
        type === types.TimeslotType.ExternalPresentation
      }
        MenuProps={{
          PaperProps: {
            sx: { ...TypeSelectStyled },
          },
        }}
        labelId='type-label'
        id='activity-type'
        name='type'
        value={isValidType ? type : ''}
        onChange={handleActivityInputChange}
        input={<OutlinedInput label='Type' />}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default EditTypeComponent;
