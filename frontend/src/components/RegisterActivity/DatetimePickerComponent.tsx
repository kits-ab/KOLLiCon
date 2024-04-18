import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import {
  DateTimePickerWrapper,
  ErrorStyled,
  LengthStyled,
} from '@/styles/RegisterActivity/StyledActivity';
import dayjs from 'dayjs';
import { Colors } from '../../styles/Common/colors';
import { RegisterActivity } from '@/types/Activities';
import { svSE } from '@mui/x-date-pickers/locales';
import useSchedule from '@/utils/Hooks/useSchedule';

type DateTimePickerProps = {
  sxDateTimePickerStyles: any;
  DateTimePropsStyles: any;
  activity: RegisterActivity;
  setActivity: React.Dispatch<React.SetStateAction<RegisterActivity>>;
  setIsStartFilled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEndFilled: React.Dispatch<React.SetStateAction<boolean>>;
};

const DateTimePickerComponent: React.FC<DateTimePickerProps> = ({
  sxDateTimePickerStyles,
  DateTimePropsStyles,
  activity,
  setActivity,
  setIsStartFilled,
  setIsEndFilled,
}) => {
  const [error, setError] = React.useState<string>('');
  const [activitiesData, scheduleEndTime, scheduleStartTime, schedulesData] = useSchedule();
  // Function to handle the date change
  const handleDateChange = (name: string, date: Date) => {
    setActivity({ ...activity, [name]: dayjs(date).format('YYYY-MM-DDTHH:mm') });

    if (name === 'start') {
      setIsStartFilled(!!date);
      // Calculate end time when start time changes
      calculateEndTime(dayjs(date).format('YYYY-MM-DDTHH:mm'), activity.duration);
    }
  };

  // Function to calculate end time based on start time and duration
  const calculateEndTime = (start: string, duration?: string) => {
    if (!start || !duration) return;

    const [hours, minutes] = duration.split(':').map((val: string) => parseInt(val));
    const end = dayjs(start).add(hours, 'hours').add(minutes, 'minutes').format('YYYY-MM-DDTHH:mm');
    setActivity({ ...activity, end });
    setIsEndFilled(!!duration);
  };

  // Function to handle the duration change
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setError('');
    if (!value) {
      // If duration becomes empty, set the end time to an empty string
      setActivity({ ...activity, end: '' });
      setIsEndFilled(false);
      return;
    }

    // Check if the input contains a colon (:) to determine if it's in HH:mm format
    if (value.includes(':')) {
      if (!value.split(':')[1]) {
        // Display an error message or handle it as needed
        setError('Fyll i minuter');
        setIsEndFilled(false);
        return;
      }
      const [hours, minutes] = value.split(':').map((val: string) => parseInt(val));
      // Validate hours and minutes
      if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && minutes >= 0 && minutes < 60) {
        // If input is in HH:mm format, calculate end time
        const duration = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        calculateEndTime(activity.start, duration);
        return;
        // Check if minutes are equal to or greater than 60
      } else if (minutes >= 60) {
        // Display an error message or handle it as needed
        setError('Minuter (0-59)');
        setIsEndFilled(false);
        return;
      }
    } else {
      // If no colon is present, assume input is in hours format
      const hours = parseInt(value);
      if (!isNaN(hours) && hours >= 0) {
        const duration = `${hours}:00`;
        calculateEndTime(activity.start, duration);
        return;
      }
    }
  };

  // Function to handle input change in RestrictedLengthStyled
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    // Validate input to allow only numbers and colon
    const sanitizedValue = inputValue.replace(/[^0-9:]/g, '');
    // Call handleDurationChange with sanitized value
    handleDurationChange({
      target: { value: sanitizedValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Function to handle key press in RestrictedLengthStyled
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.which || e.keyCode;
    // Allow only numbers (48-57), colon (58), and specific keyboard keys
    if ((keyCode < 48 || keyCode > 58) && ![8, 9, 37, 39].includes(keyCode)) {
      e.preventDefault();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <DateTimePickerWrapper>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={svSE.components.MuiLocalizationProvider.defaultProps.localeText}
        >
          <MobileDateTimePicker
            ampm={false}
            sx={{ ...sxDateTimePickerStyles }}
            slotProps={DateTimePropsStyles}
            format='YYYY-MM-DD-HH:mm'
            label='Starttid'
            name='start'
            value={activity.start || null}
            minDate={dayjs(scheduleStartTime)}
            onChange={(date: any) => handleDateChange('start', date)}
          />
          <LengthStyled
            sx={{ ...sxDateTimePickerStyles }}
            name='duration'
            value={activity.duration}
            placeholder='Längd (HH:mm)'
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            inputProps={{
              maxLength: 5,
            }}
          />
        </LocalizationProvider>
      </DateTimePickerWrapper>
      {error === 'Fyll i minuter' && (
        <ErrorStyled
          style={{
            height: '2px',
            margin: '5px 0 7px 47%',
            fontSize: '13px',
            color: `${Colors.attentionColor}`,
          }}
        >
          {error}
        </ErrorStyled>
      )}
      {error === 'Minuter (0-59)' && (
        <ErrorStyled style={{ height: '2px', margin: '5px 0 7px 47%', fontSize: '13px' }}>
          {error}
        </ErrorStyled>
      )}
    </div>
  );
};

export default DateTimePickerComponent;
