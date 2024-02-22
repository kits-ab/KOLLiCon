import { Timeslot } from '@kokitotsos/react-components';
import Box from '@mui/material/Box';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import { ActivityType } from '@/types/Activities';

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
          presenters={activity.presenter}
          endTime={activity.end}
          heading={activity.title}
          startTime={activity.start}
          type={activity.type}
          showEndTime={true}
          {...(activity.location.coordinates[0] !== 0 ? { location: activity.location } : {})}
        >
          <p>{activity.details.slice(0, 200)}</p>
        </Timeslot>
        {selectedActivityId === activity.id && (
          <ExpandInfo activityProp={activity} open={expandInfoOpen} setOpen={setExpandInfoOpen}>
            {/* <button onClick={expandInfo}>Close Drawer</button> */}
          </ExpandInfo>
        )}
      </a>
      <a
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
          presenters={nextActivity.presenter}
          endTime={nextActivity.end}
          heading={nextActivity.title}
          startTime={nextActivity.start}
          type={nextActivity.type}
          showEndTime={true}
          {...(nextActivity.location.coordinates[0] !== 0
            ? { location: nextActivity.location }
            : {})}
        >
          <p>{activity.details.slice(0, 200)}</p>
        </Timeslot>
        {selectedActivityId === nextActivity.id && (
          <ExpandInfo activityProp={nextActivity} open={expandInfoOpen} setOpen={setExpandInfoOpen}>
            {/* <button onClick={expandInfo}>Close Drawer</button> */}
          </ExpandInfo>
        )}
      </a>
    </Box>
  );
};
