import { styled } from '@mui/material';

export const LoginPanelTitleStyled = styled('h4')(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: '600',
  padding: '10% 0px',

  [theme.breakpoints.down('xs')]: {
    fontSize: '2rem',
  },
}));
