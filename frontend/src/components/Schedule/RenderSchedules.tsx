import { Schedule } from '@/types/Schedule';
import useSchedule from '@/utils/Hooks/useSchedule';
import { Colors } from '@/styles/Common/colors';
import { useState } from 'react';
import { ExpandSchedule } from './ExpandSchedule';

export const RenderSchedules = () => {
  const [_, __, schedulesData, scheduleImages] = useSchedule();
  const [open, setOpen] = useState(false);

  const setScheduleOpen = () => {
    setOpen(!open);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  console.log('SchedulesData', schedulesData);
  return (
    <div style={{ flexDirection: 'column', display: 'flex', margin: '15px 10px 15px 10px' }}>
      {schedulesData.map((schedule: Schedule) => (
        <div key={schedule.id} style={{ flexDirection: 'row', display: 'flex' }}>
          {/* <div style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}> */}
          {schedule.imageUrl ? (
            <img
              src={schedule.imageUrl}
              alt='Schedule Image'
              style={{ maxWidth: '20%', maxHeight: '100%' }}
            />
          ) : (
            <img
              src={scheduleImages[0]}
              alt='Placeholder Image'
              style={{ maxWidth: '20%', maxHeight: '100%' }}
            />
          )}
          {/* </div> */}
          <div style={{ paddingLeft: '15px' }}>
            <div style={{ color: Colors.presentersGreen }}>{schedule.title}</div>
            <div>{schedule.location}</div>
            <p>
              {`${new Date(schedule.start).getDate()} - ${new Date(schedule.end).getDate()} ${capitalizeFirstLetter(new Intl.DateTimeFormat('sv-SE', { month: 'long' }).format(new Date(schedule.start)))}`}
            </p>
          </div>
          <ExpandSchedule schedule={schedule} open={open} setOpen={setScheduleOpen} />
        </div>
      ))}
    </div>
  );
};
