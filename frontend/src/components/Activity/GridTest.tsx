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

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: '800px',
          display: 'grid',
          justifyContent: 'center',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr',
        }}
      >
        {shortActivities.map((activity: ActivityType) => {
          const durationInHours = calculateDurationInHours(activity);
          const gridRowStart = currentRowEnd;
          const gridRowEnd = currentRowEnd + durationInHours;

          currentRowEnd = gridRowEnd; // Update currentRowEnd
          return (
            <>
              <Timeslot
                style={{
                  width: '200px',
                  color: 'white',
                  backgroundColor: 'red',
                  gridRowStart,
                  gridRowEnd,
                  gridColumnStart: 2,
                  gridColumnEnd: 3,
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
              width: '200px',
              backgroundColor: 'blue',
              gridColumnStart: 1,
              gridColumnEnd: 2,
              gridRowStart: 1,
              gridRowEnd: calculateDurationInHours(longActivity),
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
      </div>
    </div>
  );
};
