import { Schedule } from '@/types/Schedule';
import useSchedule from '@/utils/Hooks/useSchedule';
import { Colors } from '@/styles/Common/colors';
import { useState } from 'react';
import { ExpandSchedule } from './ExpandSchedule';
import Placeholder from '@/assets/placeholder.jpg';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface RenderSchedulesProps {
  setOpenSchedule: React.Dispatch<React.SetStateAction<boolean>>;
  openSchedule: boolean;
  handleScheduleId: any;
}

export const RenderSchedules = (props: RenderSchedulesProps) => {
  const { openSchedule, setOpenSchedule, handleScheduleId } = props;
  const [_, __, schedulesData] = useSchedule();
  const [open, setOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>(0);

  const setScheduleOpen = () => {
    setOpen(!open);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div
        style={{
          flexDirection: 'column',
          display: 'flex',
          margin: '15px 0 15px 0',
        }}
      >
        <IconButton
          sx={{ justifyContent: 'start', maxWidth: '30px' }}
          onClick={(event) => {
            event.stopPropagation();
            setOpenSchedule(openSchedule);
          }}
        >
          <ArrowBackIosIcon sx={{ color: '#DBDBD8' }} />
        </IconButton>
        {schedulesData.map((schedule: Schedule, index) => (
          <div
            key={schedule.id}
            style={{
              borderTop: index === 0 ? 'solid' : 'none',
              borderBottom: 'solid',
              borderWidth: '0.5px 0.5px',
              borderColor: '#343434',
              flexDirection: 'row',
              display: 'flex',
              padding: '15px 15px',
              alignItems: 'center',
            }}
          >
            {schedule.imageURL ? (
              <img
                src={schedule.imageURL}
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
            <a
              key={schedule.id}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setSelectedScheduleId(schedule.id);
                setScheduleOpen();
              }}
            >
              <div style={{ paddingLeft: '15px', alignItems: 'center' }}>
                <div style={{ color: Colors.presentersGreen }}>{schedule.title}</div>
                <div>
                  {schedule.location},
                  {` ${new Date(schedule.start).getDate()} - ${new Date(schedule.end).getDate()} ${capitalizeFirstLetter(new Intl.DateTimeFormat('sv-SE', { month: 'long' }).format(new Date(schedule.start)))}`}
                </div>
              </div>
              <ExpandSchedule
                schedule={schedule}
                open={selectedScheduleId === schedule.id && open}
                setOpen={setScheduleOpen}
                handleScheduleId={handleScheduleId}
              />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
