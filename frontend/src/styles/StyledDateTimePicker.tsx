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
    actionBar: { sx: { backgroundColor: '#595959' } },
    calendarHeader: { sx: { backgroundColor: '#595959' } },
    mobilePaper: { sx: { backgroundColor: '#595959' } },
    toolbar: { sx: { backgroundColor: '#595959' } },
    textField: { size: 'small' },
  };