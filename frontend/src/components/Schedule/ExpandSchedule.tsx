import { React, useState } from 'react';
import { Colors } from '@/styles/Common/colors';
import { Schedule } from '@/types/Schedule';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogContent from '@mui/material/DialogContent';
import Placeholder from '@/assets/placeholder.jpg';

interface ScheduleProps {
  schedule: Schedule;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleActiveSchedule: (scheduleId: number) => void;
}

export const ExpandSchedule = (props: ScheduleProps) => {
  const { schedule, open, setOpen, handleActiveSchedule } = props;
  const isDesktop = useMediaQuery('(min-width:600px)');

  console.log('Schedule: ', schedule);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      style={{
        margin: '15px 0',
      }}
    >
      <Drawer
        PaperProps={{
          overflow: 'hidden',
          sx: {
            width: isDesktop ? '50%' : '100%',
          },
        }}
        variant='persistent'
        anchor='right'
        open={open}
        onClick={(event) => event.stopPropagation()}
        hideBackdrop={false}
      >
        <IconButton
          sx={{ justifyContent: 'start', maxWidth: '30px', marginTop: '15px' }}
          onClick={(event) => {
            event.stopPropagation();
            setOpen(false);
          }}
        >
          <ArrowBackIosIcon sx={{ color: '#DBDBD8' }} />
        </IconButton>
        <div
          key={schedule.id}
          style={{
            flexDirection: 'column',
            display: 'flex',
            borderTop: '0.5px solid #343434',
            borderBottom: '0.5px solid #343434',
            padding: '15px',
            alignContent: 'center',
          }}
        >
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
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
            <div style={{ paddingLeft: '15px', flexDirection: 'column', display: 'flex' }}>
              <div style={{ color: Colors.presentersGreen }}>{schedule.title}</div>
              <div>
                {schedule.location},
                {` ${new Date(schedule.start).getDate()} - ${new Date(schedule.end).getDate()} ${capitalizeFirstLetter(new Intl.DateTimeFormat('sv-SE', { month: 'long' }).format(new Date(schedule.start)))}`}
              </div>
            </div>
            <button onClick={() => handleActiveSchedule(schedule.id)}>Aktivera</button>
          </div>
        </div>

        <div style={{ padding: '0 15px 0 15px', marginTop: '15px' }}>{schedule.description}</div>
      </Drawer>
    </div>
  );
};
