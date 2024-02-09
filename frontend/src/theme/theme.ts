import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#262626',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#596b4d',
            color: '#ffffff',
            fontWeight: 'normal',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#475a39',
            },
            '&:active': {
              backgroundColor: '#354a2b',
            },
            '&.MuiButton-contained.Mui-disabled': {
              backgroundColor: '#596b4d',
              color: '#ffffff',
            },
          },
        },
      },
    },
  }),
);
