import { ActivityType } from '@/types/Activities';
import { Timeslot } from '@kokitotsos/react-components';
import { useMemo, useState } from 'react';
import { getPresenter } from '@/utils/Helpers/getPresenter';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import { GridWrapper, TimeSlotWrapper } from '@/styles/Timeslot/StyledTimeslot';
import DateText from '@/styles/DateText';
import React from 'react';
import { format, getWeek } from 'date-fns';
import 'react-multi-carousel/lib/styles.css';
import { sv } from 'date-fns/locale/sv';

interface GridComponentProps {
  activitiesData: ActivityType[];
  selectedActivityId: number | null;
  setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  scheduleTime: Date;
}

export const GridComponent: React.FC<GridComponentProps> = (props) => {
  const [expandInfoOpen, setExpandInfoOpen] = useState(false);
  const { activitiesData, setSelectedActivityId, selectedActivityId, scheduleTime } = props;

  const MILLISECONDS_PER_MINUTE = 60000;
  const MINUTES_PER_QUARTER = 15;
  const QUARTERS_PER_HOUR = 4;
  const HOURS_PER_DAY = 24;
  const DAYS_PER_WEEK = 7;

  const expandInfo = () => {
    setExpandInfoOpen(!expandInfoOpen);
  };

  const sortedActivitesByDate = useMemo(() => {
    return activitiesData.sort(
      (a: ActivityType, b: ActivityType) => a.start.getTime() - b.start.getTime(),
    );
  }, [activitiesData]);

  const calculateStartQuarter = (activity: ActivityType) => {
    const startHour = new Date(activity.start).getHours();
    const startMinutes = new Date(activity.start).getMinutes();
    const startQuarter = startHour * 4 + Math.floor(startMinutes / 15);
    return Math.ceil(startQuarter);
  };

  const calculateEndQuarter = (activity: ActivityType) => {
    const endHour = new Date(activity.end).getHours();
    const endMinutes = new Date(activity.end).getMinutes();
    const endQuarter = endHour * 4 + Math.floor(endMinutes / 15);
    if (activity.start.getDay() !== activity.end.getDay()) {
      return Math.ceil(endQuarter) + 24 * 4;
    }
    return Math.ceil(endQuarter);
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
    for (let time = activityStart; time < activityEnd; time += 60000) {
      let overlappingActivities = 0;

      // Check if there are three or more activities that overlap with the current time
      for (let otherActivity of activities) {
        if (otherActivity !== activity) {
          const otherStart = otherActivity.start.getTime();
          const otherEnd = otherActivity.end.getTime();

          if (otherStart < time && otherEnd > time) {
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

  const getGridLayout = (activity: ActivityType, filterdActivities: ActivityType[]) => {
    let gridRowStart = calculateStartQuarter(activity) + 1;
    let gridRowEnd = calculateEndQuarter(activity) + 1;
    let columnSpan = 0;
    let detailsSlice = 200;
    let numberOfParallellActivities = 1;

    const startWeek = getWeek(filterdActivities[0].start);
    const currentActivityWeek = getWeek(activity.start);

    // Calculate the number of days between the first activity and the current activity
    const firstActivityDate = new Date(filterdActivities[0].start).getDay();
    const currentActivityDate = new Date(activity.start).getDay();
    const diffDays = currentActivityDate - firstActivityDate;

    // Adjust the gridRowStart and gridRowEnd values based on the number of days difference
    gridRowStart += diffDays * 24 * 4 + 1;
    gridRowEnd += diffDays * 24 * 4 + 1; // TODO: Check if this is correct

    if (currentActivityWeek > startWeek) {
      gridRowStart += (currentActivityWeek - startWeek) * 7 * 24 * 4;
      gridRowEnd += (currentActivityWeek - startWeek) * 7 * 24 * 4;
    }

    if (hasThreeOngoingActivities(activity, filterdActivities)) {
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

  let lastRenderedDay = 0;

  const filterdActivities = sortedActivitesByDate.filter((activity) => {
    const today = new Date();
    const scheduleEndTime = new Date(scheduleTime);
    if (today > scheduleEndTime) {
      return true;
    } else {
      return today <= activity.end;
    }
  });

  return (
    <>
      <GridWrapper>
        {filterdActivities &&
          filterdActivities.map((activity: ActivityType) => {
            const {
              gridRowStart,
              gridRowEnd,
              columnSpan,
              detailsSlice,
              numberOfParallellActivities,
            } = getGridLayout(activity, filterdActivities);

            // Get the day of the current activity
            const currentDay = new Date(activity.start).getDate();

            // Check if the current day is different from the last rendered day
            const isFirstActivityOfDay = currentDay !== lastRenderedDay;

            // Update the last rendered day
            lastRenderedDay = currentDay;

            return (
              <React.Fragment key={activity.id}>
                {isFirstActivityOfDay ? (
                  <DateText gridrowStart={gridRowStart}>
                    {format(new Date(activity.start), 'iiii', { locale: sv })
                      .charAt(0)
                      .toUpperCase() +
                      format(new Date(activity.start), 'iiii', { locale: sv }).slice(1)}
                  </DateText>
                ) : null}
                <a
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
                    />
                  )}
                </a>
              </React.Fragment>
            );
          })}
      </GridWrapper>
    </>
  );
};
