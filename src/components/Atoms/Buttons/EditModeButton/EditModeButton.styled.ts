import { styled } from '@mui/material';

export const EditModeButtonStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: '7px 0px 10px 0px',
  padding: '2px 40px',
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
}));
