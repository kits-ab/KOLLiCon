import { types } from '@kokitotsos/react-components';

export type ActivityType = {
  id: number;
  user_id: string;
  review_id?: ReviewType[];
  winner: boolean;
  type: types.TimeslotType;
  presenter?: PresenterType[];
  location: { id: number; activity: number; coordinates: number[]; title?: string };
  title: string;
  details: string;
  start: string;
  end: string;
  schedule: number;
};

type ReviewType = {
  id: number;
  userId: string;
  review: string;
  rate: number;
  activity: number;
};

type PresenterType = {
  id: number;
  name: string;
  image: string;
  activity: number;
};
//refactor the ActivityType according to this object structure

export type ActivitiesType = {
  activities: ActivityType[];
};
