import { ActivityType } from '@/types/Activities';
import React, { useState } from 'react';
import { GridLayout } from './GridLayout';
import { getWeek } from 'date-fns';
import { Button, colors, colorsDark, width } from '@kokitotsos/react-components';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ActivitiesProps {
  activitiesData: [] | any;
  scheduleTime: Date;
}

export const Activities: React.FC<ActivitiesProps> = (props) => {
  const { activitiesData, scheduleTime } = props;
  const [showPassedActivities, setShowPassedActivities] = useState(false);

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

      // Add activity to separatedActivities[key] only if showPassedActivities is true or the activity's start date is in the future
      if (showPassedActivities || new Date(activity.end) > today) {
        separatedActivities[key].push(activity);
      }

      // if (showPassedActivities) {
      //   // TODO: Just nu laddar den inga activities alls om showPassedActivities är false och passerade aktiviteter visas aldrig
      //   const scheduleEndTime = new Date(scheduleTime);
      //   if (today > scheduleEndTime) {
      //     separatedActivities[key].push(activity);
      //   } else {
      //     if (today <= activity.end) {
      //       separatedActivities[key].push(activity);
      //     }
      //   }
      // }
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
      <button
        className='showPassedActivities'
        style={{
          width: '40px',
          height: '40px',
          alignSelf: 'center',
          backgroundColor: `${colorsDark.background2}`,
          border: '0px',
          borderRadius: '100%',
        }}
        onClick={() =>
          showPassedActivities ? setShowPassedActivities(false) : setShowPassedActivities(true)
        }
      >
        {showPassedActivities ? (
          <DownIcon sx={{ color: 'white' }} />
        ) : (
          <UpIcon sx={{ color: 'white' }} />
        )}
      </button>
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
