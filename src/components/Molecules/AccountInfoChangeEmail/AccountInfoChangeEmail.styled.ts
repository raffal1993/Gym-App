import { styled } from '@mui/material';

export const AccountInfoChangeEmailStyled = styled('label')(({ theme }) => ({
  margin: '40px 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  width: '100%',

  span: {
    textShadow: 'none',
    fontSize: '1.3rem',
  },

  div: {
    width: '50%',
    minWidth: '200px',
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

    input: {
      border: 'none',
      textAlign: 'center',
      fontSize: '1.3rem',
      fontFamily: theme.fonts.roboto,
      fontWeight: '600',
      height: '30px',
      width: '100%',

      '&:focus': {
        outline: 'none',
      },
    },

    button: {
      position: 'absolute',
      right: '-60px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '40px',
      border: `none`,
      borderRadius: '25px',

      svg: {
        color: theme.colors.white,
      },

      '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.colors.purple,
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    div: {
      paddingRight: '10px',
      button: {
        left: 'calc(100% - 5px)',
        backgroundColor: 'black',
      },
    },
  },
}));
