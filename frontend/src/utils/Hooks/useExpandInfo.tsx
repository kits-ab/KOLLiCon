import { ActivityType } from '@/types/Activities';
import { Schedule } from '@/types/Schedule';
import { Person } from '@kokitotsos/react-components/dist/types';
import { useEffect, useState } from 'react';
import { types } from '@kokitotsos/react-components';
import { getPresenter } from '@/utils/Helpers/getPresenter';

interface ExpandInfoProps {
  activityProp?: ActivityType;
  scheduleProp?: Schedule;
}

interface generalInfo {
  title: string;
  details: string;
  start: Date;
  end: Date;
  showEndTime: boolean;
}

export const useExpandInfo = ({ activityProp, scheduleProp }: ExpandInfoProps) => {
  const [generalInfo, setGeneralInfo] = useState<generalInfo>({
    title: '',
    details: '',
    start: new Date(),
    end: new Date(),
    showEndTime: false,
  });
  const [location, setLocation] = useState({
    title: '',
    subtitle: '',
    coordinates: [] as number[],
  });
  const [type, setType] = useState<types.TimeslotType>(types.TimeslotType.Presentation);
  const [presenters, setPresenters] = useState<Person[]>([]);

  useEffect(() => {
    if (activityProp) {
      const coordinates = Array.isArray(activityProp.location.coordinates)
        ? activityProp.location.coordinates
        : [];
      // Get the presenter data and add a link to the presenter's page
      const presenterData = getPresenter(activityProp) || [];
      const presentersWithLinks = presenterData.map((presenter) => {
        const presenterNameForURL = presenter.name.split(' ').join('').toLowerCase();
        return {
          ...presenter,
          href: `https://kits.se/om/${presenterNameForURL}`,
        };
      });
      setGeneralInfo({
        title: activityProp.title,
        details: activityProp.details,
        start: new Date(activityProp.start),
        end: new Date(activityProp.end),
        showEndTime: true,
      });
      setType(activityProp.type);
      setLocation({
        title: activityProp.location.title,
        subtitle: activityProp.location.subtitle,
        coordinates: coordinates,
      });
      setPresenters(presentersWithLinks);
    } else if (scheduleProp) {
      setGeneralInfo({
        title: scheduleProp.title,
        details: scheduleProp.details,
        start: new Date(scheduleProp.start),
        end: new Date(scheduleProp.end),
        showEndTime: false,
      });
    }
  }, [activityProp, scheduleProp]);

  return { generalInfo, location, type, presenters };
};
