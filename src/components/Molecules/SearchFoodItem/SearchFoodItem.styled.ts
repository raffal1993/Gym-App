import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  width: '200px',
  margin: '10px',
  position: 'relative',
  fontSize: '1.1em',
  fontFamily: theme.fonts.montserrat,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.colors.darkGrey,
  color: 'white',
  padding: '10px',
  borderRadius: '10px',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.8)',
  transition: 'all 0.1s ease-in-out',
  overflow: 'hidden',

  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.03)',
  },

  '.foodName': {
    textAlign: 'center',
    marginBottom: '10px',
    color: theme.colors.burlyWood,
  },

  'svg,img': {
    height: '150px',
    width: '100%',
    marginBottom: '10px',
  },

  [theme.breakpoints.down('xs')]: {
    width: '130px',
    fontSize: '1rem',

    'svg,img': {
      height: '75px',
      width: '100%',
    },
  },
}));

export const NutrientsStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'end',
  flexWrap: 'wrap',
  fontSize: '1.2rem',
  alignItems: 'center',

  p: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    span: {
      marginLeft: '20px',
      fontWeight: 'bold',
      color: theme.colors.burlyWood,
    },
  },

  [theme.breakpoints.down('xs')]: {
    margin: '0px',
    maxHeight: 'initial',
  },
}));

export const AddToFoodSetStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  backgroundColor: theme.colors.darkGrey,
  fontFamily: theme.fonts.montserrat,
  color: theme.colors.burlyWood,
  width: '100%',
  height: '100%',
  transform: 'translateY(100%)',
  transition: 'transform 0.3s linear',
  overflowY: 'auto',
  paddingBottom: '20px',
  animation: 'show 0.3s linear forwards',

  '@keyframes show': {
    '100%': {
      transform: 'translateY(0)',
    },
  },

  '& .title': {
    width: '90%',
    alignSelf: 'center',
    minHeight: '30px',
    lineHeight: '30px',
    margin: '0px',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    paddingBottom: '0px',
  },

  '& .foodSetButton': {
    width: '90%',
    wordBreak: 'break-all',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.4)',
    backgroundColor: 'transparent',
    padding: '5px 15px',
    margin: '15px',
    color: theme.colors.primaryLight,

    '&:hover': {
      boxShadow: 'inset 0px 0px 10px 0px rgba(0,0,0,0.9)',
    },
  },

  [theme.breakpoints.down('xs')]: {
    '& .title': {
      fontSize: '.8rem',
    },
  },
}));
