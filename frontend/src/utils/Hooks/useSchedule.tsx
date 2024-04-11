import { useState } from 'react';
import { useQuery } from 'react-query';
import { Schedule } from '@/types/Schedule';
import axios from 'axios';
import { ActivityType } from '@/types/Activities';

function useSchedule(): [
  ActivityType[],
  Date,
  Schedule[],
  (scheduleId: number) => void,
  ActivityType,
  ActivityType[],
] {
  const [scheduleTime, setScheduleTime] = useState<Date>(new Date());
  const backendIP = import.meta.env.VITE_API_URL;

  const fetchSchedules = async (): Promise<[Schedule[], Schedule]> => {
    try {
      const response = await axios.get(`${backendIP}/api/allschedule`);
      const activeSchedule = response.data.find((schedule: Schedule) => schedule.id === 1);
      setSchedulesData(response.data);
      const allSchedules: Schedule[] = response.data;
      return [allSchedules, activeSchedule as Schedule];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchData = async (): Promise<Schedule> => {
    try {
      const response = await axios.get(`${backendIP}/api/schedule/get/1`);
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

  const [activeScheduleId, setActiveScheduleId] = useState<number>(1);

  const handleScheduleId = (scheduleId: number) => {
    setActiveScheduleId(scheduleId);
    handleActiveActivities(
      activitiesData.filter((activity: any) => activity.scheduleId === activeScheduleId),
    );
  };
  const handleActiveActivities = (activities: any) => {
    setActiveActivities(activities);
  };

  const { data: scheduleData } = useQuery<Schedule>('scheduleData', fetchData);
  const { data } = useQuery<Schedule[], Schedule>('schedules', fetchSchedules);
  const allSchedules = data ? data[0] : [];
  const activeSchedule = data ? data[1] : null;
  const [activitiesData, setActivitiesData] = useState<ActivityType[]>(
    scheduleData?.activityId ? [scheduleData.activityId] : [],
  );
  const [schedulesData, setSchedulesData] = useState<Schedule[]>(allSchedules || []);

  const [activeActivities, setActiveActivities] = useState<ActivityType[]>(
    schedulesData.find((schedule: Schedule) => schedule.id === 1)?.activityId || [],
  );

  return [
    activitiesData,
    scheduleTime,
    schedulesData,
    handleScheduleId,
    activeSchedule,
    activeActivities,
  ];
}

export default useSchedule;
