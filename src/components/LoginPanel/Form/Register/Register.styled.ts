import { styled } from '@mui/material';

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
    marginBottom: '10px',
    cursor: 'pointer',
  },

  [theme.breakpoints.down('xs')]: {
    '& > img': {
      width: '200px',
    },
  },
}));
