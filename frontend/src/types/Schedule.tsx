import { ActivitiesType } from './Activities';

export type Schedule = {
  id: number;
  userId: string;
  activityId?: ActivitiesType;
  type: string;
  title: string;
  tagLine: string;
  location: string;
  start: Date;
  end: Date;
  active: boolean;
};
