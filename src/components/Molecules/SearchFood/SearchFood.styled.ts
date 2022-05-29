import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '15px',
  width: '100%',

  [theme.breakpoints.down('sm')]: {
    marginTop: '10px',
  },
}));

export const SearchBarStyled = styled('div')(({ theme }) => ({
  width: '95%',
  maxWidth: '700px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: theme.colors.bgColorOne,
  borderRadius: '10px',
  paddingTop: '20px',

  h1: {
    fontSize: '1.6rem',
    fontWeight: '400',
    letterSpacing: '.3rem',
    color: theme.colors.burlyWood,
    marginBottom: '10px',
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

    h1: {
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

export const PaginationStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: `rgba(45, 53, 65, 0.8)`,
  width: '100%',
  margin: '0px',
  padding: '15px 0px',

  '& .goToPage': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
    gap: '10px',

    input: {
      borderRadius: '5px',
      width: '50px',
      height: '30px',
      border: 'none',
      textAlign: 'center',
    },

    '& .pageButton': {
      margin: '0',
      padding: '5px',
      minWidth: '40px',
      width: '40px',
    },
  },

  '& .button': {
    display: 'flex',
    width: '150px',
    justifyContent: 'space-evenly',
    margin: '0 20px',
    padding: '5px',

    ':disabled': {
      backgroundColor: `${theme.colors.primary}`,
      color: theme.colors.white,
      opacity: '0.3',
    },
  },

  [theme.breakpoints.down('xs')]: {
    '& .button': {
      width: '100px',
    },
  },
}));
