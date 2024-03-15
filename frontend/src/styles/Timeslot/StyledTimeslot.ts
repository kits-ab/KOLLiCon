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