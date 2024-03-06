import styled from "@emotion/styled";
import {Colors} from "../Common/colors";

export const StyledTimeslot = styled('div')`
& > section, .MuiDialogContent-root > section {
    background-color: ${Colors.primaryBorder};
  }
  & > section > div {
      border-color: ${Colors.primaryBackground};
  }
  
  & > section > div > p, 
  .Timeslot-heading, 
  .Timeslot-start, 
  .MuiDialogContent-root > div > p {
        color: ${Colors.primaryText};
  } 
  section > header > div > div > div > span {
      color: ${Colors.linkColor}
  }

`;