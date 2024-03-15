import { ActivityType } from '@/types/Activities';
import { Timeslot } from '@kokitotsos/react-components';
import useSchedule from '@/utils/Hooks/useSchedule';
import { useState } from 'react';
import { getPresenter } from '@/utils/Helpers/getPresenter';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import styled from '@emotion/styled';
import { StyledTimeslot } from '@/styles/Timeslot/StyledTimeslot';

interface GridTestProps {
  activitiesData: ActivityType[];
  selectedActivityId: number | null;
  setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const GridTest: React.FC<GridTestProps> = (props) => {
  const [expandInfoOpen, setExpandInfoOpen] = useState(false);
  const { activitiesData, setSelectedActivityId, selectedActivityId } = props;
  const expandInfo = () => {
    setExpandInfoOpen(!expandInfoOpen);
  };

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

  const getGridLayout = (activity: ActivityType, sortedActivitesByDate: ActivityType[]) => {
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
    return { gridRowStart, gridRowEnd, columnSpan };
  };

  const GridWrapper = styled.div`
    display: grid;
    justify-content: center;
    // grid-template-columns: repeat(6, 1fr);
    // grid-template-rows: repeat(12, 1fr);
    column-gap: 2%;
  `;

  return (
    <GridWrapper>
      {sortedActivitesByDate.map((activity: ActivityType, index) => {
        const { gridRowStart, gridRowEnd, columnSpan } = getGridLayout(
          activity,
          sortedActivitesByDate,
        );
        return (
          <a
            key={index}
            style={{
              cursor: 'pointer',
              gridRowStart,
              gridRowEnd,
              gridColumnStart: `auto`,
              gridColumnEnd: `span ${columnSpan}`,
            }}
            onClick={() => {
              setSelectedActivityId(activity.id);
              expandInfo();
            }}
          >
            <StyledTimeslot style={{ height: '90%' }}>
              <Timeslot
                style={{ height: '100%' }}
                presenters={getPresenter(activity)}
                endTime={activity.end}
                heading={activity.title}
                startTime={activity.start}
                type={activity.type}
                showEndTime={true}
                {...(activity.location.coordinates[0] !== 0
                  ? {
                      location: {
                        coordinates: activity.location.coordinates,
                        title: (activity.location.title as string) || 'Location',
                        subtitle: activity.location.subtitle,
                      },
                    }
                  : {})}
              >
                <p key={`${activity.id}-details`}>{activity.details.slice(0, 200)}</p>
              </Timeslot>
            </StyledTimeslot>
            {selectedActivityId === activity.id && (
              <ExpandInfo
                activityProp={activity}
                open={expandInfoOpen}
                setOpen={setExpandInfoOpen}
              />
            )}
          </a>
        );
      })}
    </GridWrapper>
  );
};
