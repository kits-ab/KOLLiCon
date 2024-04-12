import { useState } from 'react';
import { useQuery } from 'react-query';
import { Schedule } from '@/types/Schedule';
import axios from 'axios';
import { ActivityType } from '@/types/Activities';

function useSchedule(): [ActivityType[], Date, Schedule[]] {
  const [scheduleTime, setScheduleTime] = useState<Date>(new Date());
  const backendIP = import.meta.env.VITE_API_URL;

  const fetchSchedules = async (): Promise<Schedule[]> => {
    try {
      const response = await axios.get(`${backendIP}/api/allschedule`);

      setSchedulesData(response.data);
      return response.data as Schedule[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchData = async (): Promise<Schedule> => {
    try {
      const response = await axios.get(`${backendIP}/api/schedule/get/10`);
      response.data.activityId.map((activity: any) => {
        const coorNumberArray: number[] = activity.location.coordinates.split(',').map(Number);
        const start = new Date(activity.start);
        const end = new Date(activity.end);
        activity.start = start;
        activity.end = end;
        activity.location.coordinates = coorNumberArray;
        return activity as ActivityType;
      });
      setScheduleTime(response.data.end);
      setActivitiesData(response.data.activityId);
      return response.data as Schedule;
    } catch (error) {
      // Handle error here
      console.error(error);
      throw error;
    }
  };

  const { data: scheduleData } = useQuery<Schedule>('scheduleData', fetchData);
  const { data: schedules } = useQuery<Schedule[]>('schedules', fetchSchedules);
  const [activitiesData, setActivitiesData] = useState<ActivityType[]>(
    scheduleData?.activityId ? [scheduleData.activityId] : [],
  );
  const [schedulesData, setSchedulesData] = useState<Schedule[]>(schedules || []);

  return [activitiesData, scheduleTime, schedulesData];
}

export default useSchedule;
