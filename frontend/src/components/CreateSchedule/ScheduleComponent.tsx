import React, { useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import {
  BoxWrapper1,
  CancelButton,
  EventsWrapper,
  GlobalBox,
  HeaderStyled,
  InputStyled,
  SaveButton,
  StyledDiv,
  StyledLine,
  StyledLine1,
  TextAreaStyled,
} from '@/styles/RegisterActivity/StyledActivity';
import { GlobalStyles, Text } from '@kokitotsos/react-components';
import {
  DateTimePropsStyles,
  sxDateTimePickerStyles,
  DatePickerWrapper,
} from '@/styles/Common/DateTimePicker/StyledDateTimePicker';
import { Colors } from '@/styles/Common/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

type scheduleType = {
  userId: string;
  title: string;
  type: string;
  tagLine: string;
  description: string;
  imageURL: string;
  location: string;
  active: boolean;
  start: string;
  end: string;
};

const backendIP = import.meta.env.VITE_API_URL;

function ScheduleComponent({ onClose, onOpen, openScheduleModal }: any) {
  const [schedule, setSchedule] = useState<scheduleType>({
    userId: '',
    type: '',
    start: '',
    end: '',
    title: '',
    description: '',
    tagLine: '',
    imageURL: '',
    location: '',
    active: true,
  });

  // Function to check if all fields except userId are filled
  const areAllFieldsFilled = () => {
    const { userId, ...otherFields } = schedule;
    return Object.values(otherFields).every((value) => value !== '');
  };

  const handleDateChange = (name: string, date: Date) => {
    setSchedule({ ...schedule, [name]: dayjs(date).format('YYYY-MM-DD') });
  };

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${backendIP}/api/schedule/post`, schedule);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting schedule:', error);
    }
  };

  return (
    <div>
      <SwipeableDrawer
        anchor='bottom'
        open={openScheduleModal}
        onClose={onClose}
        onOpen={onOpen}
        PaperProps={{
          style: {
            height: '100%',
            overflow: 'scroll',
            backgroundColor: `${Colors.primaryBackground}`,
            borderRadius: '0',
          },
        }}
      >
        <GlobalBox>
          <GlobalStyles />
          <Text>
            <HeaderStyled>
              <h3>Nytt Schema</h3>
            </HeaderStyled>
            <StyledLine />
            <EventsWrapper>
              <form onSubmit={handleSubmit}>
                <StyledDiv>
                  <InputStyled
                    type='text'
                    name='type'
                    placeholder='Type'
                    value={schedule.type}
                    onChange={handleOnInputChange}
                  />
                  <DatePickerWrapper>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        label='Starttid'
                        sx={{ ...sxDateTimePickerStyles }}
                        slotProps={DateTimePropsStyles}
                        value={schedule.start || null}
                        onChange={(date: Date | any) => handleDateChange('start', date)}
                      />
                      <MobileDatePicker
                        label='Sluttid'
                        sx={{ ...sxDateTimePickerStyles }}
                        slotProps={DateTimePropsStyles}
                        value={schedule.end || null}
                        onChange={(date: Date | any) => handleDateChange('end', date)}
                      />
                    </LocalizationProvider>
                  </DatePickerWrapper>
                  <InputStyled
                    type='text'
                    name='title'
                    placeholder='Titel'
                    value={schedule.title}
                    onChange={handleOnInputChange}
                  />
                  <TextAreaStyled
                    name='description'
                    placeholder='Beskrivning'
                    value={schedule.description}
                    onChange={handleOnInputChange}
                  />
                  <InputStyled
                    type='text'
                    name='tagLine'
                    placeholder='Tag Line'
                    value={schedule.tagLine}
                    onChange={handleOnInputChange}
                  />
                  <InputStyled
                    type='text'
                    name='imageURL'
                    placeholder='Image URL'
                    value={schedule.imageURL}
                    onChange={handleOnInputChange}
                  />
                  <InputStyled
                    type='text'
                    name='location'
                    placeholder='Location'
                    value={schedule.location}
                    onChange={handleOnInputChange}
                  />
                  <StyledLine1 />
                  <BoxWrapper1>
                    <CancelButton onClick={onClose}>Avbryt</CancelButton>
                    <SaveButton type='submit' id='spara-button' disabled={!areAllFieldsFilled()}>
                      Spara
                    </SaveButton>
                  </BoxWrapper1>
                </StyledDiv>
              </form>
            </EventsWrapper>
          </Text>
        </GlobalBox>
      </SwipeableDrawer>
    </div>
  );
}

export default ScheduleComponent;
