import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { EventsWrapper } from '../RegisterActivity/StyledActivity';
import { ScheduleHeaderStyled } from '../CreateSchedule/StyledSchedule';
import { Colors } from '../Common/colors';

export const NotificationEventsWrapper = styled(EventsWrapper)`
  padding-bottom: 10%;
  @media (max-width: 650px) {
    margin-bottom: 20px;
    max-width: 100%;
  }
`;

export const NotificationWrapper = styled(Box)`
  text-align: start;
  margin: 10px 0 0 0;
  @media (max-width: 650px) {
    margin:  10px 0 0 0;
    text-align: start;

`;
export const NotificationHeader = styled(ScheduleHeaderStyled)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: end;
  margin: 0 1% -10px 33%;
  @media (max-width: 650px) {
    margin: 0 0% -10px 4%;
  }
`;
export const NotificationBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  border-top: 1px solid ${Colors.primaryBorder};
  border-bottom: 1px solid ${Colors.primaryBorder};
  padding: 10px;
  align-items: center;
`;
export const MessageBox = styled(Box)`
  font-size: 17px;
  flex: 1;
  margin: 8px;
  margin-left: 10px;
  padding-right: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${Colors.buttonText};
  text-align: start;
`;
export const TitleBox = styled(MessageBox)`
  padding-right: 10px;
  margin-left: 20px;
  font-size: 15px;
`;

export const NotificationContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 25%;
  align-items: end;
  @media (max-width: 650px) {
    margin-right: 5%;
  }
`;
export const NotificationHeaderStyled = styled(ScheduleHeaderStyled)`
  margin: 0 1% -10px 28%;
  @media (max-width: 650px) {
    margin: 0 0% -10px 4%;
  }
`;

export const TextBox = styled(NotificationBox)`
  border-top: none;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 0 0 0 10px;
  @media (max-width: 650px) {
    padding: 0 30px 0 30px;
  }
`;

export const MessageHeader = styled(NotificationHeader)`
  margin: 0 1% -10px 0%;
  @media (max-width: 650px) {
    margin: 0 0% -10px 4%;
  }
`;

export const NotificationPoint = styled.span`
  position: absolute;
  top: 14px;
  left: 27px;
  background-color: ${Colors.primaryDeleteButton};
  border-radius: 50%;
  width: 12px;
  height: 12px;
`;
