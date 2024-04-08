import { Schedule } from '@/types/Schedule';
import useSchedule from '@/utils/Hooks/useSchedule';
import { Colors } from '@/styles/Common/colors';
import { useState } from 'react';
import { ExpandSchedule } from './ExpandSchedule';
import Placeholder from '@/assets/placeholder.jpg';

export const RenderSchedules = () => {
  const [_, __, schedulesData] = useSchedule();
  const [open, setOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

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
              src={Placeholder}
              alt='Placeholder Image'
              style={{ maxWidth: '20%', maxHeight: '100%' }}
            />
          )}
          {/* </div> */}
          <a
            key={schedule.id}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedScheduleId(schedule.id);
              setOpen();
            }}
          >
            <div style={{ paddingLeft: '15px' }}>
              <div style={{ color: Colors.presentersGreen }}>{schedule.title}</div>
              <div>{schedule.location}</div>
              <p>
                {`${new Date(schedule.start).getDate()} - ${new Date(schedule.end).getDate()} ${capitalizeFirstLetter(new Intl.DateTimeFormat('sv-SE', { month: 'long' }).format(new Date(schedule.start)))}`}
              </p>
            </div>
            <ExpandSchedule
              schedule={schedule}
              open={open}
              setOpen={setScheduleOpen}
              selectedScheduleId={selectedScheduleId}
            />
          </a>
        </div>
      ))}
    </div>
  );
};
