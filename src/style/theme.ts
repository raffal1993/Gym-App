import { createTheme } from '@mui/material';

const theme = createTheme({
  colors: {
    bgDark: `rgb(14, 14, 14)`,
    primaryLight: `rgb(218, 218, 218)`,
    error: `rgb(255,0,0)`,
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
