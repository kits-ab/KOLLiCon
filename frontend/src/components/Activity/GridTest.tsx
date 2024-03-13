import { ActivityType } from '@/types/Activities';
import { Schedule } from '@/types/Schedule';
import { Timeslot } from '@kokitotsos/react-components';
import { TimeslotType } from '@kokitotsos/react-components/dist/types';
import useSchedule from '@/utils/Hooks/useSchedule';
import { useEffect, useState } from 'react';
import { duration } from '@mui/material';

export const GridTest: any = () => {
  // const start = new Date();
  // const end = new Date();
  // const type = TimeslotType.Presentation;
  const [activitiesData, scheduleTime] = useSchedule();
  const [longActivity, setLongActivity] = useState<ActivityType | null>(null); // Fix: Add type annotation to longActivity
  const [shortActivities, setShortActivities] = useState<ActivityType[]>([]); // Fix: Add type annotation to shortActivities
  const [activitiesAfterLong, setActivitiesAfterLong] = useState<ActivityType[]>([]); // New state

  const activities: ActivityType[] = activitiesData;

  const sortedActivitesByDate = activities.sort(
    (a: ActivityType, b: ActivityType) => a.start.getTime() - b.start.getTime(),
  );
  let currentEndTime = new Date();
  let currentStartTime = new Date();

  const testActivities: ActivityType[] = []; // Fix: Declare shortActivities as an array of ActivityType

  function findLongActivity(activities: ActivityType[]) {
    let longestActivity: ActivityType | null = null;
    let otherActivities: ActivityType[] = [];
    let activitiesAfterLongest: ActivityType[] = [];

    activities.forEach((activity) => {
      const duration = activity.end.getTime() - activity.start.getTime();

      if (
        !longestActivity ||
        duration > longestActivity.end.getTime() - longestActivity.start.getTime()
      ) {
        if (longestActivity) {
          otherActivities.push(longestActivity);
        }
        longestActivity = activity;
      } else {
        if (longestActivity && activity.start.getTime() > longestActivity.end.getTime()) {
          activitiesAfterLongest.push(activity);
        } else {
          otherActivities.push(activity);
        }
      }
    });
    setActivitiesAfterLong(activitiesAfterLongest); // Set activitiesAfterLongest
    setLongActivity(longestActivity);
    setShortActivities(otherActivities);
  }

  useEffect(() => {
    findLongActivity(activities);
  }, [activities]);

  const calculateDurationInHours = (activity: ActivityType) => {
    const durationInMilliseconds =
      new Date(activity.end).getTime() - new Date(activity.start).getTime();
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    console.log('duration: ', Math.ceil(durationInHours));
    return Math.ceil(durationInHours); // round up to the nearest hour
  };

  let currentRowEnd = 1;

  const calculateStartHour = (activity: ActivityType) => {
    return new Date(activity.start).getHours() - 6; // Subtract 6 to start from 06:00
  };

  const calculateEndHour = (activity: ActivityType) => {
    return new Date(activity.end).getHours() - 6; // Subtract 6 to start from 06:00
  };

  const hasOverlappingActivity = (activity: ActivityType, activities: ActivityType[]) => {
    return activities.some(
      (otherActivity) =>
        otherActivity !== activity &&
        otherActivity.start.getTime() < activity.end.getTime() &&
        otherActivity.end.getTime() > activity.start.getTime(),
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: '800px',
          display: 'grid',
          justifyContent: 'center',
          gridTemplateColumns: 'repeat(6,1fr)',
          gridTemplateRows: 'repeat(1, 1fr)',
        }}
      >
        {shortActivities.map((activity: ActivityType) => {
          const durationInHours = calculateDurationInHours(activity);
          const gridRowStart = calculateStartHour(activity) + 1;
          const gridRowEnd = calculateEndHour(activity) + 1;

          currentRowEnd = gridRowEnd; // Update currentRowEnd
          return (
            <>
              <Timeslot
                style={{
                  color: 'white',
                  backgroundColor: 'red',
                  gridRowStart,
                  gridRowEnd,
                  gridColumnStart: 4,
                  gridColumnEnd: 6,
                }}
                type={activity.type}
                heading={activity.title}
                startTime={activity.start}
                endTime={activity.end}
                showEndTime={true}
              >
                {activity.details}
              </Timeslot>
            </>
          );
        })}
        {longActivity && (
          <Timeslot
            style={{
              backgroundColor: 'blue',
              gridColumnStart: 1,
              gridColumnEnd: 3,
              gridRowStart: calculateStartHour(longActivity) + 1,
              gridRowEnd: calculateEndHour(longActivity) + 1,
            }}
            heading='Title'
            type={longActivity.type} // Fix: Add null check using optional chaining operator
            endTime={longActivity.end}
            startTime={longActivity.start}
            showEndTime={true}
          >
            semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id
            aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien
            pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit
            dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer
            eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis
            cursus in hac habitasse platea dictumst quisque sagittis purus sit
          </Timeslot>
        )}
        {activitiesAfterLong.map((activity: ActivityType) => {
          const gridColumnEnd = hasOverlappingActivity(activity, shortActivities) ? 1 : 6; // If there are no overlapping activities, span two columns

          return (
            <Timeslot
              style={{
                color: 'white',
                backgroundColor: 'green',
                gridColumnStart: 1,
                gridColumnEnd: 6,
                gridRowStart: currentRowEnd + 1,
                gridRowEnd: currentRowEnd + 2,
              }}
              type={activity.type}
              heading={activity.title}
              startTime={activity.start}
              endTime={activity.end}
              showEndTime={true}
            >
              {activity.details}
            </Timeslot>
          );
        })}
      </div>
    </div>
  );
};
