import { ActivityType } from '@/types/Activities';
import { Timeslot } from '@kokitotsos/react-components';
import { useMemo, useState } from 'react';
import { getPresenter } from '@/utils/Helpers/getPresenter';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import { GridWrapper, TimeSlotWrapper } from '@/styles/Timeslot/StyledTimeslot';
import DateText from '@/styles/DateText';
import React from 'react';
import { format, getWeek, setDay } from 'date-fns';
import { sv } from 'date-fns/locale/sv';

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
  const DAYS_PER_WEEK = 7;

  const expandInfo = () => {
    setExpandInfoOpen(!expandInfoOpen);
  };

  // const sortedActivitesByDate = useMemo(() => {
  //   return activitiesData.sort(
  //     (a: ActivityType, b: ActivityType) => a.start.getTime() - b.start.getTime(),
  //   );
  // }, [activitiesData]);

  // const activitiesByDay = useMemo(() => {
  //   const groups: { [key: string]: ActivityType[] } = {};
  //   sortedActivitesByDate.forEach((activity) => {
  //     const day = activity.start.toISOString().split('T')[0]; // Get the day as a string
  //     if (!groups[day]) {
  //       groups[day] = [];
  //     }
  //     groups[day].push(activity);
  //   });
  //   return groups;
  // }, [sortedActivitesByDate]);
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
    if (activity.start.getDay() !== activity.end.getDay()) {
      endHour = setDay(new Date(activity.start).getDay(), 23).getHours();
    }
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
    // let overlappingActivities = new Set();

    // Iterate over each minute in the duration of the activity
    for (let time = activityStart; time < activityEnd; time += MILLISECONDS_PER_MINUTE * 12) {
      let overlappingActivities = 0;
      // Check if there are three or more activities that overlap with the current time
      for (let otherActivity of activities) {
        if (otherActivity !== activity) {
          const otherStart = otherActivity.start.getTime();
          const otherEnd = otherActivity.end.getTime();

          if (otherStart < time && otherEnd > time) {
            overlappingActivities++;

            // if (
            //   otherActivity.start.getDay() !== activity.start.getDay() ||
            //   otherActivity.end.getDay() !== activity.end.getDay()
            // ) {
            //   overlappingActivities--;
            // }
          }
        }
        if (overlappingActivities >= 2) {
          return true;
        }
      }
    }

    return false;
  };

  // TODO: Den senare aktiviteten vid överlappning får span 6 columns
  // denna körs två gånger för varje överlappning, en gång för varje aktivitet som överlappar

  const getGridLayout = (activity: ActivityType, filterdActivities: ActivityType[]) => {
    let gridRowStart = calculateStartRow(activity) + 1;
    let gridRowEnd = calculateEndRow(activity) + 1;
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
    gridRowStart += diffDays * HOURS_PER_DAY * FIVE_MINUTES_INTERVAL + 1;
    gridRowEnd += diffDays * HOURS_PER_DAY * FIVE_MINUTES_INTERVAL + 1; // TODO: Check if this is correct

    // Adjust the gridRowStart and gridRowEnd values based on the number of weeks difference
    if (currentActivityWeek > startWeek) {
      gridRowStart +=
        (currentActivityWeek - startWeek) * DAYS_PER_WEEK * HOURS_PER_DAY * FIVE_MINUTES_INTERVAL;
      gridRowEnd +=
        (currentActivityWeek - startWeek) * DAYS_PER_WEEK * HOURS_PER_DAY * FIVE_MINUTES_INTERVAL;
    }
    // Change the layout based on the number of parallell activities
    if (hasThreeOverLappingActivities(activity, filterdActivities)) {
      // TODO: Det här fungerar inte när en aktivitet överlappar med fler än en men inte samtidigt
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

  // Keep track of the last rendered day to display the weekday of first activity of each day
  let lastRenderedDay = 0;

  // Filter out passed activities
  // const filterdActivities = sortedActivitesByDate.filter((activity) => {
  //   const today = new Date();
  //   const scheduleEndTime = new Date(scheduleTime);
  //   if (today > scheduleEndTime) {
  //     return true;
  //   } else {
  //     return today <= activity.end;
  //   }
  // });

  console.log('Activities fom gridlayout', activitiesData);
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

                <ExpandInfo
                  activityProp={activity}
                  open={expandInfoOpen}
                  setOpen={setExpandInfoOpen}
                />
              </a>
            </React.Fragment>
          );
        })}
      </GridWrapper>
    </>
  );
};
