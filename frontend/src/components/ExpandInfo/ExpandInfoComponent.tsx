import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { ActivityType } from '@/types/Activities';
import { Location, Text, Timeslot } from '@kokitotsos/react-components';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Schedule } from '@/types/Schedule';
import { useExpandInfo } from '../../utils/Hooks/useExpandInfo';
import { getMapLink } from '../../utils/Helpers/getMapLink';

interface ExpandInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityProp?: ActivityType;
  scheduleProp?: Schedule;
}

const ExpandInfo: React.FC<ExpandInfoProps> = ({ open, setOpen, activityProp, scheduleProp }) => {
  const data = useExpandInfo({ activityProp, scheduleProp });
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
          heading={data.generalInfo.title}
          startTime={data.generalInfo.start}
          endTime={data.generalInfo.end}
          presenters={data.presenters}
          type={data.type}
          showEndTime={data.generalInfo.showEndTime}
        ></Timeslot>
        <Text style={{ margin: '20px 0px 20px 0px' }}>
          <p>{data.generalInfo.details}</p>
        </Text>
        {data.location.coordinates.length === 2 && (
          <div
            onClick={() => window.open(getMapLink(data.location.coordinates), '_blank')}
            style={{ cursor: 'pointer' }}
          >
            <Location
              coordinates={[data.location.coordinates[0], data.location.coordinates[1]]}
              title={data.location.title ? data.location.title : 'Location'}
              subtitle={data.location.subtitle ? data.location.subtitle : ''}
            />
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ExpandInfo;
