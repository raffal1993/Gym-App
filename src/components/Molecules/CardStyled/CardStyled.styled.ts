import { styled } from '@mui/material';

export const CardWrapper = styled(`div`)(({ theme }) => ({
  background: theme.colors.bgColorOne,
  width: '90%',
  minHeight: '300px',
  maxHeight: '500px',
  marginTop: '30px',
  marginBottom: '25px',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
  color: theme.colors.burlyWood,
  fontFamily: theme.fonts.sarpanch,
  textShadow: '0px 0px 2px white',

  [theme.breakpoints.up('lg')]: {
    width: '60%',
  },

  [theme.breakpoints.down('sm')]: {
    minHeight: '350px',
    flexDirection: 'column',
  },
}));

export const TitleStyled = styled(`h1`)(({ theme }) => ({
  fontSize: '1.8rem',
  letterSpacing: '1px',
  fontWeight: '400',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  padding: '5px 0px 10px 0px',
  margin: '10px 55px 10px 60px',
  pointerEvents: 'none',
  wordBreak: 'break-word',

  [theme.breakpoints.down('sm')]: {
    fontSize: '1.4rem',
  },

  [theme.breakpoints.down('xs')]: {
    fontSize: '1.2rem',
  },
}));
