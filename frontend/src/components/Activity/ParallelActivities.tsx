import { Timeslot } from '@kokitotsos/react-components';
import Box from '@mui/material/Box';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import { ActivityType } from '@/types/Activities';
import { getPresenter } from '@/utils/Helpers/getPresenter';
import DateText from '@/styles/DateText';
import { StyledTimeslot } from '@/styles/Timeslot/StyledTimeslot';
import axios from 'axios';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import React, { useState } from 'react';

// Pararell presenter styling for media queries
interface ParallelActivitiesProps {
  date: string;
  activity: ActivityType;
  nextActivity: ActivityType;
  skipIndices: Set<number>;
  index: number;
  setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  expandInfo: () => void;
  expandInfoOpen: boolean;
  setExpandInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedActivityId: number | null;
}

const backendUrl = import.meta.env.VITE_API_URL;

export const ParallelActivities: React.FC<ParallelActivitiesProps> = (props) => {
  const {
    date,
    activity,
    nextActivity,
    index,
    setSelectedActivityId,
    expandInfo,
    expandInfoOpen,
    setExpandInfoOpen,
    selectedActivityId,
  } = props;

  // Denna komponent måste laddas om via use effect
  const handleDeleteOfActivity = async (value: any) => {
    console.log('fetched');
    window.location.reload();

    await axios.delete(`${backendUrl}/api/activity/delete/${value}`);
  };

  return (
    <div>
      {index === 0 ? <DateText>{date}</DateText> : null}
      <Box
        key={activity.id}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <a
          key={`${activity.id}-activity`}
          style={{
            width: '100%',
            cursor: 'pointer',
            marginRight: '5px',
          }}
          onClick={() => {
            setSelectedActivityId(activity.id);
            expandInfo();
          }}
        >
          <StyledTimeslot>
            <Timeslot
              key={`${activity.id}-timeslot`}
              presenters={getPresenter(activity)}
              endTime={activity.end}
              heading={activity.title}
              startTime={activity.start}
              type={activity.type}
              showEndTime={true}
              {...(activity.location.coordinates[0] !== 0
                ? {
                    location: {
                      coordinates: activity.location.coordinates,
                      title: (activity.location.title as string) || 'Location',
                      subtitle: activity.location.subtitle,
                    },
                  }
                : {})}
            >
              <p key={`${activity.id}-details`}>{activity.details.slice(0, 200)}</p>
            </Timeslot>
          </StyledTimeslot>
          {selectedActivityId === activity.id && (
            <ExpandInfo
              activityProp={activity}
              open={expandInfoOpen}
              setOpen={setExpandInfoOpen}
            ></ExpandInfo>
          )}
        </a>
        <RemoveCircleIcon
          onClick={() => {
            handleDeleteOfActivity(activity.id);
          }}
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            height: '25px',
            width: '25px',
          }}
        ></RemoveCircleIcon>
        <a
          key={`${activity.id}-nextactivity`}
          style={{
            width: '100%',
            cursor: 'pointer',
            marginLeft: '5px',
          }}
          onClick={() => {
            setSelectedActivityId(nextActivity.id);
            expandInfo();
          }}
        >
          <StyledTimeslot>
            <Timeslot
              key={`${activity.id}-nextactivity-timeslot`}
              presenters={getPresenter(nextActivity)}
              endTime={nextActivity.end}
              heading={nextActivity.title}
              startTime={nextActivity.start}
              type={nextActivity.type}
              showEndTime={true}
              {...(nextActivity.location.coordinates[0] !== 0
                ? {
                    location: {
                      coordinates: nextActivity.location.coordinates,
                      title: (nextActivity.location.title as string) || 'Location',
                      subtitle: nextActivity.location.subtitle,
                    },
                  }
                : {})}
            >
              <p key={`${activity.id}-nextactivity-details`}>
                {nextActivity.details.slice(0, 200)}
              </p>
            </Timeslot>
          </StyledTimeslot>
          {selectedActivityId === nextActivity.id && (
            <ExpandInfo
              activityProp={nextActivity}
              open={expandInfoOpen}
              setOpen={setExpandInfoOpen}
            ></ExpandInfo>
          )}
        </a>
        <RemoveCircleIcon
          onClick={() => {
            handleDeleteOfActivity(activity.id);
          }}
          style={{
            position: 'absolute',
            bottom: '0',
            right: '50.8%',
            zIndex: 1,
            height: '25px',
            width: '25px',
          }}
        ></RemoveCircleIcon>
      </Box>
    </div>
  );
};
