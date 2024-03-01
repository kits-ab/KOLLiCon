import { GlobalStyles } from '@kokitotsos/react-components';
import { useState } from 'react';
import 'normalize.css';
import ActivitiesWrapper from '@/styles/ActivitiesWrapper';
import AddIcon from '@mui/icons-material/Add';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import KolliconFooter from '../components/Footer/KolliconFooter';
import { styled } from '@mui/material/styles';
import Activity from '../components/RegisterActivity/Activity';
import FloatingButton from '../components/Common/FloatingAddButton';
import { ActivitiesNew } from '@/components/Activity/Activities.tsx';
import TheMenu from './TheMenu';
import useSchedule from '@/utils/Hooks/useSchedule';

export const Activities = () => {
  const [activitiesData, scheduleTime] = useSchedule();
  const [open, setOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);

  const AddAcitivityStyling = styled('div')(() => ({
    color: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '20px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
  }));

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
        <TheMenu />
        <ActivitiesNew
          activitiesData={activitiesData}
          selectedActivityId={selectedActivityId}
          setSelectedActivityId={setSelectedActivityId}
          scheduleTime={scheduleTime}
        />
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
              backgroundColor: '#262626',
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
