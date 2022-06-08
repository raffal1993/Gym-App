import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '15px',
  width: '100%',

  '& .searchPanel': {
    '& .info': {
      fontSize: '2.3rem',
      borderTop: `2px solid ${theme.colors.darkGrey}`,
      borderBottom: `2px solid ${theme.colors.darkGrey}`,
      padding: '0px 20px',
      letterSpacing: '2px',
    },
  },

  [theme.breakpoints.down('sm')]: {
    marginTop: '10px',

    '& .searchPanel': {
      '& .info': {
        fontSize: '1.6rem',
      },
    },
  },

  '& .searchWeatherByLocation': {
    background: theme.colors.bgColorOne,
    position: 'absolute',
    top: '0',
    left: '0',
    minWidth: '1px',
    width: '40px',
    height: '35px',
    margin: '10px 10px 0px 10px',
    transition: 'all 0.3s ease-in-out',

    svg: {
      height: '100%',
      width: '100%',
    },

    '&:hover': {
      transform: 'scale(1.1)',
    },

    [theme.breakpoints.down('sm')]: {
      width: '35px',
      height: '25px',
    },
  },
}));
