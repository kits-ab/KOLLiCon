import { GlobalStyles } from '@kokitotsos/react-components';
import { useState } from 'react';
import 'normalize.css';
import ActivitiesWrapper from '@/styles/ActivitiesWrapper';
import { ActivityType } from '@/types/Activities';
import { Schedule } from '@/types/Schedule';
import { useQuery } from 'react-query';
import axios from 'axios';
import MenuHeader from './MenuHeader';
import AddIcon from '@mui/icons-material/Add';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import KolliconFooter from './KolliconFooter';
import { styled } from '@mui/material/styles';
import Activity from '../components/RegisterActivity/Activity';
import FloatingButton from '../components/Common/FloatingAddButton';
import { ActivitiesNew } from '@/components/Activity/Activities.tsx';
import TheMenu from './TheMenu';

const backendIP = import.meta.env.VITE_API_URL;

export const Activities = () => {
  const fetchData = async () => {
    const response = await axios.get(`${backendIP}/api/schedule/get/1`);
    response.data.activityId.map((activity: any) => {
      const coorNumberArray: number[] = activity.location.coordinates.split(',').map(Number);
      const start = new Date(activity.start);
      const end = new Date(activity.end);
      activity.start = start;
      activity.end = end;
      activity.location.coordinates = coorNumberArray;
      return activity as ActivityType;
    });
    setScheduleTime(response.data.end);
    setActivitiesData(response.data.activityId);
    return response.data as Schedule;
  };
  const [scheduleTime, setScheduleTime] = useState<Date | null>(null);
  const { data, isLoading, error } = useQuery<Schedule>('scheduleData', fetchData);
  const [activitiesData, setActivitiesData] = useState<[]>(data?.activityId || []);
  const [open, setOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const err = error as Error;
    return <div>Error: {err.message}</div>;
  }

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
        <TheMenu></TheMenu>

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
