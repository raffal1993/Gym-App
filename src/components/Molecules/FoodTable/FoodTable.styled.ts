import { styled, TableContainer } from '@mui/material';

export const Wrapper = styled(TableContainer)(({ theme }) => ({
  width: '90%',
  alignSelf: 'center',
  borderRadius: '5px',
  marginBottom: '10px',

  '& .headerCell': {
    backgroundColor: theme.colors.burlyWood,
    fontSize: '1.3rem',
    fontWeight: 'bold',
    borderBottom: 'none',
    color: theme.colors.bgDark,
    padding: '16px 4px',
    textShadow: 'none',

    '&:first-of-type': {
      padding: '16px 4px 16px 16px',
    },
  },

  '& .tableCell': {
    fontSize: '1.3rem',
    borderBottom: '1px solid black',
    color: 'white',
    padding: '16px 10px',
  },

  '& .tableCellTotal': {
    backgroundColor: theme.colors.darkGrey,
    fontSize: '1.2rem',
    borderBottom: '1px solid black',
    fontWeight: 'bold',
    color: theme.colors.primaryLight,
    textShadow: '3px 3px  black',
    padding: '16px 10px',
  },

  '& .tableRowTotal': {
    position: 'sticky',
    bottom: '0',
  },

  '::-webkit-scrollbar': {
    width: '4px',
  },
}));

export const SmallTable = styled('div')(({ theme }) => ({
  '& .mealContainer': {
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
  },

  '& .title': {
    fontSize: '1.8rem',
    color: theme.colors.primaryLight,
    fontWeight: 'bold',
    marginBottom: '15px',
    textShadow: '2px 2px black',
  },

  '& .nutrients': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.colors.primaryLight,
    letterSpacing: '1px',
    textTransform: 'capitalize',
  },

  '& .macronutrient': {
    width: '100%',
    textAlign: 'start',
    color: theme.colors.primaryLight,
    textShadow: 'none',
    marginBottom: '5px',

    '& .value': {
      fontWeight: 'bold',
      color: theme.colors.burlyWood,
    },
  },

  '& .titleTotal': {
    borderRadius: '5px',
    backgroundColor: theme.colors.burlyWood,
    color: theme.colors.bgDark,
    textShadow: 'none',
  },

  '& .nutrientsTotal': {},

  '& .macronutrientTotal': {
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
    borderBottom: '1px solid black',
    padding: '5px 0px',
    color: theme.colors.burlyWood,

    '& .valueTotal': {
      color: theme.colors.white,
    },
  },
}));
