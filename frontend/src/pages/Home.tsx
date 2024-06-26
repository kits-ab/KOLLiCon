import { GlobalStyles } from '@kokitotsos/react-components';
import { useEffect, useState } from 'react';
import 'normalize.css';
import ActivitiesWrapper from '@/styles/ActivitiesWrapper';
import AddIcon from '@mui/icons-material/Add';
import KolliconFooter from '../components/Footer/KolliconFooter';
import Activity from '../components/RegisterActivity/RegisterActivityComponent';
import FloatingButton from '../components/Common/FloatingAddButton';
import useSchedule from '@/utils/Hooks/useSchedule';
import MenuDrawer from '@/components/HeaderMenu/MenuDrawer';
import { Colors } from '@/styles/Common/colors';
import { AddAcitivityStyling } from '@/styles/HomePage/StyledHomePage';
import { Activities } from '@/components/Activity/Activities';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShowNotifications from '@/components/Notification/ShowNotification';
import { NotificationPoint } from '@/styles/Notification/StyledNotification';

export const Home = () => {
  const [schedulesData, scheduleEndTime, _, activeSchedule, setActiveSchedule] = useSchedule();
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const handleActiveSchedule = (scheduleId: number) => {
    const newActiveSchedule = schedulesData.find((schedule) => schedule.id === scheduleId);
    if (newActiveSchedule) {
      setActiveSchedule(newActiveSchedule);
    }
  };

  console.log('Active Schedule: ', activeSchedule);

  console.log('schedulesData Data: ', schedulesData);

  // console.log('Active Activities: ', activeActivities);

  const activateDrawer = () => {
    setOpen(true);
  };

  const deactivateDrawer = () => {
    setOpen(false);
  };

  const handleNotificationClick = () => {
    setOpenNotification(true);
  };

  return (
    <>
      <GlobalStyles />
      {/* Notification icon */}
      <NotificationsIcon
        onClick={handleNotificationClick}
        style={{ fontSize: '45px', cursor: 'pointer', color: 'gray' }}
      />
      {hasNewNotification && (
        // Notification point
        <NotificationPoint
          style={{ backgroundColor: Colors.primaryDeleteButton }}
        ></NotificationPoint>
      )}
      <ActivitiesWrapper>
        {/* Menu drawer */}
        <MenuDrawer handleActiveSchedule={handleActiveSchedule} schedulesData={schedulesData} />
        <Activities activeSchedule={activeSchedule} scheduleTime={scheduleEndTime} />
        <FloatingButton activateDrawer={activateDrawer} />
        {/* Add activity button */}
        <AddAcitivityStyling>
          <AddIcon style={{ fontSize: '60px', cursor: 'pointer' }} onClick={activateDrawer} />
        </AddAcitivityStyling>
        {/* Register activity*/}
        <Activity onClose={deactivateDrawer} onOpen={activateDrawer} open={open} />
        {/* Show notifications */}
        <ShowNotifications
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
          handleNotificationClick={handleNotificationClick}
          setHasNewNotification={setHasNewNotification}
        />
      </ActivitiesWrapper>
      <KolliconFooter />
    </>
  );
};
