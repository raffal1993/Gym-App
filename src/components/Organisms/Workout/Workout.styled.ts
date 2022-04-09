import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',

  '.AddWorkout': {
    border: `none`,
    boxShadow: `0px 0px 3px 1px ${theme.colors.white}`,
    height: '70px',
    width: '100%',
    display: 'flex',
    borderRadius: '10px',
    padding: '0',

    '& .MuiTabs-indicator': {
      display: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      margin: '5px 10px 0px 10px',
    },
  },
}));
