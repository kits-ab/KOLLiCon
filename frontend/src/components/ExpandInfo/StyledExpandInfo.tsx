import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import styled from '@emotion/styled';

export const useStyledDrawer = () => {
  const matches = useMediaQuery('(min-width:600px)');

  const StyledDrawer = styled(Drawer)`
    & > .MuiPaper-root {
      background-color: #262626;
      height: 100%;
      padding: 20px;
      border-radius: 0px;
      color: #dbdbd8;
      width: ${matches ? '50%' : '100%'};
    }
  `;

  return StyledDrawer;
};
