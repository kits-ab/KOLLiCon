import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#596b4d', //'#424241',
      },
      background: {
        default: '#262626',
      },
      customColor1: {
        main: '#f44336',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#596b4d',
            fontWeight: 'normal',
            textTransform: 'none',
          },
        },
      },
    },
  }),
);
