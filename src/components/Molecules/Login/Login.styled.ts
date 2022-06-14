import { styled } from '@mui/material';

export const InfoStyled = styled('p')(({ theme }) => ({
  marginTop: '10px',
  fontSize: '1.2rem',

  a: {
    borderBottom: `1px solid ${theme.colors.bgDark}`,
  },

  [theme.breakpoints.down('xs')]: {
    marginTop: '7px',
    fontSize: '1.1rem',
  },
}));
