import { ActivityType } from '@/types/Activities';
import { Timeslot } from '@kokitotsos/react-components';
import { useState } from 'react';
import { getPresenter } from '@/utils/Helpers/getPresenter';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import { GridWrapper, TimeSlotWrapper } from '@/styles/Timeslot/StyledTimeslot';
import DateText from '@/styles/DateText';
import React from 'react';

interface ActivitiesProps {
  activitiesData: ActivityType[];
  // selectedActivityId: number | null;
  // setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  scheduleTime: Date;
  date: string;
}

export const GridLayout: React.FC<ActivitiesProps> = (props) => {
  const [expandInfoOpen, setExpandInfoOpen] = useState(false);
  const { activitiesData, date, scheduleTime } = props;
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);

  const MILLISECONDS_PER_MINUTE = 60000;
  const FIVE_MINUTES_INTERVAL = 12;
  const HOURS_PER_DAY = 24;

  const expandInfo = () => {
    setExpandInfoOpen(!expandInfoOpen);
  };

  // Calculate the start row of the activity
  const calculateStartRow = (activity: ActivityType) => {
    const startHour = new Date(activity.start).getHours();
    const startMinutes = new Date(activity.start).getMinutes();
    const startRow = startHour * FIVE_MINUTES_INTERVAL + Math.floor(startMinutes / 5);
    return Math.ceil(startRow);
  };
  // Calculate the end row of the activity
  const calculateEndRow = (activity: ActivityType) => {
    let endHour = new Date(activity.end).getHours();
    const endMinutes = new Date(activity.end).getMinutes();
    const endRow = endHour * FIVE_MINUTES_INTERVAL + Math.floor(endMinutes / 5);
    if (activity.start.getDay() !== activity.end.getDay()) {
      return Math.ceil(endRow) + HOURS_PER_DAY * FIVE_MINUTES_INTERVAL;
    }
    return Math.ceil(endRow);
  };

  // Check if the activity overlaps with any other activity
  const hasOverlappingActivity = (activity: ActivityType, activities: ActivityType[]) => {
    return activities.some(
      (otherActivity) =>
        otherActivity !== activity &&
        otherActivity.start.getTime() < activity.end.getTime() &&
        otherActivity.end.getTime() > activity.start.getTime(),
    );
  };

  const hasThreeOverLappingActivities = (activity: ActivityType, activities: ActivityType[]) => {
    const activityStart = activity.start.getTime();
    const activityEnd = activity.end.getTime();

    // Iterate over each minute in the duration of the activity
    for (
      let time = activityStart;
      time < activityEnd;
      time += MILLISECONDS_PER_MINUTE * FIVE_MINUTES_INTERVAL
    ) {
      let overlappingActivities = 0;

      // Check if there are two or more activities that overlap with the current time
      for (let otherActivity of activities) {
        if (otherActivity !== activity) {
          const otherStart = otherActivity.start.getTime();
          const otherEnd = otherActivity.end.getTime();

          if (otherStart < time && otherEnd > time) {
            overlappingActivities++;
          }
        }
        if (overlappingActivities >= 2) {
          return true;
        }
      }
    }

    return false;
  };

  const getGridLayout = (activity: ActivityType, filterdActivities: ActivityType[]) => {
    let gridRowStart = calculateStartRow(activity) + 1;
    let gridRowEnd = calculateEndRow(activity) + 1;
    let columnSpan = 0;
    let detailsSlice = 200;
    let numberOfParallellActivities = 1;

    // Change the layout based on the number of parallell activities
    if (hasThreeOverLappingActivities(activity, filterdActivities)) {
      columnSpan = 2;
      detailsSlice = 50;
      numberOfParallellActivities = 3;
    } else if (hasOverlappingActivity(activity, filterdActivities)) {
      columnSpan = 3;
      detailsSlice = 100;
      numberOfParallellActivities = 2;
    } else {
      columnSpan = 6;
    }
    return {
      gridRowStart,
      gridRowEnd,
      columnSpan,
      detailsSlice,
      numberOfParallellActivities,
    };
  };

  return (
    <>
      <GridWrapper>
        {activitiesData.map((activity: ActivityType, index) => {
          const {
            gridRowStart,
            gridRowEnd,
            columnSpan,
            detailsSlice,
            numberOfParallellActivities,
          } = getGridLayout(activity, activitiesData);

          // console.log('Activity: ', activity);
          // console.log('Location: ', activity.location.coordinates);
          return (
            <React.Fragment key={activity.id}>
              {index === 0 && <DateText gridrowStart={gridRowStart}>{date}</DateText>}
              <a
                style={{
                  cursor: 'pointer',
                  gridRowStart: index === 0 ? gridRowStart + 1 : gridRowStart,
                  gridRowEnd,
                  gridColumnStart: `auto`,
                  gridColumnEnd: `span ${columnSpan}`,
                }}
                onClick={() => {
                  setSelectedActivityId(activity.id);
                  expandInfo();
                }}
              >
                <TimeSlotWrapper
                  activityType={activity.type}
                  numberOfParallellActivities={numberOfParallellActivities}
                >
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
                    <p style={{ wordBreak: 'break-word' }}>
                      {activity.details.slice(0, detailsSlice)}
                    </p>
                  </Timeslot>
                </TimeSlotWrapper>
                {selectedActivityId === activity.id && (
                  <ExpandInfo
                    activityProp={activity}
                    open={expandInfoOpen}
                    setOpen={setExpandInfoOpen}
                  ></ExpandInfo>
                )}
              </a>
            </React.Fragment>
          );
        })}
      </GridWrapper>
    </>
  );
};
