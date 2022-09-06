import { styled } from '@mui/material';

export const ErrorMessageStyled = styled('p')(({ theme }) => ({
  fontSize: '1.6rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: theme.colors.error,
  paddingBottom: '10px',
  letterSpacing: '2px',
  fontFamily: theme.fonts.roboto,

  [theme.breakpoints.down('xs')]: {
    fontSize: '1.3rem',
  },
}));
