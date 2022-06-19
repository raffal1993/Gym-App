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

export const GoogleSignInStyled = styled(`div`)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& > p': {
    padding: '0',
    margin: '0',
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '10px',
  },
  '& > img': {
    width: '250px',
    height: '100%',
    marginBottom: '10px',
    cursor: 'pointer',
  },

  [theme.breakpoints.down('xs')]: {
    '& > img': {
      width: '170px',
    },
  },
}));
