import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  width: '200px',
  margin: '10px',
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

  '&:hover': {
    transform: 'scale(1.02)',
    cursor: 'pointer',
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
