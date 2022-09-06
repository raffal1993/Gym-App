import { styled } from '@mui/material';

export const EditModeButtonStyled = styled('button')(({ theme }) => ({
  display: 'flex',
  margin: '10px 0px',
  width: '100px',
  padding: '2px 20px',
  justifyContent: 'center',
  alignSelf: 'center',
  backgroundColor: theme.colors.burlyWood,
  border: `none`,
  boxShadow: `0px 0px 4px 0px ${theme.colors.white}`,
  cursor: 'pointer',

  '&:hover': {
    boxShadow: `0px 0px 5px 1px ${theme.colors.white}`,
  },

  '& svg': {
    fontSize: '2rem',
  },

  [theme.breakpoints.down('sm')]: {
    margin: '5px 20px 10px 20px',
  },
}));
