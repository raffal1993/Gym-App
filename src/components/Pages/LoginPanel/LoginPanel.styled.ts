import { styled, FormGroup } from '@mui/material';

export const FormGroupStyled = styled(FormGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.colors.primaryLight,
  width: '450px',
  borderRadius: '3px',
  boxShadow: `0px 0px 2px 2px ${theme.colors.primaryLight}`,
  margin: '40px 60px 70px 60px',
  paddingBottom: '15px',

  [theme.breakpoints.down('sm')]: {
    width: '350px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '300px',
  },
}));
