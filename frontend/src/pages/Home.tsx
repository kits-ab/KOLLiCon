import { GlobalStyles } from '@kokitotsos/react-components';
import { useState } from 'react';
import 'normalize.css';
import ActivitiesWrapper from '@/styles/ActivitiesWrapper';
import AddIcon from '@mui/icons-material/Add';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import KolliconFooter from '../components/Footer/KolliconFooter';
import Activity from '../components/RegisterActivity/RegisterActivityComponent';
import FloatingButton from '../components/Common/FloatingAddButton';
import useSchedule from '@/utils/Hooks/useSchedule';
import MenuDrawer from '@/components/HeaderMenu/MenuDrawer';
import { Colors } from '@/styles/Common/colors';
import { AddAcitivityStyling } from '@/styles/HomePage/StyledHomePage';
import { Activities } from '@/components/Activity/Activities';

export const Home = () => {
  const [activitiesData, scheduleTime] = useSchedule();
  const [open, setOpen] = useState(false);

  const activities = activitiesData;

  const activateDrawer = () => {
    setOpen(true);
  };

  const deactivateDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <GlobalStyles />
      <ActivitiesWrapper>
        <MenuDrawer />
        <Activities activitiesData={activities} scheduleTime={scheduleTime} />
        <FloatingButton activateDrawer={activateDrawer} />
        <AddAcitivityStyling>
          <AddIcon style={{ fontSize: '60px', cursor: 'pointer' }} onClick={activateDrawer} />
        </AddAcitivityStyling>
        <SwipeableDrawer
          anchor='bottom'
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          PaperProps={{
            style: {
              height: '100%',
              overflow: 'scroll',
              backgroundColor: `${Colors.primaryBackground}`,
              borderRadius: '0',
            },
          }}
        >
          <Activity onClose={deactivateDrawer} />
        </SwipeableDrawer>
      </ActivitiesWrapper>
      <KolliconFooter />
    </>
  );
};
