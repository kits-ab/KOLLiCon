import { Colors } from '../colors';
export const sxDateTimePickerStyles = {
  width: '41.5%',
  '& .MuiInputBase-root': {
    color: 'gray',
    border: `1px solid ${Colors.primaryBorder}`,
    backgroundColor: `${Colors.primaryBackground}`,
    borderRadius: '4px',
    fontSize: '15px',
  },
  '& .MuiFormLabel-root': {
    color: 'gray',
  },
  '& .MuiPaper-root': {
    color: 'black',
  },
  '& .MuiIconButton-root .MuiSvgIcon-root': {
    color: 'gray',
    
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: `${Colors.primaryAddButton}`,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: `${Colors.primaryAddButton}`,
  }
  
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
  textField: { size: 'small' },
};
