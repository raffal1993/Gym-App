import { Button, ButtonProps, styled } from '@mui/material';

export const CustomButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: '20px 0px',
  fontSize: '1.2rem',
  padding: '5px',
  width: '50%',
  alignSelf: 'center',

  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));
