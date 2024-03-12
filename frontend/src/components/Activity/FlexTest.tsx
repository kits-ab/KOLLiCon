import { ActivityType } from '@/types/Activities';
import { Schedule } from '@/types/Schedule';
import { Timeslot } from '@kokitotsos/react-components';
import { TimeslotType } from '@kokitotsos/react-components/dist/types';
import useSchedule from '@/utils/Hooks/useSchedule';
import { useEffect, useState } from 'react';

export const FlexTest: any = () => {
  const [longActivity, setLongActivity] = useState<ActivityType | null>(null); // Fix: Add type annotation to longActivity
  const [shortActivities, setShortActivities] = useState<ActivityType[]>([]); // Fix: Add type annotation to shortActivities
  const [activitiesData, scheduleTime] = useSchedule();

  const activities: ActivityType[] = activitiesData; // Add type annotation to activities array

  const sortedActivitesByDate = activities.sort(
    (a: ActivityType, b: ActivityType) => a.start.getTime() - b.start.getTime(),
  );
  let currentEndTime = new Date();
  let currentStartTime = new Date();

  const testActivities: ActivityType[] = []; // Fix: Declare shortActivities as an array of ActivityType

  useEffect(() => {
    sortedActivitesByDate.map((activity: ActivityType) => {
      if (activity.end > currentEndTime) {
        currentStartTime = activity.start;
        currentEndTime = activity.end;
        setLongActivity(activity);
      } else {
        testActivities.push(activity);
        setShortActivities(testActivities);
      }
    });
  }, [activitiesData]);

  const calculateDurationInHours = (activity: ActivityType) => {
    const durationInMilliseconds =
      new Date(activity.end).getTime() - new Date(activity.start).getTime();
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    console.log('duration: ', Math.ceil(durationInHours));
    return Math.ceil(durationInHours); // round up to the nearest hour
  };

  console.log(sortedActivitesByDate);

  let currentRowEnd = 1;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {longActivity && (
        <Timeslot
          style={{
            width: '200px',
            gridstartRow: 1,
            gridEndRow: 4,
            gridColumnStart: 1,
            gridColumnEnd: 2,
            backgroundColor: 'blue',
          }}
          type={longActivity.type} // Fix: Add a type check to ensure longActivity is not null
          endTime={longActivity.end}
          startTime={longActivity.start}
          heading={longActivity.title}
          showEndTime={true}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Timeslot>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {shortActivities.map((activity: ActivityType, index: number) => {
          const durationInHours = calculateDurationInHours(activity);
          const gridRowStart = currentRowEnd;
          // const gridRowEnd = currentRowEnd + durationInHours;

          currentRowEnd += 1;
          console.log('currentRowEnd: ', currentRowEnd);
          return (
            <Timeslot
              style={{
                color: 'white',
                backgroundColor: 'red',
                width: '200px',
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
