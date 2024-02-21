import { Timeslot, GlobalStyles } from '@kokitotsos/react-components';
import React, { useState } from 'react';
import 'normalize.css';
import DateText from '@/styles/DateText';
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
import { useNavigate } from 'react-router-dom';
import Activity from './Activity';
import Box from '@mui/material/Box';

export const Activities = () => {
  const fetchData = async () => {
    const response = await axios.get('http://localhost:8080/api/schedule/get/1');
    response.data.activityId.map((activity: any) => {
      const coor: string = activity.location.coordinates as string;
      const convertToNumberArrayLocation: number[] = coor.split(',').map(Number);
      const start = new Date(activity.start);
      const end = new Date(activity.end);
      activity.start = start;
      activity.end = end;
      activity.location.coordinates = convertToNumberArrayLocation;
      return activity as ActivityType;
    });
    setActivitiesData(response.data.activityId);
    return response.data as Schedule;
  };

  const { data, isLoading, error } = useQuery<Schedule>('scheduleData', fetchData);
  const [activitiesData, setActivitiesData] = useState<[]>(data?.activityId || []);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const err = error as Error;
    return <div>Error: {err.message}</div>;
  }

  const separateActivitiesByDate = (activitiesData: []): { [key: string]: ActivityType[] } => {
    const separatedActivities: { [key: string]: ActivityType[] } = {};

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    {
      console.log('activitiesData: ', activitiesData);
    }

    activitiesData?.map((activity: ActivityType) => {
      console.log('Activity: ', activity);
      let date = activity.start.toLocaleDateString('sv-SE', options);
      date = date.charAt(0).toUpperCase() + date.slice(1).toLowerCase();

      if (activity.presenter === null) {
        activity.presenter = [];
      }
      if (activity.review_id === null) {
        activity.review_id = [];
      }
      if (!separatedActivities[date]) {
        separatedActivities[date] = [];
      }

      separatedActivities[date].push(activity);
    });

    Object.keys(separatedActivities).map((date) => {
      separatedActivities[date].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
    });
    {
      console.log('separatedActivities: ', separatedActivities);
    }

    return separatedActivities;
  };

  if (!activitiesData) return null;
  const separatedActivities = separateActivitiesByDate(activitiesData);

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

  const skipIndices = new Set<number>();

  return (
    <>
      <GlobalStyles />
      <ActivitiesWrapper>
        <MenuHeader></MenuHeader>

        {separatedActivities &&
          Object.keys(separatedActivities).map((date) => {
            return separatedActivities[date].map((activity: ActivityType, index: number) => {
              const nextActivity = separatedActivities[date][index + 1];
              const key = `${date}-${index}`;
              if (skipIndices.has(index)) {
                return null;
              }
              if (index === 0) {
                return (
                  <React.Fragment key={key}>
                    <DateText>{date}</DateText>
                    <Timeslot
                      key={key}
                      presenters={activity.presenter}
                      endTime={activity.end}
                      heading={activity.title}
                      startTime={activity.start}
                      type={activity.type}
                      showEndTime={true}
                      {...(activity.location.coordinates[0] !== 0
                        ? { location: activity.location }
                        : {})}
                    >
                      <p>{activity.details}</p>
                    </Timeslot>
                  </React.Fragment>
                );
              } else if (nextActivity && activity.end.getTime() > nextActivity.start.getTime()) {
                skipIndices.add(index + 1);
                return (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Timeslot
                      style={{ marginRight: '20px' }}
                      key={key}
                      presenters={activity.presenter}
                      endTime={activity.end}
                      heading={activity.title}
                      startTime={activity.start}
                      type={activity.type}
                      showEndTime={true}
                      {...(activity.location.coordinates[0] !== 0
                        ? { location: activity.location }
                        : {})}
                    >
                      <p>{activity.details}</p>
                    </Timeslot>
                    <Timeslot
                      key={`${date}-${index + 1}`}
                      presenters={nextActivity.presenter}
                      endTime={nextActivity.end}
                      heading={nextActivity.title}
                      startTime={nextActivity.start}
                      type={nextActivity.type}
                      showEndTime={true}
                      {...(nextActivity.location.coordinates[0] !== 0
                        ? { location: nextActivity.location }
                        : {})}
                    >
                      <p>{nextActivity.details}</p>
                    </Timeslot>
                  </Box>
                );
              } else {
                return (
                  <React.Fragment key={key}>
                    <Timeslot
                      key={key}
                      presenters={activity.presenter}
                      endTime={activity.end}
                      heading={activity.title}
                      startTime={activity.start}
                      type={activity.type}
                      showEndTime={true}
                      {...(activity.location.coordinates[0] !== 0
                        ? { location: activity.location }
                        : {})}
                    >
                      <p>{activity.details}</p>
                    </Timeslot>
                  </React.Fragment>
                );
              }
            });
          })}
        <AddAcitivityStyling>
          <AddIcon style={{ fontSize: '60px' }} onClick={activateDrawer} />
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
