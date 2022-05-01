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
    burlyWood: 'rgb(222, 184, 135)',
    orange: 'rgb(190,77, 16)',
  },
  fonts: {
    montserrat: `'Montserrat', sans-serif`,
    sarpanch: `'Sarpanch', sans-serif`,
    roboto: `'Roboto', sans-serif`,
  },
  breakpoints: {
    values: {
      xxs: 320,
      xs: 480,
      sm: 768,
      md: 1024,
      lg: 1200,
    },
  },
});

export default theme;
