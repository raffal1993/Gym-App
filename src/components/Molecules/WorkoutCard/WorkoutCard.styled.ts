import { styled } from '@mui/material';

export const Wrapper = styled(`div`)<{ url: string }>(({ theme, url }) => ({
  background: 'radial-gradient(circle, rgba(83,95,111,1) 0%, rgba(42,50,61,1) 100%)',
  width: '90%',
  minHeight: '300px',
  marginTop: '30px',
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

  [theme.breakpoints.up('lg')]: {
    width: '60%',
  },

  [theme.breakpoints.down('sm')]: {
    minHeight: '350px',
    flexDirection: 'column',
  },
}));

export const TitleStyled = styled(`h3`)(({ theme }) => ({
  fontSize: '2.2rem',
  width: '100%',
  letterSpacing: '1px',
  fontWeight: '400',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  margin: '5px',
  pointerEvents: 'none',

  [theme.breakpoints.down('xs')]: {},
}));

export const VersionsStyled = styled('div')(({ theme }) => ({
  margin: '0px 0px 10px 10px',
}));
