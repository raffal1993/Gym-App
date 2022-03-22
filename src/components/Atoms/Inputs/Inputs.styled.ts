import { FormControl, FormControlProps, styled } from '@mui/material';

export const FormControlStyled = styled(FormControl)<FormControlProps>({
  width: '80%',
  marginBottom: '10px',

  '.MuiInputBase-input': {
    fontSize: '1.4rem',
  },
  '.MuiInputLabel-root': {
    fontSize: '1.4rem',
  },
  '.MuiInputLabel-shrink': {
    fontSize: '1.1rem',
  },
});
