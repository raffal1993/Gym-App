import { styled } from '@mui/material';
import { CustomModalWrapper } from '../Modals.styled';

export const Wrapper = styled(CustomModalWrapper)(({ theme }) => ({
  margin: '0 ',

  '& .newFoodTitle': {
    color: theme.colors.burlyWood,
    margin: '20px 0px',
    fontSize: '1.8rem',
    overflow: 'initial',
  },

  '& .enterFoodName': {
    height: '150px',
  },

  '.errorMessage': {
    fontSize: '1.1rem',
    color: `rgba(255,88,88,1)`,
    margin: '15px 0px 0px 0px',
  },
}));

export const EnterNutrientsStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',

  '& .info': {
    fontSize: '1.2rem',
    color: theme.colors.white,
    marginTop: '15px',
    marginBottom: '5px',
  },

  '& .insertNutrient': {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '90%',
    padding: '8px 0px',
    borderBottom: '1px solid #e0e0e0',

    p: {
      color: theme.colors.white,
      fontSize: '1.4rem',
      width: '30%',
      alignSelf: 'center',
      textTransform: 'capitalize',
    },
    input: {
      width: '55px',
      height: '30px',
      textAlign: 'center',
      borderRadius: '5px',
      fontSize: '1.2rem',
      fontFamily: theme.fonts.sarpanch,
      border: 'none',
    },

    'input:focus::-webkit-input-placeholder': {
      opacity: '0',
    },
  },
}));

export const PickFoodSetStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginBottom: '10px',

  '& .chooseFoodTitle': {
    fontSize: '1.2rem',
    color: theme.colors.burlyWood,
    marginTop: '20px',
  },

  '& .foodSet': {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px',
    marginBottom: '5px',
    minWidth: '40%',
  },

  '& .disabled': {
    pointerEvents: 'none',
    opacity: '0.4',
  },

  '.errorMessageNutrients': {
    fontSize: '1.1rem',
    color: `rgba(255,136,106,1)`,
    margin: '15px 0px 0px 0px',
  },
}));
