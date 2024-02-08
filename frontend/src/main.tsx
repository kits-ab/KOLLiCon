import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
// import { CssBaseline } from '@mui/material';
// import { Global, css } from '@emotion/react';
// import { theme } from '@/theme/theme.ts';
// import { ThemeProvider } from '@mui/material';

/* eslint-disable react-refresh/only-export-components */
// const GlobalStyles = () => (
//   <Global
//     styles={css`
//       #root {
//         height: 100vh;
//         height: 100svh;
//         width: 100%;
//       },
//     `}
//   />
// );

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
