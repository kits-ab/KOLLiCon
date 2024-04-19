import { ActivityType } from '@/types/Activities';
import React, { useState } from 'react';
import { GridLayout } from './GridLayout';
import { getWeek } from 'date-fns';
import { Schedule } from '@/types/Schedule';
import { Button, colors, colorsDark, width } from '@kokitotsos/react-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface ActivitiesProps {
  activeSchedule: Schedule;
  scheduleTime: Date;
}

export const Activities: React.FC<ActivitiesProps> = (props: ActivitiesProps) => {
  const { activeSchedule, scheduleTime } = props;
  const [showPassedActivities, setShowPassedActivities] = useState(false);

  if (activeSchedule === undefined || activeSchedule === null) {
    return null;
  }

  const activitiesSortedByDate = activeSchedule.activityId
    ? activeSchedule.activityId.sort((a: ActivityType, b: ActivityType) => {
        if (a.start && b.start) {
          return new Date(a.start).getTime() - new Date(b.start).getTime();
        } else {
          return 0;
        }
      })
    : [];

  // if the first activity has passed and the schedule end time has not passed, return true to enable the button
  const enableButtonToShowPassedActivities = () => {
    const today = new Date();
    const scheduleEndTime = new Date(scheduleTime);
    if (activitiesSortedByDate.length > 0) {
      if (activitiesSortedByDate[0].end < today && today < scheduleEndTime) {
        return true;
      }
      return false;
    }
  };

  // Separate activities by date and week
  const separateActivitiesByDate = (
    activitiesSortedByDate: ActivityType[],
  ): { [key: string]: ActivityType[] } => {
    const separatedActivities: { [key: string]: ActivityType[] } = {};

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

    activitiesSortedByDate.map((activity: ActivityType) => {
      const startDate = new Date(activity.start);
      let date = startDate.toLocaleDateString('sv-SE', options);
      date = date.charAt(0).toUpperCase() + date.slice(1).toLowerCase();
      const today = new Date();

      const weekNumber = getWeek(startDate);

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

      // If the activity is passed and the user wants to see passed activities or the schedule time is passed, show the activity
      const scheduleEndTime = new Date(scheduleTime);
      if (showPassedActivities || today > scheduleEndTime) {
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {enableButtonToShowPassedActivities() && (
        <button
          className='showPassedActivities'
          style={{
            width: '40px',
            height: '40px',
            alignSelf: 'center',
            backgroundColor: `${colorsDark.background2}`,
            border: '0px',
            borderRadius: '100%',
            marginTop: '-40px',
          }}
          onClick={() =>
            showPassedActivities ? setShowPassedActivities(false) : setShowPassedActivities(true)
          }
        >
          {showPassedActivities ? (
            <ExpandMoreIcon sx={{ color: 'white' }} />
          ) : (
            <ExpandLessIcon sx={{ color: 'white' }} />
          )}
        </button>
      )}
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
    </div>
  );
};
