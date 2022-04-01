import { createTheme } from '@mui/material';

const theme = createTheme({
  colors: {
    primary: `rgb(25,118,210)`,
    bgDark: `rgb(14, 14, 14)`,
    primaryLight: `rgb(218, 218, 218)`,
    white: `rgb(255,255,255)`,
    error: `rgb(255,0,0)`,
    purple: 'rgb(128,0,128)',
    whiteLight: 'rgba(230,230,250,0.3)',
    darkGrey: 'rgb(62,62,62)',
  },
  fonts: {
    montserrat: `'Montserrat', sans-serif`,
    sarpanch: `'Sarpanch', sans-serif`,
    gillSans: `'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
    sans-serif`,
  },
  breakpoints: {
    values: {
      xs: 480,
      sm: 768,
      md: 1024,
      lg: 1200,
    },
  },
});

export default theme;
