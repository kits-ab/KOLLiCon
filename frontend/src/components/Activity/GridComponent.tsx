import { ActivityType } from '@/types/Activities';
import { Timeslot } from '@kokitotsos/react-components';
import { useState } from 'react';
import { getPresenter } from '@/utils/Helpers/getPresenter';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import { GridWrapper, TimeSlotWrapper } from '@/styles/Timeslot/StyledTimeslot';
import DateText from '@/styles/DateText';
import React from 'react';
import { getWeek, set } from 'date-fns';
import { SaveButton } from '@/styles/RegisterActivity/StyledActivity';
import { CancelButton } from '@/styles/RegisterActivity/StyledActivity';
import axios from 'axios';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const backendUrl = import.meta.env.VITE_API_URL;

interface GridComponentProps {
  activitiesData: ActivityType[];
  selectedActivityId: number | null;
  setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  scheduleTime: Date;
  showEditModeButtons: boolean;
  showButtons: boolean;
  setShowButtons: (value: boolean) => void;
}

export const GridComponent: React.FC<GridComponentProps> = (props) => {
  const [expandInfoOpen, setExpandInfoOpen] = useState(false);
  const [pickedActivities, setPickedActivities] = React.useState<number[]>([]);
  //const [resetButtonColor, setResetButtonColor] = React.useState(false);
  const [changeColorWhenPicked, setChangeColorWhenPicked] = React.useState<Record<number, boolean>>(
    {},
  );
  const {
    activitiesData,
    setSelectedActivityId,
    selectedActivityId,
    scheduleTime,
    showButtons,
    setShowButtons,
  } = props;

  const addActivityToDeleteQue = (value: any) => {
    const isAlreadyPicked = pickedActivities.includes(value.id);

    if (isAlreadyPicked) {
      setPickedActivities((prevPickedActivities) =>
        prevPickedActivities.filter((activity) => activity !== value.id),
      );
    } else {
      setPickedActivities((prevPickedActivities) => [...prevPickedActivities, value.id]);
    }

    setChangeColorWhenPicked((prevColors) => ({
      ...prevColors,
      [value.id]: !prevColors[value.id],
    }));
  };

  const handleChangeChildState = () => {
    //  setResetButtonColor((prevState) => !prevState);
    setChangeColorWhenPicked({});
  };

  const triggerDeleteOfActivity = async () => {
    if (pickedActivities.length === 0) {
      setShowButtons(false);
      return;
    } else {
      for (let i = 0; i < pickedActivities.length; i++) {
        await axios.delete(`${backendUrl}/api/activity/delete/${pickedActivities[i]}`);
      }
      setShowButtons(false);
      window.location.reload();
    }
  };

  const expandInfo = () => {
    setExpandInfoOpen(!expandInfoOpen);
  };

  const sortedActivitesByDate = activitiesData.sort(
    (a: ActivityType, b: ActivityType) => a.start.getTime() - b.start.getTime(),
  );

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

  const getGridLayout = (
    activity: ActivityType,
    sortedActivitesByDate: ActivityType[],
    separatedActivities: ActivityType[],
  ) => {
    let gridRowStart = calculateStartQuarter(activity) + 1;
    let gridRowEnd = calculateEndQuarter(activity) + 1;
    let columnSpan = 0;
    let detailsSlice = 200;
    let showEndTime = true;
    let numberOfParallellActivities = 1;

    const startWeek = getWeek(sortedActivitesByDate[0].start);
    const currentActivityWeek = getWeek(activity.start);

    // Calculate the number of days between the first activity and the current activity
    const firstActivityDate = new Date(sortedActivitesByDate[0].start).getDay();
    const currentActivityDate = new Date(activity.start).getDay();
    const diffDays = currentActivityDate - firstActivityDate;

    // Adjust the gridRowStart and gridRowEnd values based on the number of days difference
    gridRowStart += diffDays * 24 * 4; // Multiply by 24 hours and 4 quarters per hour
    gridRowEnd += diffDays * 24 * 4;

    if (currentActivityWeek > startWeek) {
      gridRowStart += 24 * 4 * 7;
      gridRowEnd += 24 * 4 * 7;
    }

    if (hasThreeOngoingActivities(activity, separatedActivities)) {
      columnSpan = 2;
      detailsSlice = 50;
      showEndTime = false;
      numberOfParallellActivities = 3;
    } else if (hasOverlappingActivity(activity, separatedActivities)) {
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
      showEndTime,
      numberOfParallellActivities,
    };
  };

  const separateActivitiesByDate = (
    sortedActivitesByDate: ActivityType[],
  ): { [key: string]: ActivityType[] } => {
    const separatedActivities: { [key: string]: ActivityType[] } = {};

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

    sortedActivitesByDate?.map((activity: ActivityType) => {
      let date = activity.start.toLocaleDateString('sv-SE', options);
      date = date.charAt(0).toUpperCase() + date.slice(1).toLowerCase();
      const today = new Date();

      if (activity.presenter === null) {
        activity.presenter = [];
      }
      if (activity.review_id === null) {
        activity.review_id = [];
      }
      if (!separatedActivities[date]) {
        separatedActivities[date] = [];
      }

      const scheduleEndTime = new Date(scheduleTime);
      if (today > scheduleEndTime) {
        separatedActivities[date].push(activity);
      } else {
        if (today <= activity.end) {
          separatedActivities[date].push(activity);
        }
      }
    });

    Object.keys(separatedActivities).map((date) => {
      separatedActivities[date].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
    });
    return separatedActivities;
  };

  if (!sortedActivitesByDate) return null;
  const separatedActivities = separateActivitiesByDate(sortedActivitesByDate);

  return (
    <>
      <div>
        {showButtons && (
          <div style={{ height: '0.02px', marginTop: '10px', zIndex: '100', position: 'relative' }}>
            <SaveButton
              style={{ left: '80%' }}
              onClick={() => {
                triggerDeleteOfActivity();
              }}
            >
              Spara
            </SaveButton>
            <CancelButton
              style={{ left: '-10%' }}
              onClick={(event) => {
                setShowButtons(false);
                setPickedActivities([]);
                handleChangeChildState();
                event.stopPropagation();
              }}
            >
              Avbryt
            </CancelButton>
          </div>
        )}
        <GridWrapper style={{ position: 'relative', zIndex: '10' }}>
          {separatedActivities &&
            Object.keys(separatedActivities).map((date) => {
              return separatedActivities[date].map((activity: ActivityType, index: number) => {
                const {
                  gridRowStart,
                  gridRowEnd,
                  columnSpan,
                  detailsSlice,
                  numberOfParallellActivities,
                } = getGridLayout(activity, sortedActivitesByDate, separatedActivities[date]);

                return (
                  <React.Fragment key={index}>
                    {index === 0 ? (
                      <DateText
                        style={{
                          gridRowStart: gridRowStart - 1,
                          gridColumnStart: 1,
                          gridColumnEnd: 7,
                        }}
                      >
                        {date}
                      </DateText>
                    ) : null}
                    <a
                      style={{
                        position: 'relative',
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
                        style={{ height: '100%', marginTop: `30px`, paddingBottom: `30px` }}
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
                          {showButtons && (
                            <>
                              <RemoveCircleIcon
                                style={{
                                  color: changeColorWhenPicked[activity.id] ? '#963939' : '#596b4d',
                                  position: 'absolute',
                                  bottom: '1',
                                  right: '7',
                                  height: '25px',
                                  width: '25px',
                                }}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  addActivityToDeleteQue(activity);
                                }}
                              ></RemoveCircleIcon>
                            </>
                          )}
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
              });
            })}
        </GridWrapper>
      </div>
    </>
  );
};
