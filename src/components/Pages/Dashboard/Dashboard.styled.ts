import { styled } from '@mui/material';

export const Wrapper = styled(`div`)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  display: 'grid',
  gridTemplateColumns: '45px 205px 1fr',
  gridTemplateRows: `50px 65px 1fr`,
}));
