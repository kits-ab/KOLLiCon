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
import InputTest from './InputTest';
import KolliconFooter from './KolliconFooter';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ExpandInfo from '@/components/ExpandInfoComponent';

export const Activities = () => {
  const fetchData = async () => {
    const response = await axios.get('http://localhost:8080/api/schedule/get/1');
    response.data.activityId.map((activity: ActivityType) => {
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
  const [expandInfoOpen, setExpandInfoOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
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
    // setOpen(true);
    navigate('/activity');
  };

  const expandInfo = () => {
    if (expandInfoOpen) {
      setExpandInfoOpen(false);
    } else {
      setExpandInfoOpen(true);
    }
  };

  return (
    <>
      <GlobalStyles />
      <ActivitiesWrapper>
        <MenuHeader></MenuHeader>

        {separatedActivities &&
          Object.keys(separatedActivities).map((date) => {
            return separatedActivities[date].map((activity: ActivityType, index: number) => {
              const key = `${date}-${index}`; // Unique key
              if (index === 0) {
                return (
                  <React.Fragment key={key}>
                    <DateText>{date}</DateText>
                    <a
                      onClick={() => {
                        setSelectedActivityId(activity.id);
                        expandInfo();
                      }}
                    >
                      <Timeslot
                        key={key}
                        presenters={activity.presenter}
                        endTime={activity.end}
                        heading={activity.title}
                        startTime={activity.start}
                        type={activity.type}
                        // location={activity.location}
                      >
                        <p>{activity.details}</p>
                      </Timeslot>
                      {selectedActivityId === activity.id && (
                        <ExpandInfo
                          activityId={activity.id}
                          open={expandInfoOpen}
                          setOpen={setExpandInfoOpen}
                        >
                          {/* <button onClick={expandInfo}>Close Drawer</button> */}
                        </ExpandInfo>
                      )}
                    </a>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={key}>
                    <a
                      onClick={() => {
                        setSelectedActivityId(activity.id);
                        expandInfo();
                      }}
                    >
                      <Timeslot
                        key={key}
                        connectToPrevious={index !== 0}
                        presenters={activity.presenter}
                        endTime={activity.end}
                        heading={activity.title}
                        startTime={activity.start}
                        type={activity.type}
                        // location={activity.location}
                      >
                        <p>{activity.details}</p>
                      </Timeslot>
                      {selectedActivityId === activity.id && (
                        <ExpandInfo
                          activityId={activity.id}
                          open={expandInfoOpen}
                          setOpen={setExpandInfoOpen}
                        >
                          {/* <button onClick={expandInfo}>Close Drawer</button> */}
                        </ExpandInfo>
                      )}
                    </a>
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
        >
          <InputTest />
        </SwipeableDrawer>
      </ActivitiesWrapper>
      <KolliconFooter />
    </>
  );
};
