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
  location: {
    id: number;
    activity: number;
    coordinates: number[];
    title: string;
    subtitle: string;
  };
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

//Types for RegisterActivity which can not include id.
export type RegisterActivity = {
  id?: number;
  schedule: number;
  userId?: string;
  winner: boolean;
  type: types.TimeslotType | '';
  presenter: RegisterPerson[];
  externalPresenter: RegisterPerson[];
  location: { title: string; coordinates: string; subtitle: string };
  title: string;
  details: string;
  start: string;
  end: string;
  duration?: string;
};

export type RegisterPerson = {
  id?: number;
  name: string;
  tagLine?: string;
  imageSrc?: string;
  imageSrcSet?: string;
  avatarSrc: string;
  avatarSrcSet?: string;
  href?: string;
  tags?: string[];
};