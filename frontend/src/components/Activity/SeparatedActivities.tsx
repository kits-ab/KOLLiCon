import { Timeslot } from '@kokitotsos/react-components';
import Box from '@mui/material/Box';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import { ActivityType } from '@/types/Activities';
import { Person, TimeslotType } from '@kokitotsos/react-components/dist/types';
import { getPresenter } from '@/utils/Helpers/getPresenter';

interface SeparatedActivitiesProps {
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

export const SeparatedActivities: React.FC<SeparatedActivitiesProps> = (props) => {
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

  const aKey: string = `${activity}-${index}`;
  const bKey: string = `${nextActivity}-${index + 1}`;

  return (
    <Box
      key={uniqueKey}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <a
        key={aKey}
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
        <Timeslot
          key={uniqueKey}
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
          width: '100%',
          cursor: 'pointer',
          marginLeft: '5px',
        }}
        onClick={() => {
          setSelectedActivityId(nextActivity.id);
          expandInfo();
        }}
      >
        <Timeslot
          key={`${date}-${index + 1}`}
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
