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
  },

  '.hideAddExerciseButton': {
    display: 'flex',
    margin: '7px 0px 10px 0px',
    padding: '2px 20px',
    backgroundColor: theme.colors.primary,
    border: `none`,
    boxShadow: `0px 0px 5px 0px ${theme.colors.white}`,
    cursor: 'pointer',

    '&:hover': {
      boxShadow: `0px 0px 10px 1px ${theme.colors.white}`,
    },

    '& svg': {
      fontSize: '2rem',
    },
  },

  [theme.breakpoints.down('sm')]: {
    '& .addExerciseTabs': {
      width: '95%',
    },
  },
}));
