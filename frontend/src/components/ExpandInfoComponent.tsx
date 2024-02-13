import React, { useEffect, useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { StyledButton } from '@/styles/StyledActivity';
import axios from 'axios';

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
      {/* <StyledButton onClick={() => setOpen(true)}>Open Drawer</StyledButton>; */}
      <SwipeableDrawer
        anchor='right'
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div style={{ width: '300px', color: 'white' }}>
          <h1>Activity Details</h1>
          <p>{response.title}</p>
          <p>Details about the activity</p>
          <p>{response.details}</p>
          <p>{response.start}</p>
          <p>{response.end}</p>
          {response.location && <p>{response.location.coordinates}</p>}
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default ExpandInfo;
