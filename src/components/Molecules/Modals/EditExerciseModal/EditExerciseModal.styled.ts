import { styled } from '@mui/material';
import { CustomModalWrapper } from '../Modals.styled';

export const Wrapper = styled(CustomModalWrapper)(({ theme }) => ({
  li: {
    flexDirection: 'column',
    borderBottom: `2px solid ${theme.colors.bgDark}`,

    '& .version': {
      display: 'flex',
      alignContent: 'center',

      span: {
        p: {
          marginRight: '10px',
          color: theme.colors.burlyWood,
        },
      },
    },

    '& .sets': {
      display: 'flex',
      padding: '0px 40px',
      gap: '5px',
      alignContent: 'space-between',
      justifyContent: 'center',
      maxHeight: '100px',
      overflowY: 'auto',
      flexWrap: 'wrap',

      '& button': {
        height: '25px',
        width: '35px',
        textAlign: 'center',
        padding: '0px',
        backgroundColor: theme.colors.bgDark,
        fontSize: '1rem',

        '&:hover': {
          transform: 'scale(1.1)',
        },
      },

      '& .removeSet': {
        backgroundColor: theme.colors.bgDark,
        fontWeight: 'bold',
        fontSize: '1rem',
        color: theme.colors.error,
      },
    },
  },

  '& .removeExercise': {
    color: theme.colors.error,
    backgroundColor: theme.colors.bgDark,
    fontFamily: theme.fonts.roboto,
    fontWeight: 'bold',
    fontSize: '1.2rem',
    width: '130px',
    height: `35px`,

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}));
