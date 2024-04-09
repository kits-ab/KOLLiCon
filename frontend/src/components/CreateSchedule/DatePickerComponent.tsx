import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
  DatePickerWrapper,
  DateTimePropsStyles,
  sxDateTimePickerStyles,
} from '@/styles/Common/DateTimePicker/StyledDateTimePicker';
import { CreateSchedule } from '@/types/Schedule';

type DatePickerWrapperProps = {
  schedule: CreateSchedule;
  setSchedule: React.Dispatch<React.SetStateAction<CreateSchedule>> | any;
};

const DatePickerComponent: React.FC<DatePickerWrapperProps> = ({ schedule, setSchedule }) => {
    const handleDateChange = (name: string, date: Date) => {
        setSchedule({ ...schedule, [name]: dayjs(date).format('YYYY-MM-DD') });
      };
  return (
    <DatePickerWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          label='Starttid'
          format='YYYY-MM-DD'
          sx={{ ...sxDateTimePickerStyles }}
          slotProps={DateTimePropsStyles}
          value={schedule.start || null}
          onChange={(date: Date | any) => handleDateChange('start', date)}
        />
        <MobileDatePicker
          label='Sluttid'
          format='YYYY-MM-DD'
          sx={{ ...sxDateTimePickerStyles }}
          slotProps={DateTimePropsStyles}
          value={schedule.end || null}
          onChange={(date: Date | any) => handleDateChange('end', date)}
        />
      </LocalizationProvider>
    </DatePickerWrapper>
  );
};

export default DatePickerComponent;
