import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import { Colors } from '@/styles/Common/colors';
import { GlobalBox, StyledLine } from '@/styles/RegisterActivity/StyledActivity';
import { GlobalStyles, Text } from '@kokitotsos/react-components';
import {
  MessageHeader,
  NotificationEventsWrapper,
  NotificationWrapper,
  TextBox,
} from '@/styles/Notification/StyledNotification';
import { ScheduleHeaderTitle } from '@/styles/CreateSchedule/StyledSchedule';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface ExpandNotificationProps {
  open: boolean;
  onClose: () => void;
  notification: {
    id: number;
    message: {
      text: string;
      title: string;
    };
    userEmail: string;
    read: boolean;
  } | null;
}

const ExpandNotification: React.FC<ExpandNotificationProps> = ({ open, onClose, notification }) => {
  return (
    <SwipeableDrawer
      anchor='right'
      open={open}
      onClose={onClose}
      onOpen={() => {}}
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
          <NotificationEventsWrapper>
            <MessageHeader>
              <IconButton sx={{ justifyContent: 'center', maxWidth: '30px' }} onClick={onClose}>
                <ArrowBackIosIcon sx={{ color: '#DBDBD8' }} />
              </IconButton>
              <ScheduleHeaderTitle>
                <h3>Meddelande</h3>
              </ScheduleHeaderTitle>
            </MessageHeader>{' '}
            <StyledLine />
            <NotificationWrapper>
              <TextBox>
                <p style={{ fontSize: '25px' }}>{notification?.message.title}</p>
                <h3 style={{ fontSize: '22px' }}>{notification?.message.text}</h3>
              </TextBox>
            </NotificationWrapper>
          </NotificationEventsWrapper>
        </Text>
      </GlobalBox>
    </SwipeableDrawer>
  );
};

export default ExpandNotification;
