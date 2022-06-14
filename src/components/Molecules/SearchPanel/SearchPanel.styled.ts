import { styled } from '@mui/material';

export const SearchPanelStyled = styled('div')(({ theme }) => ({
  width: '95%',
  maxWidth: '700px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: theme.colors.bgColorOne,
  borderRadius: '10px',
  paddingTop: '20px',
  marginBottom: '15px',

  h2: {
    fontSize: '1.6rem',
    fontWeight: '400',
    letterSpacing: '.3rem',
    color: theme.colors.burlyWood,
    marginBottom: '10px',
    textAlign: 'center',
  },

  label: {
    position: 'relative',
    width: '65%',
    margin: '0px 20px',
    textAlign: 'center',

    svg: {
      position: 'absolute',
      top: '50%',
      left: '20px',
      transform: 'translate(-50%, -50%)',
      fontSize: '2rem',
    },

    input: {
      height: '40px',
      width: '100%',
      borderRadius: '5px',
      paddingLeft: '35px',
      textIndent: '-35px',
      textAlign: 'center',
      fontSize: '1.6rem',
      fontWeight: '500',
      fontFamily: theme.fonts.roboto,
      boxShadow: '0px 0px 10px 2px rgba(0,0,0,.6)',

      '::placeholder': {
        fontSize: '1.2rem',
      },
    },
  },

  '.info': {
    fontSize: '1.2rem',
    color: theme.colors.burlyWood,
    textAlign: 'center',
    margin: '20px 0px',
  },

  '.errorMessage': {
    fontSize: '1.4rem',
  },

  button: {
    width: 'auto',
    padding: '5px 15px',
  },

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '90%',
    maxWidth: '500px',
    padding: '20px 20px 0px 20px',

    h2: {
      fontSize: '1.3rem',
    },

    label: {
      width: '95%',

      input: {
        fontSize: '1.3rem',
      },

      svg: {
        fontSize: '1.4rem',
      },
    },
  },
}));
