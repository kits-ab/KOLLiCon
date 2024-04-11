import { ActivityType } from './Activities';

export type Schedule = {
  id: number;
  userId: string;
  activityId?: ActivityType;
  imageURL?: string;
  type: string;
  title: string;
  tagLine: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
  active: boolean;
};
export type CreateSchedule = {
  userId: string;
  title: string;
  type: string;
  tagLine: string;
  description: string;
  imageURL: string;
  location: string;
  active: boolean;
  start: string;
  end: string;
};
