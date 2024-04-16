import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Schedule } from '@/types/Schedule';
import axios from 'axios';
import { ActivityType } from '@/types/Activities';

function useSchedule(): [ActivityType[], Date, Schedule[]] {
  const [scheduleTime, setScheduleTime] = useState<Date>(new Date());
  const [activeSchedule, setActiveSchedule] = useState<Schedule>();
  const backendIP = import.meta.env.VITE_API_URL;
  // Fetch all schedules
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

  const fetchScheduleData = async (): Promise<Schedule> => {
    try {
      if (!activeSchedule) {
        throw new Error('Active schedule is not set');
      }
      const activities = Array.isArray(activeSchedule.activityId) ? activeSchedule.activityId : [];
      // Fetch all activities from the active schedule
      const processedActivities = activities.map((activity: any) => {
        let coorNumberArray: number[];
        // Check if coordinates are already in array format or need to be split from string
        if (Array.isArray(activity.location.coordinates)) {
          coorNumberArray = activity.location.coordinates.map(Number);
        } else if (typeof activity.location.coordinates === 'string') {
          coorNumberArray = activity.location.coordinates.split(',').map(Number);
        } else {
          throw new Error('Unexpected type for coordinates');
        }
        const start = new Date(activity.start);
        const end = new Date(activity.end);
        activity.start = start;
        activity.end = end;
        activity.location.coordinates = coorNumberArray;
        return activity as ActivityType;
      });
      setScheduleTime(activeSchedule.end);
      setActivitiesData(processedActivities);
      return activeSchedule;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  const { data: scheduleData } = useQuery<Schedule>('scheduleData', fetchScheduleData, {
    enabled: !!activeSchedule,
  });
  const { data: schedules } = useQuery<Schedule[]>('schedules', fetchSchedules);
  const [activitiesData, setActivitiesData] = useState<ActivityType[]>(
    scheduleData?.activityId ? [scheduleData.activityId] : [],
  );
  const [schedulesData, setSchedulesData] = useState<Schedule[]>(schedules || []);
  // Find the active schedule and store it in the state
  useEffect(() => {
    const findActiveSchedule = (schedules: Schedule[]): Schedule => {
      for (const schedule of schedules) {
        if (schedule.active) {
          setActiveSchedule(schedule);
          return schedule;
        }
      }
      return schedules[0];
    };
    findActiveSchedule(schedulesData);
  }, [schedulesData]);

  return [activitiesData, scheduleTime, schedulesData];
}

export default useSchedule;
