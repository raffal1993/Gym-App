import { styled } from '@mui/material';

export const Wrapper = styled(`div`)<{ url: string }>(({ theme, url }) => ({
  background: theme.colors.bgColorOne,
  width: '90%',
  minHeight: '300px',
  maxHeight: '400px',
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

  '&:after': {
    content: '""',
    background: `url('${url}') `,
    backgroundSize: 'cover',
    backgroundPosition: '20%',
    opacity: '.4',
    width: '100px',
    height: '50%',
    position: 'absolute',
    bottom: '-10px',
    right: '-10px',
    borderTopLeftRadius: '100px',
    pointerEvents: 'none',
  },

  '& .buttonEditExercise': {
    position: 'absolute',
    top: '3px',
    left: '15px',
    padding: `5px 10px 3px 10px`,
  },

  [theme.breakpoints.up('lg')]: {
    width: '60%',
  },

  [theme.breakpoints.down('sm')]: {
    minHeight: '350px',
    flexDirection: 'column',
  },
}));

export const TitleStyled = styled(`h1`)(({ theme }) => ({
  fontSize: '2.2rem',
  letterSpacing: '1px',
  fontWeight: '400',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  paddingBottom: '10px',
  margin: '10px 55px 10px 60px',
  pointerEvents: 'none',

  [theme.breakpoints.down('sm')]: {
    fontSize: '1.4rem',
    padding: '5px 0px',
  },

  [theme.breakpoints.down('xs')]: {
    fontSize: '1.2rem',
  },
}));

export const VersionsStyled = styled('div')(({ theme }) => ({
  margin: '10px 0px 10px 20px',

  '& .addVersionButton': {
    backgroundColor: theme.colors.green,
  },
}));
