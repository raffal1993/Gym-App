import { styled } from '@mui/material';

export const InfoStyled = styled('p')(({ theme }) => ({
  fontSize: '1.1rem',
  marginTop: '10px',

  a: {
    textDecoration: 'underline',
  },

  [theme.breakpoints.down('xs')]: {
    marginTop: '7px',
    fontSize: '1rem',
  },
}));

export const TestAcc = styled('p')(({ theme }) => ({
  marginTop: '10px',
  fontSize: '1.1rem',

  a: {
    textDecoration: 'underline',
    marginLeft: '5px',
  },

  [theme.breakpoints.down('xs')]: {
    marginTop: '7px',
    fontSize: '1rem',
  },
}));
