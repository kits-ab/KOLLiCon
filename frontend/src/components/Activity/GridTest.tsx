import { ActivityType } from '@/types/Activities';
import { Timeslot } from '@kokitotsos/react-components';
import useSchedule from '@/utils/Hooks/useSchedule';

export const GridTest: any = () => {
  const [activitiesData, scheduleTime] = useSchedule();

  const activities: ActivityType[] = activitiesData;

  const sortedActivitesByDate = activities.sort(
    (a: ActivityType, b: ActivityType) => a.start.getTime() - b.start.getTime(),
  );

  const calculateStartHour = (activity: ActivityType) => {
    const startHour = new Date(activity.start).getHours() - 6; // Subtract 6 to start from 06:00

    return Math.ceil(startHour);
  };

  const calculateEndHour = (activity: ActivityType) => {
    const endHour = new Date(activity.end).getHours() - 6; // Subtract 6 to start from 06:00
    return Math.ceil(endHour);
  };

  const hasOverlappingActivity = (activity: ActivityType, activities: ActivityType[]) => {
    return activities.some(
      (otherActivity) =>
        otherActivity !== activity &&
        otherActivity.start.getTime() < activity.end.getTime() &&
        otherActivity.end.getTime() > activity.start.getTime(),
    );
  };

  const hasThreeOngoingActivities = (activity: ActivityType, activities: ActivityType[]) => {
    const activityStart = activity.start.getTime();
    const activityEnd = activity.end.getTime();

    // Iterate over each minute in the duration of the activity
    for (let time = activityStart; time <= activityEnd; time += 60000) {
      let overlappingActivities = 0;

      // Check if there are three or more activities that overlap with the current time
      for (let otherActivity of activities) {
        if (otherActivity !== activity) {
          const otherStart = otherActivity.start.getTime();
          const otherEnd = otherActivity.end.getTime();

          if (otherStart <= time && otherEnd > time) {
            overlappingActivities++;
          }

          if (overlappingActivities >= 2) {
            return true;
          }
        }
      }
    }

    return false;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(12, 1fr)',
          width: '90%',
          columnGap: '15%',
        }}
      >
        {sortedActivitesByDate.map((activity: ActivityType, index) => {
          const gridRowStart = calculateStartHour(activity) + 1;
          const gridRowEnd = calculateEndHour(activity) + 1;
          let columnSpan = 0;
          if (hasThreeOngoingActivities(activity, sortedActivitesByDate)) {
            columnSpan = 2;
          } else if (hasOverlappingActivity(activity, sortedActivitesByDate)) {
            columnSpan = 3;
          } else {
            columnSpan = 6;
          }

          return (
            <>
              <Timeslot
                key={index}
                style={{
                  color: 'white',
                  backgroundColor: 'darkgray',
                  border: '1px solid blue',
                  gridRowStart,
                  gridRowEnd,
                  gridColumnStart: `auto`,
                  gridColumnEnd: `span ${columnSpan}`,
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
      </div>
    </div>
  );
};
