import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { ActivityType } from '@/types/Activities';
import { Location, Text, Timeslot } from '@kokitotsos/react-components';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';

interface ExpandInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityProp: ActivityType;
}

const ExpandInfo: React.FC<ExpandInfoProps> = ({ open, setOpen, activityProp }) => {
  const [activity, setActivity] = useState({
    data: {} as ActivityType,
    location: [] as number[],
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    const coordinates = Array.isArray(activityProp.location.coordinates)
      ? activityProp.location.coordinates
      : [];

    setActivity({
      data: activityProp,
      location: coordinates,
      start: new Date(activityProp.start),
      end: new Date(activityProp.end),
    });
  }, [activityProp]);

  const getMapLink = (coordinates: number[]) => {
    const userAgent = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return `maps://maps.apple.com/?q=${coordinates[0]},${coordinates[1]}`;
    } else {
      return `https://www.google.com/maps/search/?api=1&query=${coordinates[0]},${coordinates[1]}`;
    }
  };

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <div>
      <Drawer
        PaperProps={{
          sx: {
            width: matches ? '50%' : '100%',
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

        <Timeslot
          heading={activity.data.title}
          type={activity.data.type}
          presenters={activity.data.presenter}
          startTime={activity.start}
          endTime={activity.end}
          showEndTime={true}
        ></Timeslot>
        <Text style={{ margin: '20px 0px 20px 0px' }}>
          <p>{activity.data.details}</p>
        </Text>
        {activity.location.length === 2 && (
          <a href={getMapLink(activity.location)} target='_blank' rel='noopener noreferrer'>
            <Location
              coordinates={[activity.location[0], activity.location[1]]}
              title={activity.data.location.title ? activity.data.location.title : 'Aktivitet'}
              subtitle={activity.data.location.subtitle ? activity.data.location.subtitle : 'Subtitle'}
            />
          </a>
        )}
      </Drawer>
    </div>
  );
};

export default ExpandInfo;
