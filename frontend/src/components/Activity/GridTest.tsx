import { ActivityType } from '@/types/Activities';
import { Schedule } from '@/types/Schedule';
import { Timeslot } from '@kokitotsos/react-components';
import { TimeslotType } from '@kokitotsos/react-components/dist/types';
import useSchedule from '@/utils/Hooks/useSchedule';

export const GridTest: any = () => {
  const start = new Date();
  const end = new Date();
  const type = TimeslotType.Presentation;
  const [activitiesData, scheduleTime] = useSchedule();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: '800px',
          display: 'grid',
          justifyContent: 'center',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
        }}
      >
        <Timeslot
          style={{
            color: 'white',
            backgroundColor: 'red',
            width: '200px',
            gridRowStart: 1,
            gridRowEnd: 4,
            gridColumnStart: 1,
            gridColumnEnd: 1,
          }}
          type={type}
          heading={`Title 1`}
          startTime={start}
          endTime={end}
        >
          semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id
          aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien
          pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor
          magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer
          eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis
          cursus in hac habitasse platea dictumst quisque sagittis purus sit
        </Timeslot>
        <Timeslot
          style={{
            color: 'white',
            backgroundColor: 'red',
            width: '200px',
            gridRowStart: 1,
            gridRowEnd: 1,
            gridColumnStart: 2,
            gridColumnEnd: 2,
          }}
          type={type}
          heading={`Title 2`}
          startTime={start}
          endTime={end}
        >
          semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id
          aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien
          pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor
          magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer
          eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis
          cursus in hac habitasse platea dictumst quisque sagittis purus sit
        </Timeslot>
        <Timeslot
          style={{
            color: 'white',
            backgroundColor: 'red',
            width: '200px',
            gridRowStart: 2,
            gridRowEnd: 3,
            gridColumnStart: 2,
            gridColumnEnd: 2,
          }}
          type={type}
          heading={`Title 3`}
          startTime={start}
          endTime={end}
        >
          semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id
          aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien
          pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor
          magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer
          eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis
          cursus in hac habitasse platea dictumst quisque sagittis purus sit
        </Timeslot>
        <Timeslot
          style={{
            color: 'white',
            backgroundColor: 'red',
            width: '200px',
            gridRowStart: 3,
            gridRowEnd: 4,
            gridColumnStart: 2,
            gridColumnEnd: 2,
          }}
          type={type}
          heading={`Title 4`}
          startTime={start}
          endTime={end}
        >
          semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id
          aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien
          pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor
          magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer
          eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis
          cursus in hac habitasse platea dictumst quisque sagittis purus sit
        </Timeslot>
      </div>
    </div>
  );
};
