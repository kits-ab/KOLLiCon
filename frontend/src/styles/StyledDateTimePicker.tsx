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
    },
    "& .MuiButtonBase-root": {
        color: "red",
      },"&.mui-selected": {
        backgroundcolor: 'red',
      },
  };
  
  export const slotPropsStyles = {
    actionBar: { sx: { backgroundColor: '#414141' } },
    calendarHeader: { sx: { backgroundColor: '#414141' } },
    mobilePaper: { sx: { backgroundColor: '#414141' } },
    toolbar: { sx: { backgroundColor: '#414141' } },
    textField: { size: 'small' },
  };