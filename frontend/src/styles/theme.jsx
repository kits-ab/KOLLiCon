import { ThemeProvider } from '@emotion/react';

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#1A1A1A',
    // ...more colors
  },
  // ...more theme properties
};

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
