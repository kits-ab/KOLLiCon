import { ActivityType } from '@/types/Activities';
import React, { useState } from 'react';
import { GridLayout } from './GridLayout';
import { getWeek } from 'date-fns';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface ActivitiesProps {
  activitiesData: [] | any;
  scheduleTime: Date;
  isLoading: boolean;
}

export const Activities: React.FC<ActivitiesProps> = (props) => {
  const { activitiesData, scheduleTime, isLoading } = props;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '53vh' }}>
        <CircularProgress color="success" />
      </Box>
    );
  }


  const activitiesSortedByDate = activitiesData.sort(
    (a: ActivityType, b: ActivityType) => a.start.getTime() - b.start.getTime(),
  );

  const separateActivitiesByDate = (
    activitiesSortedByDate: [],
  ): { [key: string]: ActivityType[] } => {
    const separatedActivities: { [key: string]: ActivityType[] } = {};

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

    activitiesSortedByDate?.map((activity: ActivityType) => {
      let date = activity.start.toLocaleDateString('sv-SE', options);
      date = date.charAt(0).toUpperCase() + date.slice(1).toLowerCase();
      const today = new Date();

      const weekNumber = getWeek(activity.start);

      const key = `${date} week ${weekNumber}`;

      if (activity.presenter === null) {
        activity.presenter = [];
      }
      if (activity.review_id === null) {
        activity.review_id = [];
      }
      if (!separatedActivities[key]) {
        separatedActivities[key] = [];
      }

      const scheduleEndTime = new Date(scheduleTime);
      if (today > scheduleEndTime) {
        separatedActivities[key].push(activity);
      } else {
        if (today <= activity.end) {
          separatedActivities[key].push(activity);
        }
      }
    });

    Object.keys(separatedActivities).map((key) => {
      separatedActivities[key].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
    });
    return separatedActivities;
  };

  if (!activitiesSortedByDate) return null;
  const separatedActivities = separateActivitiesByDate(activitiesSortedByDate);

  return (
    <>
      {separatedActivities &&
        Object.keys(separatedActivities).map((key) => {
          return (
            <GridLayout
              key={key}
              activitiesData={separatedActivities[key]}
              date={key.slice(0, key.indexOf('week'))}
              scheduleTime={scheduleTime}
            />
          );
        })}
    </>
  );
};
