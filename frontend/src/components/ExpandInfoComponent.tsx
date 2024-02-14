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
  colors,
} from '@kokitotsos/react-components';
import styled from '@emotion/styled';

// interface ActivityType {
//   id: number;
//   title: string;
//   details: string;
//   start: string;
//   end: string;
//   location?: {
//     type: string;
//     coordinates: string;
//   };
//   presenter: {
//     name: string;
//     imgSource: string;
//   }[];
// }

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
    splitStart: '',
    splitEnd: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/activity/${activityId}`);
        setActivity({
          data: response.data,
          splitStart: response.data.start.split('T')[1],
          splitEnd: response.data.end.split('T')[1],
        });
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };
    fetchData();
  }, [activityId]);

  return (
    <div>
      {/* <StyledButton onClick={() => setOpen(true)}>Open Drawer</StyledButton>; */}
      <Drawer
        variant='persistent'
        anchor='right'
        open={open}
        // onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: '#262626',
            height: '100%',
            width: '90%',
            padding: '20px',
            borderRadius: '0px',
            color: '#DBDBD8',
          },
        }}
      >
        <IconButton style={{ justifyContent: 'start' }} onClick={() => setOpen(false)}>
          <ArrowBackIosIcon style={{ color: '#DBDBD8' }} />
        </IconButton>
        <FlexDivRow
          style={{
            borderRadius: '5px',
            backgroundColor: '#3A3A39',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '0px 0px 10px 10px',
              width: '100%',
            }}
          >
            <FlexDivRow style={{ justifyContent: 'space-between' }}>
              <Avatar
                style={{ marginBottom: '20px' }}
                person={{
                  id: 'lorem',
                  name: 'Lorem Ipsum',
                  avatarSrc: 'https://picsum.photos/200',
                }}
                showFallback
                width={80}
              />
              <div style={{ display: 'flex', flexDirection: 'column', marginRight: '30px' }}>
                <Text>
                  <h2>{activity.splitStart}</h2>
                  <h2>{activity.splitEnd}</h2>
                </Text>
              </div>
            </FlexDivRow>

            {activity.data.presenter?.map((presenter) => (
              <Contact
                key={presenter.name}
                info={{
                  name: presenter.name,
                  role: 'Intern',
                }}
                type={0}
              />
            ))}

            <ContentHeading>{activity.data.title}</ContentHeading>
          </div>
        </FlexDivRow>
        <Text>
          <p>{activity.data.details}</p>
          {activity.data.location && <p>{activity.data.location.coordinates}</p>}
        </Text>
        {activity.data.location && (
          <Location coordinates={[57.7001813, 11.9567863]} subtitle='Test2' title='Test' />
        )}
        {/* // <Location coordinates={[57.7001813, 11.9567863]} subtitle='Test2' title='Test' /> */}
      </Drawer>
    </div>
  );
};

export default ExpandInfo;
