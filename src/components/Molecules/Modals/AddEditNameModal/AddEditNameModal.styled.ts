import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  minHeight: '200px',
  width: '250px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  fontFamily: theme.fonts.sarpanch,

  '.title': {
    fontSize: '1.6rem',
    color: theme.colors.white,
    textAlign: 'center',
  },

  input: {
    height: '40px',
    width: '80%',
    borderRadius: '10px',
    fontSize: '1.4rem',
    fontFamily: 'inherit',
    textAlign: 'center',
  },

  '.errorMessage': {
    fontSize: '1.1rem',
    color: `rgba(239,176,176,1)`,
  },

  button: {
    padding: '5px 20px',
    fontSize: '1.2rem',
    fontFamily: 'inherit',
  },
}));
