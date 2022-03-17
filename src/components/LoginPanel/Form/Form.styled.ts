import {
  styled,
  FormGroup,
  Button,
  ButtonProps,
  FormControl,
  FormControlProps,
} from '@mui/material';

export const FormGroupStyled = styled(FormGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.colors.primaryLight,
  width: '400px',
  borderRadius: '10px',
  boxShadow: `0px 0px 2px 2px ${theme.colors.primaryLight}`,
  margin: '40px 60px 70px 60px',
  paddingBottom: '15px',

  '& > h4.title': {
    fontSize: '2.5rem',
    fontWeight: '600',
    padding: '10% 0px',
  },

  '& > p.errorMessage': {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.error,
    paddingBottom: '10px',
    letterSpacing: '2px',
    fontFamily: theme.fonts.gillSans,
  },

  '& > p.info_register, & > p.info_forgotPassword': {
    display: 'flex',
    fontSize: '1.1rem',
    marginTop: '10px',

    a: {
      textDecoration: 'underline',
    },
  },

  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '250px',
    '& > h4.title': {
      fontSize: '2rem',
    },
    '& > p.errorMessage': {
      fontSize: '1.3rem',
    },
  },
}));

export const ButtonStyled = styled(Button)<ButtonProps>({
  margin: '20px 0px',
  fontSize: '1.2rem',
  padding: '5px',
  width: '50%',
  alignSelf: 'center',
});

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
