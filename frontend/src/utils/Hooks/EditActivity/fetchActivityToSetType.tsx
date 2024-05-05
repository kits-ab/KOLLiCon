import axios from 'axios';
import dayjs from 'dayjs';
import { types } from '@kokitotsos/react-components';
import { RegisterActivity } from '@/types/Activities';
import { SetStateAction } from 'react';
import { getUserAccessToken } from '@/utils/Authorization/Auth';
const backendIP = import.meta.env.VITE_API_URL;

export const fetchActivityToSetType = async (
  activityProp: RegisterActivity,
  setEditActivity: { (value: SetStateAction<RegisterActivity>): void },
  setEndTime: { (value: SetStateAction<RegisterActivity | null>): void },
  setShowTimeDuration: { (value: SetStateAction<number>): void },
  setShowPresenter: { (value: SetStateAction<boolean>): void },
  setShowExternalPresenter: { (value: SetStateAction<boolean>): void },
  setShowLocation: { (value: SetStateAction<boolean>): void },
) => {
  try {
    const response = await axios.get(`${backendIP}/api/activity/${activityProp.id}`, {
      headers: {
        Authorization: `Bearer ${await getUserAccessToken()}`,
      },
    });
    const fetchedActivity = response.data;
    const durationInMinutes = dayjs(fetchedActivity.end).diff(
      dayjs(fetchedActivity.start),
      'minutes',
    );
    setEditActivity(response.data);
    setEndTime(response.data);
    setShowTimeDuration(durationInMinutes);

    // Set showPresenter, showExternalPresenter, and showLocation based on fetchedActivity.type
    if (fetchedActivity.type === types.TimeslotType.Presentation) {
      setShowPresenter(true);
      setShowLocation(false);
      setShowExternalPresenter(false);
    } else if (
      fetchedActivity.type === types.TimeslotType.Airplane ||
      fetchedActivity.type === types.TimeslotType.Boat ||
      fetchedActivity.type === types.TimeslotType.Bus ||
      fetchedActivity.type === types.TimeslotType.CheckIn ||
      fetchedActivity.type === types.TimeslotType.Coffee ||
      fetchedActivity.type === types.TimeslotType.Drink ||
      fetchedActivity.type === types.TimeslotType.Food ||
      fetchedActivity.type === types.TimeslotType.Hotel ||
      fetchedActivity.type === types.TimeslotType.Running ||
      fetchedActivity.type === types.TimeslotType.Skiing ||
      fetchedActivity.type === types.TimeslotType.Train ||
      fetchedActivity.type === types.TimeslotType.Workshop ||
      fetchedActivity.type === types.TimeslotType.Location
    ) {
      setShowPresenter(false);
      setShowExternalPresenter(false);
      setShowLocation(true);
    } else if (fetchedActivity.type === types.TimeslotType.ExternalPresentation) {
      setShowPresenter(false);
      setShowExternalPresenter(true);
      setShowLocation(false);
    }
  } catch (error) {
    console.error('Error fetching activity:', error);
  }
};
