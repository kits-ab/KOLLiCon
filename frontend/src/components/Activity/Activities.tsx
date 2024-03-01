import { SeparatedActivities } from '@/components/Activity/SeparatedActivities';
import { ActivityType } from '@/types/Activities';
import { Timeslot } from '@kokitotsos/react-components';
import DateText from '@/styles/DateText';
import ExpandInfo from '@/components/ExpandInfo/ExpandInfoComponent';
import React, { useState } from 'react';
import { Person } from '@kokitotsos/react-components/dist/types/Person';

interface ActivitiesProps {
  activitiesData: [] | any;
  selectedActivityId: number | null;
  setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  scheduleTime: Date;
}

export const ActivitiesNew: React.FC<ActivitiesProps> = (props) => {
  const { activitiesData, setSelectedActivityId, selectedActivityId, scheduleTime } = props;
  const [expandInfoOpen, setExpandInfoOpen] = useState(false);

  const activitiesSortedByDate = activitiesData.sort(
    (a: ActivityType, b: ActivityType) => a.start.getTime() - b.start.getTime(),
  );

  const expandInfo = () => {
    setExpandInfoOpen(!expandInfoOpen);
  };
  const separateActivitiesByDate = (activitiesData: []): { [key: string]: ActivityType[] } => {
    const separatedActivities: { [key: string]: ActivityType[] } = {};

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

    activitiesSortedByDate?.map((activity: ActivityType) => {
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

  if (!activitiesData) return null;
  const separatedActivities = separateActivitiesByDate(activitiesData);
  const skipIndices = new Set<number>();

  const getPresenters = (currentActivity: ActivityType) => {
    if (currentActivity.type === 'presentation') {
      return currentActivity.presenter as Person[];
    } else if (currentActivity.type === 'externalpresentation') {
      return currentActivity.externalPresenter as Person[];
    }
  };

  return (
    <>
      <React.Fragment key={'activities'}>
        {activitiesSortedByDate.map((activity: ActivityType, index: number) => {
          <Timeslot
            key={activity.id}
            presenters={getPresenters(activity) as Person[]}
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
            <p>{activity.details.slice(0, 200)}</p>
          </Timeslot>;
        })}
      </React.Fragment>
      <React.Fragment key={activitiesData.id}>
        {separatedActivities &&
          Object.keys(separatedActivities).map((date) => {
            return separatedActivities[date].map((activity: ActivityType, index: number) => {
              const nextActivity = separatedActivities[date][index + 1];
              const key: string = `${date}-${index}`;
              if (skipIndices.has(index)) {
                return null;
              }
              if (index === 0) {
                if (nextActivity && activity.end.getTime() > nextActivity.start.getTime()) {
                  skipIndices.add(index + 1);
                  return (
                    <>
                      <DateText>{date}</DateText>
                      <SeparatedActivities
                        key={key}
                        date={date}
                        activity={activity}
                        nextActivity={nextActivity}
                        skipIndices={skipIndices}
                        index={index}
                        uniqueKey={key}
                        setSelectedActivityId={setSelectedActivityId}
                        expandInfo={expandInfo}
                        expandInfoOpen={expandInfoOpen}
                        setExpandInfoOpen={setExpandInfoOpen}
                        selectedActivityId={selectedActivityId}
                      />
                    </>
                  );
                }
                return (
                  <React.Fragment key={key}>
                    <DateText>{date}</DateText>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedActivityId(activity.id);
                        expandInfo();
                      }}
                    >
                      <Timeslot
                        key={key}
                        presenters={getPresenters(activity) as Person[]}
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
                        <p>{activity.details.slice(0, 200)}</p>
                      </Timeslot>
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
              } else if (nextActivity && activity.end.getTime() > nextActivity.start.getTime()) {
                skipIndices.add(index + 1);
                return (
                  <SeparatedActivities
                    key={key}
                    date={date}
                    activity={activity}
                    nextActivity={nextActivity}
                    skipIndices={skipIndices}
                    index={index}
                    uniqueKey={key}
                    setSelectedActivityId={setSelectedActivityId}
                    expandInfo={expandInfo}
                    expandInfoOpen={expandInfoOpen}
                    setExpandInfoOpen={setExpandInfoOpen}
                    selectedActivityId={selectedActivityId}
                  />
                );
              } else {
                return (
                  <React.Fragment key={key}>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedActivityId(activity.id);
                        expandInfo();
                      }}
                    >
                      <Timeslot
                        key={key}
                        presenters={getPresenters(activity) as Person[]}
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
                        <p>{activity.details.slice(0, 200)}</p>
                      </Timeslot>
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
              }
            });
          })}
      </React.Fragment>
    </>
  );
};
