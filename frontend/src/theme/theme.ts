import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import {Colors} from '../styles/Common/colors';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: {
        default:  `${Colors.primaryBackground}`,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: `${Colors.primaryAddButton}`,
            color: '#ffffff',
            fontWeight: 'normal',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: `${Colors.hoverAddButton}`,
            },
            '&:active': {
              backgroundColor: '#354a2b',
            },
            '&.MuiButton-contained.Mui-disabled': {
              backgroundColor: `${Colors.primaryAddButton}`,
              color: '#ffffff',
            },
          },
        },
      },
    },
  }),
);
