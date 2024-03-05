import { ActivityType } from './Activities';

export type Schedule = {
  id: number;
  userId: string;
  activityId?: ActivityType;
  type: string;
  title: string;
  tagLine: string;
  details: string;
  location: string;
  start: Date;
  end: Date;
  active: boolean;
};
