import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { ActivityType } from '@/types/Activities';
import { Location, Text, Timeslot } from '@kokitotsos/react-components';
import { useStyledDrawer } from './StyledExpandInfo';

interface ExpandInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityId: number;
}

const ExpandInfo: React.FC<ExpandInfoProps> = ({ open, setOpen, activityId }) => {
  const [activity, setActivity] = useState({
    data: {} as ActivityType,
    location: [] as number[],
    start: new Date(),
    end: new Date(),
  });

  const StyledDrawer = useStyledDrawer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/activity/${activityId}`);
        const coordinates = response.data.location.coordinates.split(',').map(Number);
        console.log('coordinates:', coordinates, typeof coordinates[0], typeof coordinates[1]);

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

  console.log(
    'coordinates:',
    activity.location,
    typeof activity.location[0],
    typeof activity.location[1],
  );

  return (
    <div>
      <StyledDrawer
        SlideProps={{ timeout: 500 }}
        variant='temporary'
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
        {/* render inverted because of the mapbox component saving the coordinates as [lat, long] */}
        {activity.location.length === 2 && (
          <Location
            coordinates={[activity.location[1], activity.location[0]]}
            title={activity.data.location.title}
          />
        )}
      </StyledDrawer>
    </div>
  );
};

export default ExpandInfo;
