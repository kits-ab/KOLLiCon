import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalBox, StyledDiv, StyledLine } from '@/styles/RegisterActivity/StyledActivity';
import { GlobalStyles, Text } from '@kokitotsos/react-components';
import { ScheduleHeaderTitle } from '@/styles/CreateSchedule/StyledSchedule';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandNotification from './ExpandNotification';
import {
  MessageBox,
  NotificationBox,
  NotificationContainer,
  NotificationEventsWrapper,
  NotificationHeader,
  NotificationWrapper,
  TitleBox,
} from '@/styles/Notification/StyledNotification';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Colors } from '@/styles/Common/colors';
import SendNotificationForm from './SendNotificationForm';
import { useUser } from '@/utils/Authorization/Auth';

interface Message {
  id: number;
  text: string;
  title: string;
}

interface Notification {
  id: number;
  message: Message;
  userEmail: string;
  read: boolean;
}

const backendIP = import.meta.env.VITE_API_URL;

interface ShowNotificationsProps {
  openNotification: boolean;
  setOpenNotification: React.Dispatch<React.SetStateAction<boolean>>;
  handleNotificationClick: () => void;
  setHasNewNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowNotifications: React.FC<ShowNotificationsProps> = ({
  openNotification,
  setOpenNotification,
  handleNotificationClick,
  setHasNewNotification,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openSendNotification, setOpenSendNotification] = useState(false);
  const [expandedNotification, setExpandedNotification] = useState<Notification | null>(null);
  const { isAdmin } = useUser();
  const { email } = useUser();
  // const email = 'tobias.lans@kits.se'; // Hardcoded for demonstration

  const markNotificationAsRead = async (notificationId: number) => {
    try {
      await axios.put(`${backendIP}/api/notifications/${notificationId}/read`);
      // Update local state to reflect the notification is read
      setNotifications(
        notifications.map((notification) => {
          if (notification.id === notificationId) {
            return { ...notification, read: true };
          }
          return notification;
        }),
      );
      handleNotificationExpand(
        notifications.find((notification) => notification.id === notificationId) as Notification,
      );
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  const handleNotificationExpand = (notification: Notification) => {
    setExpandedNotification(notification); // Set the selected notification
  };

  // Fetch notifications for the logged-in user
  useEffect(() => {
    // In the useEffect hook where you fetch notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${backendIP}/api/notifications/all`);
        const allNotifications: Notification[] = response.data;

        // Filter notifications by the logged-in user's email
        const userNotifications = allNotifications.filter(
          (notification) => notification.userEmail === email,
        );

        // Sort notifications by id in descending order (newest first)
        const sortedNotifications = userNotifications.sort((a, b) => b.id - a.id);

        setNotifications(sortedNotifications);

        const hasUnreadNotifications = sortedNotifications.some(
          (notification) => !notification.read,
        );
        setHasNewNotification(hasUnreadNotifications);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };
    fetchNotifications();
  }, [email, setHasNewNotification]);

  // Reset hasNewNotification when the notification drawer is closed
  useEffect(() => {
    if (openNotification === false) {
      setHasNewNotification(notifications.some((notification) => !notification.read));
    }
  }, [openNotification, setHasNewNotification]);

  const handleSendNotificationClick = () => {
    setOpenSendNotification(true);
  };

  return (
    <>
      <SwipeableDrawer
        anchor='right'
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        onOpen={handleNotificationClick}
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
            <NotificationContainer>
              <NotificationHeader>
                <IconButton
                  sx={{ justifyContent: 'center', maxWidth: '30px' }}
                  onClick={(event: { stopPropagation: () => void }) => {
                    event.stopPropagation();
                    setOpenNotification(false);
                  }}
                >
                  <ArrowBackIosIcon sx={{ color: '#DBDBD8' }} />
                </IconButton>
                <ScheduleHeaderTitle>
                  <h3>Notiser</h3>
                </ScheduleHeaderTitle>
              </NotificationHeader>
              {isAdmin && (
                <IconButton
                  onClick={handleSendNotificationClick}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'end',
                    marginBottom: '-10px',
                  }}
                >
                  <NotificationsIcon fontSize='medium' sx={{ color: 'gray' }} />
                  <p style={{ marginBottom: '0px' }}>Skicka notis</p>
                </IconButton>
              )}
            </NotificationContainer>
            {/* <StyledLine /> */}
            <NotificationEventsWrapper>
              <StyledDiv>
                <NotificationWrapper>
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notification) => (
                        <NotificationBox
                          style={{ background: notification.read ? '#262626' : '#343434', cursor: 'pointer'}}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          {/* Now displaying the message content */}
                          <FiberManualRecordRoundedIcon
                            fontSize='small'
                            sx={{
                              // Change color based on the read status
                              color: notification.read ? '#262626' : `${Colors.primaryAddButton}`,
                              width: '12px',
                            }}
                          />
                          <MessageBox>{notification.message.title}</MessageBox>
                          <TitleBox>{notification.message.text}</TitleBox>
                        </NotificationBox>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <StyledLine style={{ marginTop: '3px' }} />
                      <p style={{ marginTop: '40px' }}>Inga notiser att visa.</p>
                    </>
                  )}
                </NotificationWrapper>
              </StyledDiv>
            </NotificationEventsWrapper>
          </Text>
        </GlobalBox>
      </SwipeableDrawer>
      {/* SendNotificationForm component */}
      <SendNotificationForm
        openSendNotification={openSendNotification}
        setOpenSendNotification={setOpenSendNotification}
        handleSendNotificationClick={handleSendNotificationClick}
      />
      {/* ExpandNotification component */}
      <ExpandNotification
        open={!!expandedNotification}
        onClose={() => setExpandedNotification(null)}
        notification={expandedNotification}
      />
    </>
  );
};

export default ShowNotifications;
