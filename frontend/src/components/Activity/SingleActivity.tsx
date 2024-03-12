import { ActivityType } from '@/types/Activities';
import { Timeslot } from '@kokitotsos/react-components';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import DateText from '@/styles/DateText';
import { getPresenter } from '@/utils/Helpers/getPresenter';
import { StyledTimeslot } from '@/styles/Timeslot/StyledTimeslot';
import axios from 'axios';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Colors } from '@/styles/Common/colors';

interface SingleActivityProps {
  activity: ActivityType;
  index: number;
  setSelectedActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  expandInfo: () => void;
  expandInfoOpen: boolean;
  setExpandInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedActivityId: number | null;
  date: string;
}

// .css-1gan52j
const backendUrl = import.meta.env.VITE_API_URL;

export const SingleActivity: React.FC<SingleActivityProps> = (props) => {
  const {
    activity,
    index,
    setSelectedActivityId,
    expandInfo,
    expandInfoOpen,
    setExpandInfoOpen,
    selectedActivityId,
    date,
  } = props;

  const handleDeleteOfActivity = async (value: any) => {
    await axios.delete(`${backendUrl}/api/activity/delete/${value}`);
  };

  return (
    <div>
      <a
        key={activity.id}
        style={{ cursor: 'pointer', zIndex: 1, position: 'relative' }}
        onClick={() => {
          setSelectedActivityId(activity.id);
          expandInfo();
        }}
      >
        {index === 0 ? <DateText>{date}</DateText> : null}
        <StyledTimeslot style={{ position: 'relative', zIndex: 2 }}>
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
      <RemoveCircleIcon
        onClick={() => {
          handleDeleteOfActivity(activity.id);
        }}
        style={{
          color: `${Colors.primaryDeleteButton}`,
          height: '25px',
          width: '25px',
          left: '93%',
          bottom: '128px',
          position: 'relative',
          zIndex: 3,
        }}
      >
        Delete
      </RemoveCircleIcon>
    </div>
  );
};
