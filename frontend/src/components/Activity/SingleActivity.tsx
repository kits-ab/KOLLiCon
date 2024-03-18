import { ActivityType } from '@/types/Activities';
import { Timeslot } from '@kokitotsos/react-components';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import DateText from '@/styles/DateText';
import { getPresenter } from '@/utils/Helpers/getPresenter';
import { StyledTimeslot } from '@/styles/Timeslot/StyledTimeslot';
import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface SingleActivityProps {
  activity: ActivityType;
  index: number;
  setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  expandInfo: () => void;
  expandInfoOpen: boolean;
  setExpandInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedActivityId: number | null;
  date: string;
  allActivites: ActivityType[];
  showRemoveButtons: boolean;
  giveDataOfPickedActivity: (data: number) => void;
  showButtons: boolean;
}

export const SingleActivity: React.FC<SingleActivityProps> = (props) => {
  const {
    giveDataOfPickedActivity,
    activity,
    index,
    setSelectedActivityId,
    expandInfo,
    expandInfoOpen,
    setExpandInfoOpen,
    selectedActivityId,
    date,
    showButtons,
  } = props;

  const [methodCalled, setMethodCalled] = React.useState(false);

  const calledMe = (value: any) => {
    giveDataOfPickedActivity(value.id);
    setMethodCalled((prevState) => !prevState);
  };

  return (
    <div>
      <a
        key={activity.id}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setSelectedActivityId(activity.id);
          expandInfo();
        }}
      >
        {index === 0 ? <DateText>{date}</DateText> : null}
        <StyledTimeslot>
          <Timeslot
            key={`${activity.id}-timeslot`}
            presenters={getPresenter(activity)}
            connectToPrevious={index !== 0}
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
            key={`${activity.id}-expandinfo`}
            activityProp={activity}
            open={expandInfoOpen}
            setOpen={setExpandInfoOpen}
          ></ExpandInfo>
        )}
      </a>
      {showButtons && (
        <>
          <RemoveCircleIcon
            style={{
              backgroundColor: methodCalled ? '#cccccc' : 'transparent',
              position: 'absolute',
              bottom: '0',
              right: '0',
              zIndex: 1,
              height: '25px',
              width: '25px',
            }}
            onClick={() => {
              calledMe(activity);
            }}
          ></RemoveCircleIcon>
        </>
      )}
    </div>
  );
};
