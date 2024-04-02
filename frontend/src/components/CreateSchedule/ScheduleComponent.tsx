import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BoxWrapper1,
  CancelButton,
  EventsWrapper,
  GlobalBox,
  HeaderStyled,
  SaveButton,
  StyledDiv,
  StyledLine,
  StyledLine1,
} from '@/styles/RegisterActivity/StyledActivity';
import { GlobalStyles, Text } from '@kokitotsos/react-components';
import { Colors } from '@/styles/Common/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ImageSelect from './ImageSelectComponent';
import DatePickerComponent from './DatePickerComponent';
import InputComponent from './InputComponent';
import { CreateSchedule } from '@/types/Schedule';
import { useUser } from '@/utils/Authorization/Auth';

type scheduleType = CreateSchedule;

const backendIP = import.meta.env.VITE_API_URL;

function ScheduleComponent({ onClose, onOpen, openScheduleModal }: any) {
  const { email } = useUser();

  useEffect(() => {
    setSchedule({ ...schedule, userId: email });
  }, [openScheduleModal]);
  
  const initialScheduleState: scheduleType = {
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
  };

  const [schedule, setSchedule] = useState<scheduleType>(initialScheduleState);

  // Function to check if all fields except userId are filled
  const areAllFieldsFilled = () => {
    const { userId, ...otherFields } = schedule;
    return Object.values(otherFields).every((value) => value !== '');
  };

  const resetSchedule = () => {
    setSchedule(initialScheduleState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSchedule({ ...schedule, userId: email });
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
                  <ImageSelect schedule={schedule} setSchedule={setSchedule} />
                  <DatePickerComponent schedule={schedule} setSchedule={setSchedule} />
                  <InputComponent schedule={schedule} setSchedule={setSchedule} />
                  <StyledLine1 />
                  <BoxWrapper1>
                    <CancelButton
                      onClick={() => {
                        onClose();
                        resetSchedule();
                      }}
                    >
                      Avbryt
                    </CancelButton>
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
