import { useState } from 'react';
import { useQuery } from 'react-query';
import { Schedule } from '@/types/Schedule';
import axios from 'axios';
import { ActivityType } from '@/types/Activities';

function useSchedule(): [[], Date, Schedule[], any] {
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

  const fetchScheduleImage = async (schedule: Schedule) => {
    if (schedule.imageUrl) {
      return schedule.imageUrl;
    }
    try {
      const response = await axios.get(
        `https://api.github.com/repos/kits-ab/kits/contents/static/assets/`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        },
      );
      if (response.status == 200) {
        const filesData = response.data
          .filter((item: { type: string }) => item.type === 'file')
          // Fetch the content of each file
          .filter((item: { name: string }) => item.name.includes('kitscon_23_1.png'))
          .map(async (item: { download_url: string }) => {
            return item.download_url;
          });
        const mdContent = await Promise.all(filesData);
        setScheduleImages(mdContent);
        console.log(mdContent);
        return mdContent;
      }
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

  const { data: scheduleData } = useQuery<Schedule>('scheduleData', fetchData);
  const { data: schedules } = useQuery<[]>('schedules', fetchSchedules);
  const { data: scheduleImageData } = useQuery<[]>('scheduleImageData', fetchScheduleImage);
  const [activitiesData, setActivitiesData] = useState<[]>(scheduleData?.activityId || []);
  const [schedulesData, setSchedulesData] = useState<Schedule[]>(schedules || []);
  const [scheduleImages, setScheduleImages] = useState<any[]>(scheduleImageData || []);

  return [activitiesData, scheduleTime, schedulesData, scheduleImages];
}

export default useSchedule;
