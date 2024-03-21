import { ActivityType } from './Activities';

export type Schedule = {
  id: number;
  userId: string;
  activityId?: ActivityType;
  imageUrl?: string;
  type: string;
  title: string;
  tagLine: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
  active: boolean;
};
