import { styled, FormGroup } from '@mui/material';

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

  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '250px',
  },
}));
