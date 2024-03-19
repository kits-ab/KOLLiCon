import styled from '@emotion/styled';
import Box from '@mui/material/Box';

const ActivitiesWrapper = styled(Box)`
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  @media (max-width: 800px) {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    max-width: 95%;
  }
`;

export default ActivitiesWrapper;
