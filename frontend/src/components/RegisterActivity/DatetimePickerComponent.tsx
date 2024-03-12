import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DateTimePickerWrapper, LengthStyled } from '@/styles/RegisterActivity/StyledActivity';

type DateTimePickerProps = {
  sxDateTimePickerStyles: any;
  DateTimePropsStyles: any;
  activity: any;
  handleDateChange: any;
  handleDurationChange: any;
};

const DateTimePickerComponent: React.FC<DateTimePickerProps> = ({
  sxDateTimePickerStyles,
  DateTimePropsStyles,
  activity,
  handleDateChange,
  handleDurationChange
}) => {
  return (
    <DateTimePickerWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker
          ampm={false}
          sx={{ ...sxDateTimePickerStyles }}
          slotProps={DateTimePropsStyles}
          format='YYYY-MM-DD-HH:mm'
          label='Starttid'
          name='start'
          value={activity.start || null}
          onChange={(date: any) => handleDateChange('start', date)}
          
        />
        <LengthStyled
          sx={{ ...sxDateTimePickerStyles }}
          name='duration'
          type="number"
          value={activity.duration}
          placeholder='Längd (Timmar)'
          onChange={handleDurationChange}
        />
      </LocalizationProvider>
    </DateTimePickerWrapper>
  );
};

export default DateTimePickerComponent;
