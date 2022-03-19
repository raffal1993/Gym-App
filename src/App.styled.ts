import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.colors.bgDark,
}));
