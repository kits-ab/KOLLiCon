import { ActivityType } from '@/types/Activities';
import { Timeslot } from '@kokitotsos/react-components';
import ExpandInfo from '../ExpandInfo/ExpandInfoComponent';
import DateText from '@/styles/DateText';
import { useGetPresenter } from '@/utils/Hooks/useGetPresenter';

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

  const presenters = useGetPresenter();

  return (
    <a
      key={activity.id}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        setSelectedActivityId(activity.id);
        expandInfo();
      }}
    >
      {index === 0 ? <DateText>{date}</DateText> : null}
      <Timeslot
        key={`${activity.id}-timeslot`}
        presenters={presenters(activity)}
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
      {selectedActivityId === activity.id && (
        <ExpandInfo
          key={`${activity.id}-expandinfo`}
          activityProp={activity}
          open={expandInfoOpen}
          setOpen={setExpandInfoOpen}
        ></ExpandInfo>
      )}
    </a>
  );
};
