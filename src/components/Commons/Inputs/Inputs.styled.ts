import { FormControl, FormControlProps, styled } from '@mui/material';

export const FormControlStyled = styled(FormControl)<FormControlProps>(({ theme }) => ({
  width: '80%',
  marginBottom: '10px',

  '.MuiInputBase-input': {
    fontSize: '1.4rem',
  },

  '.MuiOutlinedInput-root': {
    fontSize: '1.4rem',
  },

  '.Mui-focused': {
    fontSize: '1.4rem',
  },
  '.MuiInputLabel-root': {
    fontSize: '1.4rem',
  },

  '.MuiInputLabel-shrink': {
    fontSize: '1.1rem',
    transform: 'translate(14px, -6px) scale(1)',
  },

  [theme.breakpoints.down('sm')]: {
    '.MuiInputBase-input': {
      fontSize: '1.2rem',
      padding: '10px',
    },

    '.MuiInputLabel-root': {
      fontSize: '1.2rem',
      transform: 'translate(14px, 50%)',
    },

    '.MuiOutlinedInput-root': {
      fontSize: '1.2rem',
    },

    '.Mui-focused': {
      fontSize: '1.1rem',
    },

    '.MuiInputLabel-shrink': {
      fontSize: '1.1rem',
      transform: 'translate(14px, -6px) scale(.8)',
    },
  },
}));
