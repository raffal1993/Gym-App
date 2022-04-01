import { styled } from '@mui/material';

export const Wrapper = styled(`div`)(({ theme }) => ({
  fontSize: '38px',
  color: theme.colors.primaryLight,
  height: '100vh',
  display: 'grid',
  placeItems: 'center',

  [theme.breakpoints.down('xs')]: {
    fontSize: '20px',
  },
}));
