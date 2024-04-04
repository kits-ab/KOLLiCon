// import { Schedule } from '@/types/Schedule';
// import ExpandInfo from './ExpandInfoComponent';
// import { useEffect, useState } from 'react';

// // Har bara använt denna för att testa att öppna ett schedule i expandinfo - Johan

// const ScheduleComponent = () => {
//   const [schedule, setSchedule] = useState<Schedule>();
//   const [expandInfoOpen, setExpandInfoOpen] = useState(false);

//   const expandInfo = () => {
//     setExpandInfoOpen(!expandInfoOpen);
//   };

//   useEffect(() => {
//     const fetchSchedule = async () => {
//       const response = await fetch('http://localhost:8080/api/schedule/get/1');
//       const data = await response.json();
//       setSchedule(data);
//     };
//     fetchSchedule();
//   }, []);

//   return (
//     <div>
//       <button onClick={() => expandInfo()}>Expand schedule</button>
//       <ExpandInfo
//         scheduleProp={schedule}
//         open={expandInfoOpen}
//         setOpen={setExpandInfoOpen}
//       ></ExpandInfo>
//     </div>
//   );
// };

// export default ScheduleComponent;
