// import { ParallelActivities } from '@/components/Activity/OldActivity/ParallelActivities';
import { ActivityType } from '@/types/Activities';
import React, { useState } from 'react';
// import { SingleActivity } from '@/components/Activity/OldActivity/SingleActivity';
import { StyledTimeslot } from '@/styles/Timeslot/StyledTimeslot';
import { GridLayout } from '../GridLayout';

interface ActivitiesProps {
  activitiesData: [] | any;
  selectedActivityId: number | null;
  setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  scheduleTime: Date;
}

export const Activities: React.FC<ActivitiesProps> = (props) => {
  const { activitiesData, setSelectedActivityId, selectedActivityId, scheduleTime } = props;
  const [expandInfoOpen, setExpandInfoOpen] = useState(false);

  const activitiesSortedByDate = activitiesData.sort(
    (a: ActivityType, b: ActivityType) => a.start.getTime() - b.start.getTime(),
  );

  const expandInfo = () => {
    setExpandInfoOpen(!expandInfoOpen);
  };
  const separateActivitiesByDate = (
    activitiesSortedByDate: [],
  ): { [key: string]: ActivityType[] } => {
    const separatedActivities: { [key: string]: ActivityType[] } = {};

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

    activitiesSortedByDate?.map((activity: ActivityType) => {
      let date = activity.start.toLocaleDateString('sv-SE', options);
      date = date.charAt(0).toUpperCase() + date.slice(1).toLowerCase();
      const today = new Date();

      if (activity.presenter === null) {
        activity.presenter = [];
      }
      if (activity.review_id === null) {
        activity.review_id = [];
      }
      if (!separatedActivities[date]) {
        separatedActivities[date] = [];
      }

      const scheduleEndTime = new Date(scheduleTime);
      if (today > scheduleEndTime) {
        separatedActivities[date].push(activity);
      } else {
        if (today <= activity.end) {
          separatedActivities[date].push(activity);
        }
      }
    });

    Object.keys(separatedActivities).map((date) => {
      separatedActivities[date].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
    });
    return separatedActivities;
  };

  if (!activitiesSortedByDate) return null;
  const separatedActivities = separateActivitiesByDate(activitiesSortedByDate);
  const skipIndices = new Set<number>();

  console.log('separated activities: ', separatedActivities);

  return (
    <>
      {separatedActivities &&
        Object.keys(separatedActivities).map((date) => {
          {
            console.log('I was here', date, separatedActivities[date]);
          }
          return (
            <GridLayout activitiesData={separatedActivities[date]} scheduleTime={scheduleTime} />
          );
        })}
    </>
  );
};
