import { ParallelActivities } from '@/components/Activity/ParallelActivities';
import { ActivityType } from '@/types/Activities';
import React, { useState } from 'react';
import { SingleActivity } from '@/components/Activity/SingleActivity';
import axios from 'axios';

interface ActivitiesProps {
  activitiesData?: [] | any;
  selectedActivityId?: number | null;
  setSelectedActivityId?: React.Dispatch<React.SetStateAction<number | null>>;
  scheduleTime?: Date;
  showEditModeButtons: boolean;
  showButtons: boolean;
  setShowButtons: (value: boolean) => void;
}

export const Activities: React.FC<ActivitiesProps> = (props) => {
  const {
    activitiesData,
    setSelectedActivityId,
    selectedActivityId,
    scheduleTime,
    showEditModeButtons,
    showButtons,
    setShowButtons,
  } = props;

  const [expandInfoOpen, setExpandInfoOpen] = useState(false);
  const [pickedActivities, setPickedActivities] = React.useState<number[]>([]);

  const handlePickedActivity = (value: any) => {
    console.log(value);
    setPickedActivities((prevPickedActivities) => [...prevPickedActivities, value]);
  };

  const triggerDeleteOfActivity = async () => {
    //console.log(pickedActivities);
    for (let i = 0; i < pickedActivities.length; i++) {
      await axios.delete(`http://localhost:8080/api/activity/delete/${pickedActivities[i]}`);
    }
    setShowButtons(false);
  };

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
      {showButtons && (
        <>
          <button
            onClick={() => {
              triggerDeleteOfActivity();
            }}
          >
            Spara
          </button>
          <button onClick={() => setShowButtons(false)}>Avbryt</button>
        </>
      )}
      {separatedActivities &&
        Object.keys(separatedActivities).map((date) => {
          return separatedActivities[date].map((activity: ActivityType, index: number) => {
            const nextActivity = separatedActivities[date][index + 1];
            if (skipIndices.has(index)) {
              return null;
            }
            if (nextActivity && activity.end.getTime() > nextActivity.start.getTime()) {
              skipIndices.add(index + 1);
              return (
                <div style={{ position: 'relative' }}>
                  <ParallelActivities
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
                    showRemoveButtons={showEditModeButtons}
                    giveDataOfPickedActivity={handlePickedActivity}
                    showButtons={showButtons}
                  />
                </div>
              );
            }
            return (
              <div style={{ position: 'relative' }}>
                <SingleActivity
                  date={date}
                  activity={activity}
                  index={index}
                  setSelectedActivityId={setSelectedActivityId}
                  expandInfo={expandInfo}
                  expandInfoOpen={expandInfoOpen}
                  setExpandInfoOpen={setExpandInfoOpen}
                  selectedActivityId={selectedActivityId}
                  allActivites={activitiesData}
                  showRemoveButtons={showEditModeButtons}
                  giveDataOfPickedActivity={handlePickedActivity}
                  showButtons={showButtons}
                />
              </div>
            );
          });
        })}
    </>
  );
};
