import styled from '@emotion/styled';
import { InputStyled, TextAreaStyled, HeaderEditStyled, HeaderStyled } from '../RegisterActivity/StyledActivity';

export const ScheduleTextArea = styled(TextAreaStyled)`
  height: 300px;
  margin: 2% 7% 0 7%;
  padding: 8px 0 0% 12px;
`;

export const ScheduleInputStyled = styled(InputStyled)`
  margin: 10px 7% 5% 7%;
  height: 40px;
`;

export const ScheduleHeaderStyled = styled(HeaderEditStyled)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: end;
  margin: 0 1% -10px 28%;
  @media (max-width: 650px) {
    margin: 0 0% -10px 11%;
  }
`;

export const ScheduleHeaderTitle = styled(HeaderStyled)`
  font-weight: lighter;
  margin: 2% 10% 0px 0;

  @media (max-width: 650px) {
    margin: 10px 5% 0 0;
  }
`;