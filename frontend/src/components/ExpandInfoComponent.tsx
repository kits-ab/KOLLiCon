import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { ActivityType } from '@/types/Activities';
import { Location, Text, Timeslot } from '@kokitotsos/react-components';

interface ExpandInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityId: number;
}

const PaperProps = {
  style: {
    backgroundColor: '#262626',
    height: '100%',
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '0px',
    color: '#DBDBD8',
  },
};

const ExpandInfo: React.FC<ExpandInfoProps> = ({ open, setOpen, activityId }) => {
  const [activity, setActivity] = useState({
    data: {} as ActivityType,
    location: [] as number[],
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/activity/${activityId}`);
        const coordinates = response.data.location.coordinates.split(',');
        setActivity({
          data: response.data,
          location: coordinates,
          start: new Date(response.data.start),
          end: new Date(response.data.end),
        });
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };
    fetchData();
  }, [activityId]);

  return (
    <div>
      <Drawer
        variant='persistent'
        anchor='right'
        open={open}
        onClick={(event) => event.stopPropagation()}
        SlideProps={{ timeout: 500 }}
        PaperProps={PaperProps}
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
        {activity.location &&
          activity.location[0] !== undefined &&
          activity.location[1] !== undefined && (
            <Location
              coordinates={[activity.location[0], activity.location[1]]}
              title={activity.data.location.title}
            />
          )}
      </Drawer>
    </div>
  );
};

export default ExpandInfo;
