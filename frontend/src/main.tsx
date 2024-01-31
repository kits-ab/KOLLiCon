import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import { Global, css } from '@emotion/react';

/* eslint-disable react-refresh/only-export-components */
const GlobalStyles = () => (
  <Global
    styles={css`
      #root {
        height: 100vh;
        width: 100%;
      }
    `}
  />
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
