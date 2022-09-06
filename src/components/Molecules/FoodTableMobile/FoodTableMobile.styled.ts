import { styled } from '@mui/material';

export const FoodTableMobileStyled = styled('div')(() => ({}));

export const FoodsContainerStyled = styled('div')(({ theme }) => ({
  width: '98%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
  fontFamily: theme.fonts.montserrat,
  textAlign: 'center',
  borderBottom: '2px solid black',
  fontSize: '1.5rem',
  padding: '10px',

  '&:last-of-type': {
    border: 'none',
  },

  '& .title': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center',
    fontSize: '1.5rem',
    color: theme.colors.primaryLight,
    fontWeight: 'bold',
    marginBottom: '15px',
    textShadow: '2px 2px black',
    wordBreak: 'break-word',

    '& .weight': {
      fontSize: '1.2rem',
    },
  },
}));
export const NutrientsStyled = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  color: theme.colors.primaryLight,
  letterSpacing: '1px',

  '& .macronutrient': {
    width: '100%',
    display: 'flex',
    textAlign: 'start',
    color: theme.colors.primaryLight,
    textShadow: 'none',
    marginBottom: '5px',

    '& .key': {
      width: '50%',
      direction: 'rtl',
      marginRight: '10px',
      textTransform: 'capitalize',
    },

    '& .value': {
      fontWeight: 'bold',
      textShadow: '2px 2px black',
      color: theme.colors.burlyWood,
    },
  },
}));

export const FoodsContainerTotalStyled = styled(FoodsContainerStyled)(({ theme }) => ({
  '& .titleTotal': {
    borderRadius: '3px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    backgroundColor: theme.colors.burlyWood,
    color: theme.colors.bgDark,
    textShadow: 'none',
  },
}));
export const NutrientsTotalStyled = styled(NutrientsStyled)(({ theme }) => ({
  '& .macronutrientTotal': {
    width: '100%',
    borderBottom: '1px solid black',
    padding: '5px 0px',
    color: theme.colors.burlyWood,
    border: '1px solid black',
    '& .keyTotal': {
      textShadow: '2px 2px black',
    },
    '& .valueTotal': {
      color: theme.colors.white,
    },
  },
}));
