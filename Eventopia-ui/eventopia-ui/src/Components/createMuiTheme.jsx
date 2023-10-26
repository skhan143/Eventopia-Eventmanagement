import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#C71585', // Set your desired primary color here (e.g., green)
    },
  },
});

export default theme;
