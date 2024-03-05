import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import styled from '@emotion/styled';
import {Colors} from '../Common/colors';

// Används inte längre

export const useStyledDrawer = () => {
  const matches = useMediaQuery('(min-width:600px)');

  const StyledDrawer = styled(Drawer)`
    & > .MuiPaper-root {
      background-color: ${Colors.primaryBackground};
      height: 100%;
      padding: 20px;
      border-radius: 0px;
      color: #dbdbd8;
      transition: transform 500ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      width: ${matches ? '50%' : '100%'};
    }
  `;

  return StyledDrawer;
};
