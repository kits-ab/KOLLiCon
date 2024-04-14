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
import { ActivityType } from '@/types/Activities';
import { Schedule } from '@/types/Schedule';

export const Home = () => {
  const [schedulesData, scheduleTime] = useSchedule();
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [activeSchedule, setActiveSchedule] = useState<Schedule | []>(
    schedulesData.find((schedule: Schedule) => schedule.active === true) || [],
  );

  const handleActiveSchedule = (scheduleId: number) => {
    const activeSchedule = schedulesData.find((schedule: Schedule) => schedule.id === scheduleId);
    if (activeSchedule) {
      setActiveSchedule(activeSchedule);
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

  useEffect(() => {
    setActiveSchedule(schedulesData.find((schedule: Schedule) => schedule.active === true) || []);
  }, [schedulesData]);
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
        <MenuDrawer handleActiveSchedule={handleActiveSchedule} />
        <Activities
          activeActivities={Array.isArray(activeSchedule) ? [] : activeSchedule}
          scheduleTime={scheduleTime}
        />
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
