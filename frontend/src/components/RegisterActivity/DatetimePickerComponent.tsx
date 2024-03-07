import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import   {DateTimePickerWrapper} from '@/styles/RegisterActivity/StyledActivity';

type DateTimePickerProps = {
  sxDateTimePickerStyles: any;
  DateTimePropsStyles: any;
  activity: any;
  handleDateChange: any;
};

const DateTimePickerComponent: React.FC<DateTimePickerProps> = ({
  sxDateTimePickerStyles,
  DateTimePropsStyles,
  activity,
  handleDateChange,
}) => {
  return (
    <DateTimePickerWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          ampm={false}
          sx={{ ...sxDateTimePickerStyles }}
          slotProps={DateTimePropsStyles}
          label='Starttid'
          name='start'
          value={activity.start || null}
          onChange={(date: any) => handleDateChange('start', date)}
        />

        <DateTimePicker
          ampm={false}
          sx={{ ...sxDateTimePickerStyles }}
          slotProps={DateTimePropsStyles}
          label='Sluttid'
          name='end'
          value={activity.end || null}
          onChange={(date: any) => handleDateChange('end', date)}
        />
      </LocalizationProvider>
    </DateTimePickerWrapper>
  );
};

export default DateTimePickerComponent;
