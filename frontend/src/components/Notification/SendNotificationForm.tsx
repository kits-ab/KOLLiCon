import React, { useState, useEffect } from 'react';
import { useFetchFiles } from '@/utils/Hooks/RegisterActivity/useFetchEmployeesFiles';
import {
  BoxWrapper1,
  EventsWrapper,
  GlobalBox,
  SaveButton,
  StyledDiv,
  StyledLine,
  StyledLine1,
} from '@/styles/RegisterActivity/StyledActivity';
import { GlobalStyles, Text } from '@kokitotsos/react-components';
import {
  ScheduleHeaderTitle,
  ScheduleInputStyled,
  ScheduleTextArea,
} from '@/styles/CreateSchedule/StyledSchedule';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Colors } from '@/styles/Common/colors';
import { NotificationHeaderStyled } from '@/styles/Notification/StyledNotification';
import { ErrorStyled } from '@/styles/RegisterActivity/StyledActivity';
import { SuccessMessage } from '@/styles/Review/StyledReview';
import CircularProgress from '@mui/material/CircularProgress';
import {useHandleSubmit} from '@/utils/Hooks/Notification/notificationUtils';

interface EmployeeFile {
  email: string;
}

interface SendNotificationsProps {
  openSendNotification: boolean;
  setOpenSendNotification: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendNotificationClick: () => void;
}

const SendNotificationForm: React.FC<SendNotificationsProps> = ({
  openSendNotification,
  setOpenSendNotification,
  handleSendNotificationClick,
}) => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [userEmails, setUserEmails] = useState<string[]>([]);
  const { handleSubmit, loading, success, error} = useHandleSubmit();

  const { EmployeesFiles } = useFetchFiles();

  // Extract and set emails from EmployeesFiles when it changes
  useEffect(() => {
    const emails = EmployeesFiles.map((file: EmployeeFile) => file.email);
    // setUserEmails(emails);

    //this is a temporary solution
    setUserEmails([
      'alireza.h.khan@hotmail.com',
      'christoffer.wallberg85@gmail.com',
      'johanbengtsson89@gmail.com',
      'magnusolsson1994@hotmail.se'
    ]);
  }, [EmployeesFiles]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    handleSubmit(title, text, userEmails, () => {
      setTitle('');
      setText('');
      setOpenSendNotification(false);
    });
  };

  return (
    <SwipeableDrawer
      anchor='right'
      open={openSendNotification}
      onClose={() => setOpenSendNotification(false)}
      onOpen={handleSendNotificationClick}
      PaperProps={{
        style: {
          height: '100%',
          overflow: 'scroll',
          backgroundColor: `${Colors.primaryBackground}`,
          borderRadius: '0',
          width: '100%',
        },
      }}
    >
      <GlobalBox>
        <GlobalStyles />
        <Text>
          <NotificationHeaderStyled>
            <IconButton
              sx={{ justifyContent: 'center', maxWidth: '30px' }}
              onClick={(event: { stopPropagation: () => void }) => {
                event.stopPropagation();
                setOpenSendNotification(false);
              }}
            >
              <ArrowBackIosIcon sx={{ color: '#DBDBD8' }} />
            </IconButton>
            <ScheduleHeaderTitle>
              <h3>Skicka Notis</h3>
            </ScheduleHeaderTitle>
          </NotificationHeaderStyled>
          <StyledLine />
          <EventsWrapper>
            <form onSubmit={handleFormSubmit}>
              <StyledDiv>
                <ScheduleInputStyled
                  sx={{ margin: '0 0 10% 0' }}
                  id='title'
                  type='text'
                  placeholder='Ämne'
                  value={title}
                  onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                    setTitle(e.target.value)
                  }
                  required
                />
                <ScheduleTextArea
                  id='text'
                  placeholder='Skriv din text här'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
                <StyledLine1 />
                {loading ? (
                  <BoxWrapper1>
                    <SaveButton type='submit' disabled>
                      <CircularProgress size={24} color='inherit' />
                    </SaveButton>
                  </BoxWrapper1>
                ) : (
                  <BoxWrapper1>
                    <SaveButton
                      onClick={handleSendNotificationClick}
                      type='submit'
                      id='spara-button'
                      disabled={title === '' || text === ''}
                    >
                      Skicka
                    </SaveButton>
                  </BoxWrapper1>
                )}
                {error && <ErrorStyled>{error}</ErrorStyled>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
              </StyledDiv>
            </form>
          </EventsWrapper>
        </Text>
      </GlobalBox>
    </SwipeableDrawer>
  );
};

export default SendNotificationForm;
