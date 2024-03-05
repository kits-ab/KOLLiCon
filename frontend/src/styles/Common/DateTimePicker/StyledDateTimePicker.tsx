export const sxDateTimePickerStyles = {
  width: '36%',
  '& .MuiInputBase-root': {
    color: 'gray',
    border: '1px solid #3A3A39',
    backgroundColor: '#262626',
    borderRadius: '4px',
  },
  '& .MuiFormLabel-root': {
    color: 'gray',
  },
  '& .MuiPaper-root': {
    color: 'black',
  },
};

type DateTimePickerSlotsComponentsProps<T> = {
  actionBar?: T;
  calendarHeader?: T;
  mobilePaper?: T;
  toolbar?: T;
  textField?: T;
};

export const DateTimePropsStyles: DateTimePickerSlotsComponentsProps<any> = {
  actionBar: { sx: { backgroundColor: '#b2b2b2' } },
  calendarHeader: { sx: { backgroundColor: '#b2b2b2' } },
  mobilePaper: { sx: { backgroundColor: '#b2b2b2' } },
  toolbar: { sx: { backgroundColor: '#b2b2b2' } },
  textField: { size: 'small'},
};
