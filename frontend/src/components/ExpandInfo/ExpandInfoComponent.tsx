import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { ActivityType } from '@/types/Activities';
import { Location, Text, Timeslot } from '@kokitotsos/react-components';
import { TimeslotType } from '@kokitotsos/react-components/dist/types';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Person } from '@kokitotsos/react-components/dist/types/Person';
import { useGetPresenter } from '@/utils/Hooks/useGetPresenter';
import { Schedule } from '@/types/Schedule';
import { useExpandInfo } from './useExpandInfo';
import { set } from 'react-hook-form';

interface ExpandInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityProp?: ActivityType;
  scheduleProp?: Schedule;
}

const ExpandInfo: React.FC<ExpandInfoProps> = ({ open, setOpen, activityProp, scheduleProp }) => {
  // const [activity, setActivity] = useState({
  //   data: {} as ActivityType,
  //   location: [] as number[],
  //   start: new Date(),
  //   end: new Date(),
  // });
  // const [schedule, setSchedule] = useState({
  //   data: {} as Schedule,
  //   start: new Date(),
  //   end: new Date(),
  // });

  const data = useExpandInfo({ activityProp, scheduleProp });
  const presenters = useGetPresenter();

  // useEffect(() => {
  //   if (activityProp) {
  //     const coordinates = Array.isArray(activityProp.location.coordinates)
  //       ? activityProp.location.coordinates
  //       : [];

  //     setActivity({
  //       data: activityProp,
  //       location: coordinates,
  //       start: new Date(activityProp.start),
  //       end: new Date(activityProp.end),
  //     });
  //   } else if (scheduleProp) {
  //     setSchedule({
  //       data: scheduleProp,
  //       start: new Date(scheduleProp.start),
  //       end: new Date(scheduleProp.end),
  //     });
  //   }
  // }, [activityProp, scheduleProp]);

  const getMapLink = (coordinates: number[]) => {
    const userAgent = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return `maps://maps.apple.com/?q=${coordinates[0]},${coordinates[1]}`;
    } else {
      return `https://www.google.com/maps/search/?api=1&query=${coordinates[0]},${coordinates[1]}`;
    }
  };

  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div>
      <Drawer
        PaperProps={{
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
        <Timeslot
          heading={data.response.data.title}
          startTime={data.response.start}
          endTime={data.response.end}
          type={(data.response.data.type as TimeslotType) || TimeslotType.Presentation}
        ></Timeslot>
        <Text>
          <p>{data.response.data.details}</p>
        </Text>
        {/* {activityProp && (
          <>
            <Timeslot
              heading={.data.title}
              type={activity.data.type}
              presenters={presenters(activity.data) as Person[]}
              startTime={activity.start}
              endTime={activity.end}
              showEndTime={true}
            ></Timeslot>
            <Text style={{ margin: '20px 0px 20px 0px' }}>
              <p>{activity.data.details}</p>
            </Text>
            {activity.location.length === 2 && (
              <div
                onClick={() => window.open(getMapLink(activity.location), '_blank')}
                style={{ cursor: 'pointer' }}
              >
                <Location
                  coordinates={[activity.location[0], activity.location[1]]}
                  title={activity.data.location.title ? activity.data.location.title : 'Location'}
                  subtitle={activity.data.location.subtitle ? activity.data.location.subtitle : ''}
                />
              </div>
            )}
          </>
        )}
        {scheduleProp && (
          <>
            <Timeslot
              heading={schedule.data.title}
              type={TimeslotType.Presentation}
              startTime={schedule.start}
              endTime={schedule.end}
            >
              <p>{schedule.data.description}</p>
            </Timeslot>
          </>
        )} */}
      </Drawer>
    </div>
  );
};

export default ExpandInfo;
