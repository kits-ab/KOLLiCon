import styled from "@emotion/styled";
import {Colors} from "../Common/colors";

export const StyledTimeslot = styled('div')`


    & > section, 
    .MuiDialogContent-root > section {
        background-color: ${Colors.primaryBorder};
    }
    & > section > div {
        border-color: ${Colors.primaryBackground};
    }  
    .Timeslot-heading, 
    .Timeslot-start, 
    * >  p {
        color: ${Colors.primaryText};
    } 
  section > header > div > div > div > span {
      color: ${Colors.linkColor}
  }


`;

interface StyledTimeslotProps {
    numberOfParallellActivities: number;
    activityType: string;
}

export const TimeSlotWrapper = styled(StyledTimeslot)<StyledTimeslotProps>`
        height: 100%;
        margin-top: 30px;
        padding-bottom: 30px;

${({ numberOfParallellActivities, activityType }) => {
    if (numberOfParallellActivities === 3 && (activityType !== "presentation" && activityType !== "externalpresentation")) {
        return `
        @media (max-width: 600px) {
        .Timeslot-header {
            display: flex;
            flex-direction: column;
            width: 100%;
            flex-wrap: wrap;
        }
        .Timeslot-info {
            display: flex;
            flex-direction: column;
        }
        .Timeslot-info > h3 {
            width: 100%;
            margin-left: 0;
        }
        .Timeslot-heading {
            font-size: 15px;
        }
        .Timeslot-times {
            display: flex;
            flex-direction: column;
            align-items: start;
            width: 100%;
        }}
  `} else if (numberOfParallellActivities === 3 && (activityType === "presentation" || activityType === "externalpresentation")) {
        return `
        @media (max-width: 600px) {
        .Timeslot-header{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            
        }
        .Timeslot-presenter {
            display: flex;
            flex-direction: column;
            width: 100%;
            flex-wrap: wrap;
        }
    }
   `
  } else if (numberOfParallellActivities === 2 && (activityType !== "presentation" && activityType !== "externalpresentation")) {
        return `
        @media (max-width: 600px) {
        .Timeslot-header {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
        }
        .Timeslot-info {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: start;
        }
        .Timeslot-info > h3 {
            width: 100%;
            margin-left: 0;
        }
        }`
}
}}`;




  export const GridWrapper = styled.div`
  display: grid;
//   align-items: stretch;
  justify-content: center;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 2%;
  // overflow: auto;
  // grid-auto-rows: 1fr;
  // grid-template-rows: repeat(192, 1fr);
  // row-gap: 30px;
  // justify-items: center;
  // & > h1 {
  //   align-self: center;
  // }
`;

