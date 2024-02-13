import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import { Article, Avatar, GlobalStyles, Location, Timeslot } from '@kokitotsos/react-components';

interface ActivityType {
  id: number;
  title: string;
  details: string;
  start: string;
  end: string;
  location?: {
    type: string;
    coordinates: string;
  };
}

interface ExpandInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityId: number;
  children?: React.ReactNode;
}

const ExpandInfo: React.FC<ExpandInfoProps> = ({ open, setOpen, activityId, children }) => {
  const [response, setResponse] = useState({} as ActivityType);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/api/activity/${activityId}`);
      console.log('id: ', activityId);
      setResponse(response.data);
    };
    fetchData();
  }, [activityId]);

  return (
    <div>
      <GlobalStyles />
      {/* <StyledButton onClick={() => setOpen(true)}>Open Drawer</StyledButton>; */}
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <div style={{ width: '400px', height: '700px', color: 'white', padding: '20px' }}>
          <div style={{ display: 'flex' }}>
            <Avatar
              person={{
                id: 'lorem',
                name: 'Lorem Ipsum',
                avatarSrc: 'https://picsum.photos/200',
              }}
              showFallback
              width={80}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2>Activity Details</h2>
              <p>{response.title}</p>
            </div>
          </div>
          <p>Details about the activity</p>
          <p>{response.details}</p>
          <p>{response.start}</p>
          <p>{response.end}</p>
          {response.location && <p>{response.location.coordinates}</p>}
        </div>
      </Drawer>
    </div>
  );
};

export default ExpandInfo;
