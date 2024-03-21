import { Schedule } from '@/types/Schedule';
import useSchedule from '@/utils/Hooks/useSchedule';
import { Colors } from '@/styles/Common/colors';
import { useState } from 'react';
import { ExpandSchedule } from './ExpandSchedule';

export const RenderSchedules = () => {
  const [_, __, schedulesData] = useSchedule();
  const [open, setOpen] = useState(false);

  const setScheduleOpen = () => {
    setOpen(!open);
  };

  console.log('SchedulesData', schedulesData);
  return (
    <div style={{ flexDirection: 'column', display: 'flex' }}>
      {schedulesData.map((schedule: Schedule) => (
        <div key={schedule.id} style={{ flexDirection: 'row', display: 'flex' }}>
          <div style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
            {schedule.imageUrl ? (
              <img
                src={schedule.imageUrl}
                alt='Schedule Image'
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            ) : (
              <img
                src='/placeholder.jpg'
                alt='Placeholder Image'
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            )}
          </div>
          <div>
            <div style={{ color: Colors.presentersGreen }}>{schedule.title}</div>
            <div>{schedule.description}</div>
            <div>{schedule.location}</div>
          </div>
          <ExpandSchedule schedule={schedule} open={open} setOpen={setScheduleOpen} />
        </div>
      ))}
    </div>
  );
};
