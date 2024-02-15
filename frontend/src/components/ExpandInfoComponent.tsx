import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { ActivityType } from '@/types/Activities';
import {
  Article,
  Avatar,
  Contact,
  ContentHeading,
  GlobalStyles,
  Location,
  Text,
  Timeslot,
  Vertical,
  colors,
} from '@kokitotsos/react-components';
import styled from '@emotion/styled';

const FlexDivRow = styled.div`
  display: flex;
  flex-direction: row;
`;

interface ExpandInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityId: number;
  children?: React.ReactNode;
}

const ExpandInfo: React.FC<ExpandInfoProps> = ({ open, setOpen, activityId, children }) => {
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
          // time: [response.data.start, response.data.end],
        });
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };
    fetchData();
  }, [activityId]);

  console.log(activity.data);

  return (
    <div>
      <Drawer
        variant='persistent'
        anchor='right'
        open={open}
        PaperProps={{
          style: {
            backgroundColor: '#262626',
            height: '100%',
            width: '100%',
            maxWidth: '600px',
            padding: '20px',
            borderRadius: '0px',
            color: '#DBDBD8',
          },
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <IconButton
          style={{ justifyContent: 'start', maxWidth: '30px' }}
          onClick={(event) => {
            event.stopPropagation();
            setOpen(false);
          }}
        >
          <ArrowBackIosIcon style={{ color: '#DBDBD8' }} />
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
