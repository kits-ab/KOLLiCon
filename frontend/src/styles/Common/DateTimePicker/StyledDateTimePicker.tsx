export const sxStyles = {
    width: '36%',
    '& .MuiInputBase-root': {
      color: 'gray',
      border: '1px solid gray',
      backgroundColor: '#424241',
      borderRadius: '6px',
    },
    '& .MuiFormLabel-root': {
      color: '#cccccc',
    },
    '& .MuiPaper-root': {
      color: 'black',
    }
  };

  type DateTimePickerSlotsComponentsProps<T> = {
    actionBar?: T;
    calendarHeader?: T;
    mobilePaper?: T;
    toolbar?: T;
    textField?: T;
  };
  
  export const slotPropsStyles: DateTimePickerSlotsComponentsProps<any> = {
    actionBar: { sx: { backgroundColor: '#b2b2b2' } },
    calendarHeader: { sx: { backgroundColor: '#b2b2b2' } },
    mobilePaper: { sx: { backgroundColor: '#b2b2b2' } },
    toolbar: { sx: { backgroundColor: '#b2b2b2' } },
    textField: { size: 'small' },
  };