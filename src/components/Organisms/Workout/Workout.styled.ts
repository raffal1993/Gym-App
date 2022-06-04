import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',

  '&:last-child:after': {
    content: '""',
    display: 'block',
    width: '100%',
    minHeight: '30px',
    backgroundColor: 'transparent',
  },

  '.addExerciseTabs': {
    border: `none`,
    boxShadow: `0px 0px 3px 1px ${theme.colors.white}`,
    minHeight: '70px',
    width: '100%',
    display: 'flex',
    borderRadius: '10px',
    padding: '0',

    '& .MuiTabs-indicator': {
      display: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      minHeight: '50px',
      borderRadius: '0px',
    },
  },

  [theme.breakpoints.down('sm')]: {
    '& .addExerciseTabs': {
      width: '95%',
    },
  },
}));
