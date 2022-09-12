import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  color: theme.colors.white,
  fontSize: '40px',
  rowGap: '100px',
  padding: '0px 40px',
  marginTop: '30px',
  fontFamily: theme.fonts.montserrat,

  '& .info': {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  svg: {
    fontSize: '50px',
    width: '100%',
    margin: '15px 0px',
  },

  [theme.breakpoints.down('md')]: {
    fontSize: '30px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '20px',
  },
}));
