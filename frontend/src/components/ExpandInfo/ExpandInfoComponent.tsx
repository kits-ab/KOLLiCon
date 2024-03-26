import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { ActivityType } from '@/types/Activities';
import { Location, Text, Timeslot } from '@kokitotsos/react-components';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Schedule } from '@/types/Schedule';
import { useExpandInfo } from '../../utils/Hooks/useExpandInfo';
import { getMapLink } from '../../utils/Helpers/getMapLink';
import DialogContent from '@mui/material/DialogContent';
import { StyledTimeslot } from '@/styles/Timeslot/StyledTimeslot';
import EditActivity from '../EditActivity/EditActivityComponent';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Colors } from '@/styles/Common/colors';
import Testing from '../Testing';

interface ExpandInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityProp?: ActivityType | any;
  scheduleProp?: Schedule;
}

const ExpandInfo: React.FC<ExpandInfoProps> = ({ open, setOpen, activityProp, scheduleProp }) => {
  const data = useExpandInfo({ activityProp, scheduleProp });
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <div>
      {/** Expanded Timeslot */}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'flex-start' }}>
          {/** Back button */}
          <IconButton
            sx={{ justifyContent: 'start', maxWidth: '30px' }}
            onClick={(event) => {
              event.stopPropagation();
              setOpen(false);
            }}
          >
            <ArrowBackIosIcon sx={{ color: '#DBDBD8' }} />
          </IconButton>
          {/** Edit button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              style={{
                color: '#DBDBD8',
                maxWidth: '30px',
                justifyContent: 'end',
                marginRight: '3px',
                padding: '0',
              }}
              onClick={() => setOpenEditModal(true)}
            >
              <EditIcon style={{ marginTop: '10px' }} />
              <Text>
                <h3 style={{ color: '#DBDBD8' }}>Redigera</h3>
              </Text>
            </IconButton>
          </Box>
        </Box>
        <DialogContent sx={{ padding: '0' }}>
          <StyledTimeslot>
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
          </StyledTimeslot>
        </DialogContent>
      </Drawer>
      {/** Edit mode drawer */}
      <SwipeableDrawer
        anchor='bottom'
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onOpen={() => setOpenEditModal(true)}
        onClick={(event) => event.stopPropagation()}
        PaperProps={{
          style: {
            height: '100%',
            overflow: 'scroll',
            backgroundColor: `${Colors.primaryBackground}`,
            borderRadius: '0',
          },
        }}
      >
        <EditActivity
          activityProp={activityProp}
          setOpenEditModal={setOpenEditModal}
          openEditModal={openEditModal}
        />
      </SwipeableDrawer>
    </div>
  );
};

export default ExpandInfo;
