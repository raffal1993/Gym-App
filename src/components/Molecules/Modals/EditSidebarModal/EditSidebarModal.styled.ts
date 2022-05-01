import { styled } from '@mui/material';

export const Wrapper = styled(`div`)(({ theme }) => ({
  maxHeight: '580px',
  padding: '0px 10px',

  ul: {
    li: {
      display: 'flex',
      alignContent: 'center',
      button: {
        marginLeft: '5px',
        fontSize: '1.8rem',
        padding: '2px 5px',
      },

      '.confirmation': {
        backgroundColor: theme.colors.orange,
        fontSize: '1.4rem',
      },

      span: {
        color: theme.colors.white,
        fontSize: '1.6rem',
        padding: '5px 20px',
        marginLeft: '5px',
        borderRadius: '10px',
        alignSelf: 'center',

        '&.active': {
          boxShadow: 'inset 0px 0px 10px 0px rgba(0,0,0,0.75)',
        },

        '&:hover': {
          boxShadow: 'inset 0px 0px 10px 0px rgba(0,0,0,0.75)',
          cursor: 'pointer',
        },
      },
    },
  },
}));
