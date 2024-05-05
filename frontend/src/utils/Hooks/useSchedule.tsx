import { useEffect, useState } from 'react';
import { Schedule } from '@/types/Schedule';
import axios from 'axios';
import { ActivityType } from '@/types/Activities';
import { getUserAccessToken } from '../Authorization/Auth';

function useSchedule(): [
  Schedule[],
  Date,
  Date,
  Schedule,
  React.Dispatch<React.SetStateAction<Schedule>>,
] {
  const [scheduleEndTime, setScheduleEndTime] = useState<Date>(new Date());
  const [scheduleStartTime, setScheduleStartTime] = useState<Date>(new Date());
  const [activeSchedule, setActiveSchedule] = useState<Schedule>({} as Schedule);
  const [schedulesData, setSchedulesData] = useState<Schedule[]>([]);
  const backendIP = import.meta.env.VITE_API_URL;

  const fetchAllSchedule = async (): Promise<Schedule[]> => {
    try {
      const response = await axios.get(`${backendIP}/api/allschedule`, {
        headers: {
          Authorization: `Bearer ${await getUserAccessToken()}`,
        },
      });
      const updatedData: Schedule[] = response.data.map((schedule: Schedule) => {
        schedule.activityId?.map((activity: any) => {
          const coorNumberArray: number[] = activity.location.coordinates.split(',').map(Number);
          const start = new Date(activity.start);
          const end = new Date(activity.end);
          activity.start = start;
          activity.end = end;
          activity.location.coordinates = coorNumberArray;
          return activity as ActivityType;
        });
        return schedule as Schedule;
      });
      console.log('Data: ', updatedData);
      setSchedulesData(updatedData);
      return updatedData as Schedule[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAllSchedule();
  }, []);

  useEffect(() => {
    const findActiveSchedule = schedulesData.find((schedule) => schedule.active);
    if (findActiveSchedule) {
      setActiveSchedule(findActiveSchedule);
    }
    setActiveSchedule(schedulesData[0]);
    setScheduleEndTime(findActiveSchedule ? findActiveSchedule.end : new Date());
    setScheduleStartTime(findActiveSchedule ? findActiveSchedule.start : new Date());
  }, [schedulesData]);

  return [schedulesData, scheduleEndTime, scheduleStartTime, activeSchedule, setActiveSchedule];
}

export default useSchedule;
