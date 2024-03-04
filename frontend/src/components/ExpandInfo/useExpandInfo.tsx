import { ActivityType } from '@/types/Activities';
import { Schedule } from '@/types/Schedule';
import { useEffect, useState } from 'react';

interface ExpandInfoProps {
  activityProp?: ActivityType;
  scheduleProp?: Schedule;
}

export const useExpandInfo = ({ activityProp, scheduleProp }: ExpandInfoProps) => {
  const [activity, setActivity] = useState({
    data: {} as ActivityType,
    location: [] as number[],
    start: new Date(),
    end: new Date(),
  });
  const [schedule, setSchedule] = useState({
    data: {} as Schedule,
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    if (activityProp) {
      const coordinates = Array.isArray(activityProp.location.coordinates)
        ? activityProp.location.coordinates
        : [];

      setActivity({
        data: activityProp,
        location: coordinates,
        start: new Date(activityProp.start),
        end: new Date(activityProp.end),
      });
    } else if (scheduleProp) {
      setSchedule({
        data: scheduleProp,
        start: new Date(scheduleProp.start),
        end: new Date(scheduleProp.end),
      });
    }
  }, [activityProp, scheduleProp]);

  return activityProp ? { response: activity } : { response: schedule };
};
