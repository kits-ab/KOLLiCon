import { types } from '@kokitotsos/react-components';
import { ExternalPresenter, Person } from '@kokitotsos/react-components/dist/types';

export type ActivityType = {
  id: number;
  user_id: string;
  review_id?: ReviewType[] | [];
  winner: boolean;
  type: types.TimeslotType;
  presenter?: Person[] | [];
  externalPresenter?: ExternalPresenter[] | [];
  location: { id: number; activity: number; coordinates: number[]; title?: string };
  title: string;
  details: string;
  start: Date;
  end: Date;
  schedule: number;
};

export type ReviewType = {
  id: number;
  userId: string;
  review: string;
  rate: number;
  activity: number;
};
