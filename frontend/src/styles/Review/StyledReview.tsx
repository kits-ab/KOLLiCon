import styled from '@emotion/styled';
import Rating from '@mui/material/Rating';
import { Colors } from '../Common/colors';
import { fonts } from '@kokitotsos/react-components';
import { SubmitButton } from '../RegisterActivity/StyledActivity';

export const StyledRating = styled(Rating)`
  width: 60%;
  max-width: 200px;
  margin-bottom: 15px;
  justify-content: space-between;
  .MuiRating-iconEmpty {
    color: gray;
  }
  .MuiRating-icon {
    font-size: 30px;
  }
`;

export const SuccessMessage = styled.div`
  color: ${Colors.primaryAddButton};
  display: flex;
  justify-content: center;
  margin: 4% 0 4% 0;
  font-family: ${fonts.thin};
`;

export const StyledSubmitButton = styled(SubmitButton)`
  margin: 30px 0px 0px 0px;
  margin-right: 0px;
  width: 150px;
`;
