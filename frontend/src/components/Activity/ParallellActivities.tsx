import { Timeslot } from '@kokitotsos/react-components';
import Box from '@mui/material/Box';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import { ActivityType } from '@/types/Activities';
import { Person, TimeslotType } from '@kokitotsos/react-components/dist/types';

interface ParallellActivitiesProps {
  date: string;
  activity: ActivityType;
  nextActivity: ActivityType;
  skipIndices: Set<number>;
  index: number;
  uniqueKey: string;
  setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  expandInfo: () => void;
  expandInfoOpen: boolean;
  setExpandInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedActivityId: number | null;
}

export const ParallellActivities: React.FC<ParallellActivitiesProps> = (props) => {
  const {
    date,
    activity,
    nextActivity,
    index,
    uniqueKey,
    setSelectedActivityId,
    expandInfo,
    expandInfoOpen,
    setExpandInfoOpen,
    selectedActivityId,
  } = props;

  const getPresenters = (activityType: TimeslotType, currentActivity: ActivityType) => {
    if (activityType === 'presentation' && currentActivity.presenter) {
      return currentActivity.presenter as Person[];
    } else if (activityType === 'externalpresentation' && currentActivity.externalPresenter) {
      return currentActivity.externalPresenter as Person[];
    }
    return [];
  };

  const aKey: string = `${activity}-${index}`;
  const bKey: string = `${nextActivity}-${index + 1}`;

  return (
    <Box
      key={uniqueKey}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '0px auto 0px auto',
      }}
    >
      <a
        key={aKey}
        style={{
          cursor: 'pointer',
          width: '50%',
          marginRight: '10px',
          paddingTop:
            activity.type === 'presentation' || activity.type === 'externalpresentation'
              ? undefined
              : '10px',
        }}
        onClick={() => {
          setSelectedActivityId(activity.id);
          expandInfo();
        }}
      >
        <Timeslot
          key={uniqueKey}
          presenters={getPresenters(activity.type, activity)}
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
          <p>{activity.details.slice(0, 200)}</p>
        </Timeslot>
        {selectedActivityId === activity.id && (
          <ExpandInfo
            activityProp={activity}
            open={expandInfoOpen}
            setOpen={setExpandInfoOpen}
          ></ExpandInfo>
        )}
      </a>
      <a
        key={bKey}
        style={{
          cursor: 'pointer',
          width: '50%',
          paddingTop:
            nextActivity.type === 'presentation' || nextActivity.type === 'externalpresentation'
              ? undefined
              : '10px',
        }}
        onClick={() => {
          setSelectedActivityId(nextActivity.id);
          expandInfo();
        }}
      >
        <Timeslot
          key={`${date}-${index + 1}`}
          presenters={getPresenters(nextActivity.type, nextActivity)}
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
          <p>{nextActivity.details.slice(0, 200)}</p>
        </Timeslot>
        {selectedActivityId === nextActivity.id && (
          <ExpandInfo
            activityProp={nextActivity}
            open={expandInfoOpen}
            setOpen={setExpandInfoOpen}
          ></ExpandInfo>
        )}
      </a>
    </Box>
  );
};
