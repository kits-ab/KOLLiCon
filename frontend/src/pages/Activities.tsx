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
import Activity from './Activity';

export const Activities = () => {
  const fetchData = async () => {
    const response = await axios.get('http://localhost:8080/api/schedule/get/1');
    response.data.activityId.map((activity: any) => {
      const coorNumberArray: number[] = activity.location.coordinates.split(',').map(Number);
      const start = new Date(activity.start);
      const end = new Date(activity.end);
      activity.start = start;
      activity.end = end;
      activity.location.coordinates = coorNumberArray;
      return activity as ActivityType;
    });
    setActivitiesData(response.data.activityId);
    return response.data as Schedule;
  };

  const { data, isLoading, error } = useQuery<Schedule>('scheduleData', fetchData);
  const [activitiesData, setActivitiesData] = useState<[]>(data?.activityId || []);
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const err = error as Error;
    return <div>Error: {err.message}</div>;
  }

  const separateActivitiesByDate = (
    activitiesData: ActivityType[],
  ): { [key: string]: ActivityType[] } => {
    const separatedActivities: { [key: string]: ActivityType[] } = {};

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

    const sortedActivities = (activitiesData as ActivityType[]).sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );

    // Create an array to store the overlapping activities
    const overlappingActivities: ActivityType[][] = [];
    // Create a set to store the IDs of the activities that have been pushed to an array
    const pushedActivities = new Set<number>();
    // Iterate over the sorted activities
    for (let i = 1; i < sortedActivities.length; i++) {
      // If the start time of the current activity is before the end time of the previous activity
      // and neither activity has been pushed to an array before
      if (
        new Date(sortedActivities[i].start).getTime() <
          new Date(sortedActivities[i - 1].end).getTime() &&
        !pushedActivities.has(sortedActivities[i].id) &&
        !pushedActivities.has(sortedActivities[i - 1].id)
      ) {
        // Add both activities to the overlappingActivities array
        overlappingActivities.push([sortedActivities[i - 1], sortedActivities[i]]);
        activitiesData = activitiesData.filter(
          (activitiesData) =>
            activitiesData.id !== sortedActivities[i].id &&
            activitiesData.id !== sortedActivities[i - 1].id,
        );

        // Add the IDs of both activities to the pushedActivities set
        pushedActivities.add(sortedActivities[i].id);
        pushedActivities.add(sortedActivities[i - 1].id);
      }
    }
    // Add the overlapping activities to the activitiesData array

    activitiesData?.map((activity: ActivityType) => {
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

      // Sort the activities by start time

      separatedActivities[date].push(activity);
    });
    {
      console.log(
        'overlappingActivities and separatedActivities: ',
        overlappingActivities,
        separatedActivities,
      );
    }
    return [separatedActivities, overlappingActivities] as any;
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

  return (
    <>
      <GlobalStyles />
      <ActivitiesWrapper>
        <MenuHeader></MenuHeader>

        {separatedActivities[0] &&
          Object.keys(separatedActivities[0]).map((date: string) => {
            return separatedActivities[0][date].map((activity: ActivityType, index: number) => {
              const key = `${date}-${index}`; // Unique key
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
              } else {
                return (
                  <Timeslot
                    key={key}
                    connectToPrevious={index !== 0}
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
