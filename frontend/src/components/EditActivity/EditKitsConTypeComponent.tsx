import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { types } from '@kokitotsos/react-components';
import { RegisterActivity } from '@/types/Activities';

type TypeComponentProps = {
  TypeFormStyled: any;
  TypeSelectStyled: any;
  type: types.TimeslotType;
  setActivity: RegisterActivity | any;
  activity: RegisterActivity;
};

const EditTypeComponent: React.FC<TypeComponentProps> = ({
  TypeFormStyled,
  TypeSelectStyled,
  type,
  setActivity,
  activity,
}) => {
  function handleActivityInputChange(e: any) {
    const { name, value } = e.target;
    if (name === 'type' && value) {
      setActivity({ ...activity, type: value as types.TimeslotType });
    }
  }

  const isValidType = Object.values(types.TimeslotType).includes(type);

  return (
    <FormControl sx={{ ...TypeFormStyled, marginBottom: '3px' }}>
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
        value={isValidType ? type : ''}
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

export default EditTypeComponent;
