import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Schedule } from '@/types/Schedule';
import axios from 'axios';
import { ActivityType } from '@/types/Activities';

function useSchedule(): [Schedule[], Date] {
  const [scheduleTime, setScheduleTime] = useState<Date>(new Date());
  const [schedulesData, setSchedulesData] = useState<Schedule[]>([]);

  const backendIP = import.meta.env.VITE_API_URL;

  const fetchAllSchedule = async (): Promise<Schedule[]> => {
    try {
      const response = await axios.get(`${backendIP}/api/allschedule`);
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

  // const fetchSchedules = async (): Promise<Schedule[]> => {
  //   try {
  //     const response = await axios.get(`${backendIP}/api/allschedule`);

  //     setSchedulesData(response.data);
  //     const allSchedules: Schedule[] = response.data;
  //     return allSchedules;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  // const fetchData = async (): Promise<Schedule> => {
  //   try {
  //     const response = await axios.get(`${backendIP}/api/schedule/get/1`);
  //     response.data.activityId.map((activity: any) => {
  //       const coorNumberArray: number[] = activity.location.coordinates.split(',').map(Number);
  //       const start = new Date(activity.start);
  //       const end = new Date(activity.end);
  //       activity.start = start;
  //       activity.end = end;
  //       activity.location.coordinates = coorNumberArray;
  //       return activity as ActivityType;
  //     });
  //     setScheduleTime(response.data.end);
  //     setActivitiesData(response.data.activityId);
  //     return response.data as Schedule;
  //   } catch (error) {
  //     // Handle error here
  //     console.error(error);
  //     throw error;
  //   }
  // };

  // const { data: scheduleData } = useQuery<Schedule>('scheduleData', fetchData);
  // // const { data: allScheduleData } = useQuery<Schedule[]>('allScheduleData', fetchSchedules);
  // const [activitiesData, setActivitiesData] = useState<ActivityType[]>(
  //   scheduleData?.activityId ? [scheduleData.activityId] : [],
  // );

  // const [activeActivities, setActiveActivities] = useState<ActivityType[]>(
  //   schedulesData.find((schedule: Schedule) => schedule.id === 1)?.activityId || [],
  // );

  useEffect(() => {
    fetchAllSchedule();
  }, []);
  return [schedulesData, scheduleTime];
}

export default useSchedule;
