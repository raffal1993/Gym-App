import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  width: '200px',
  minHeight: '350px',
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

  '& .spinner': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
  },

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
    height: '100%',
    width: '100%',
    marginBottom: '10px',
  },

  [theme.breakpoints.down('xs')]: {
    width: '150px',
    minHeight: '250px',
    fontSize: '1rem',

    'svg,img': {
      height: '80%',
      width: '80%',
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
  minWidth: '80%',

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
  cursor: 'default',

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

  '& .titleNoSets': {
    margin: 'auto',
  },

  '& .foodSetButton': {
    width: '90%',
    wordBreak: 'break-all',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.4)',
    backgroundColor: 'transparent',
    padding: '5px 15px',
    margin: '15px',
    color: theme.colors.primaryLight,

    ':disabled': {
      opacity: '0.4',
    },

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

export const InsertWeightStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '15px',
  height: '100%',

  input: {
    minHeight: '35px',
    width: '40%',
    textAlign: 'center',
    borderRadius: '5px',
    border: 'none',
    fontFamily: theme.fonts.sarpanch,
  },

  '& .weightTitle': {
    letterSpacing: 'initial',
  },

  '& .weightButton': {
    width: '50%',
    fontSize: '1rem',
  },

  '& .error': {
    position: 'absolute',
    bottom: '20px',
    fontSize: '1.1rem',
  },

  [theme.breakpoints.down('xs')]: {
    '& .weightTitle': {
      fontSize: '1.2rem',
    },

    '& .error': {
      fontSize: '1rem',
    },
  },
}));
