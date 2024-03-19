import styled from "@emotion/styled";
import {Colors} from "../Common/colors";

export const StyledTimeslot = styled('div')`
    
    // display: grid;
    // justify-content: center;
    // grid-template-columns: repeat(6, 1fr);
    // grid-template-rows: repeat(12, 1fr);
    // column-gap: 5%;
    

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
${({ numberOfParallellActivities, activityType }) => {
    if (numberOfParallellActivities === 3 && (activityType !== "presentation" && activityType !== "externalpresentation")) {
        return `
        @media (max-width: 500px) {
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
    .Timeslot-times {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: 100%;
    }}
  `} else if (numberOfParallellActivities === 3 && (activityType === "presentation" || activityType === "externalpresentation")) {
        return `
        @media (max-width: 500px) {
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
        // .Timeslot-presenter > img {
        //     width: 50px;
        //     height: 50px;
            
        // }
        // .Timeslot-presenter > figure > svg {
        //     width: 50px;
        //     height: 50px;
            
        // }
        .Timeslot-times {
            margin-right: 1px;
        }   
    }
   `
  } else if (numberOfParallellActivities === 2 && (activityType !== "presentation" && activityType !== "externalpresentation")) {
    return `
    @media (max-width: 500px) {
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
}
    
    `
}

}}`;

