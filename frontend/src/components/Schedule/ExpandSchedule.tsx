import React from 'react';
import { Schedule } from '@/types/Schedule';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';

interface ScheduleProps {
  schedule: Schedule;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ExpandSchedule = (props: ScheduleProps) => {
  const { schedule, open, setOpen } = props;
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <a
      key={schedule.id}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        setOpen;
      }}
    >
      <Drawer
        PaperProps={{
          overflow: 'hidden',
          sx: {
            width: isDesktop ? '50%' : '100%',
            padding: '20px',
          },
        }}
        variant='persistent'
        anchor='right'
        open={open}
        onClick={(event) => event.stopPropagation()}
        hideBackdrop={false}
      >
        <IconButton
          sx={{ justifyContent: 'start', maxWidth: '30px' }}
          onClick={(event) => {
            event.stopPropagation();
            setOpen(false);
          }}
        >
          <ArrowBackIosIcon sx={{ color: '#DBDBD8' }} />
        </IconButton>
        <div>{schedule.description}</div>;
      </Drawer>
    </a>
  );
};
