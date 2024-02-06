import { Timeslot, types, GlobalStyles } from '@kokitotsos/react-components';
import React, { useState } from 'react';
import 'normalize.css';
import DateText from '@/styles/DateText';
import ActivitiesWrapper from '@/styles/ActivitiesWrapper';
import { ActivitiesType, ActivityType } from '@/types/Activities';
import { Schedule } from '@/types/Schedule';
import { useQuery } from 'react-query';
import axios from 'axios';

export const Activities = () => {
  const fetchData = async () => {
    const response = await axios.get('http://localhost:8080/api/schedule/get/1');
    response.data.activityId.map((activity: any) => {
      const convertToNumberArrayLocation: number[] = activity.location.coordinates
        .split(',')
        .map(Number);
      activity.location.coordinates = convertToNumberArrayLocation;
    });
    setActivitiesData(response.data.activityId);
    return response.data as Schedule;
  };

  const { data, isLoading, error } = useQuery<Schedule>('scheduleData', fetchData);
  // const scheduleData: Schedule | undefined = data;

  const [activitiesData, setActivitiesData] = useState<ActivitiesType | null>(
    data?.activityId || null,
  );

  // ...

  // const [activitiesData, setActivitiesData] = useState<ActivitiesType | null>(data?.activityId || null);
  // const [Activities, setActivities] = useState(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const err = error as Error;
    return <div>Error: {err.message}</div>;
  }

  // const scheduleData = data; // Access the fetched data here

  const separateActivitiesByDate = (
    activitiesData: ActivitiesType,
  ): { [key: string]: ActivityType[] } => {
    const separatedActivities: { [key: string]: ActivityType[] } = {};

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    {
      console.log(activitiesData);
    }
    activitiesData.activities?.forEach((activity) => {
      let date = new Date(activity.start).toLocaleDateString('sv-SE', options);
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

    return separatedActivities;
  };

  if (!activitiesData) return null;
  const separatedActivities = separateActivitiesByDate(activitiesData);

  return (
    <>
      {console.log(separatedActivities)}
      <GlobalStyles />
      <ActivitiesWrapper>
        {separatedActivities &&
          Object.keys(separatedActivities).map((date) => {
            return separatedActivities[date].map((activity: ActivityType, index: number) => {
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
                      location={activity.location}
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
                    location={activity.location}
                  >
                    <p>{activity.details}</p>
                  </Timeslot>
                );
              }
            });
          })}
      </ActivitiesWrapper>
    </>
  );
};
