import { styled } from '@mui/material';

export const EditModeButtonStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: '15px 20px 0px 20px',
  width: '20%',
  maxWidth: '200px',
  minWidth: '100px',
  padding: '2px 20px',
  justifyContent: 'center',
  alignSelf: 'center',
  backgroundColor: theme.colors.burlyWood,
  border: `none`,
  boxShadow: `0px 0px 4px 0px ${theme.colors.white}`,
  cursor: 'pointer',
  borderRadius: '5px',

  '&:hover': {
    boxShadow: `0px 0px 10px 1px ${theme.colors.white}`,
  },

  '& svg': {
    fontSize: '2rem',
  },

  [theme.breakpoints.down('sm')]: {
    margin: '10px 20px 0px 20px',
  },
}));
