import { ParallellActivities } from '@/components/Activity/ParallellActivities';
import { ActivityType } from '@/types/Activities';
import React, { useState } from 'react';
import { useGetPresenter } from '@/utils/Hooks/useGetPresenter';
import { SingleActivity } from './SingleActivity';

interface ActivitiesProps {
  activitiesData: [] | any;
  selectedActivityId: number | null;
  setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  scheduleTime: Date;
}

export const Activities: React.FC<ActivitiesProps> = (props) => {
  const { activitiesData, setSelectedActivityId, selectedActivityId, scheduleTime } = props;
  const [expandInfoOpen, setExpandInfoOpen] = useState(false);

  const activitiesSortedByDate = activitiesData.sort(
    (a: ActivityType, b: ActivityType) => a.start.getTime() - b.start.getTime(),
  );

  const expandInfo = () => {
    setExpandInfoOpen(!expandInfoOpen);
  };
  const separateActivitiesByDate = (
    activitiesSortedByDate: [],
  ): { [key: string]: ActivityType[] } => {
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

  if (!activitiesSortedByDate) return null;
  const separatedActivities = separateActivitiesByDate(activitiesSortedByDate);
  const skipIndices = new Set<number>();

  return (
    <>
      {separatedActivities &&
        Object.keys(separatedActivities).map((date) => {
          return separatedActivities[date].map((activity: ActivityType, index: number) => {
            {
              console.log('Index: ', index);
            }
            const nextActivity = separatedActivities[date][index + 1];
            // const keySlot: string = `${date}-${index}`;
            if (skipIndices.has(index)) {
              return null;
            }
            if (nextActivity && activity.end.getTime() > nextActivity.start.getTime()) {
              skipIndices.add(index + 1);
              return (
                <ParallellActivities
                  date={date}
                  activity={activity}
                  nextActivity={nextActivity}
                  skipIndices={skipIndices}
                  index={index}
                  setSelectedActivityId={setSelectedActivityId}
                  expandInfo={expandInfo}
                  expandInfoOpen={expandInfoOpen}
                  setExpandInfoOpen={setExpandInfoOpen}
                  selectedActivityId={selectedActivityId}
                />
              );
            }
            return (
              <SingleActivity
                date={date}
                activity={activity}
                index={index}
                setSelectedActivityId={setSelectedActivityId}
                expandInfo={expandInfo}
                expandInfoOpen={expandInfoOpen}
                setExpandInfoOpen={setExpandInfoOpen}
                selectedActivityId={selectedActivityId}
              />
            );
          });
        })}
    </>
  );
};
