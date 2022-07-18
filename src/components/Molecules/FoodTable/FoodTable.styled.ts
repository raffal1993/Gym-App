import { styled, TableContainer } from '@mui/material';

export const Wrapper = styled(TableContainer)(({ theme }) => ({
  width: '90%',
  alignSelf: 'center',
  borderRadius: '5px',
  marginBottom: '15px',

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
    wordWrap: 'break-word',

    '&:not(:first-of-type)': {
      textAlign: 'center',
    },
  },

  '& .tableCellTotal': {
    backgroundColor: theme.colors.darkGrey,
    fontSize: '1.2rem',
    borderBottom: '1px solid black',
    fontWeight: 'bold',
    color: theme.colors.primaryLight,
    textShadow: '3px 3px  black',

    '&:not(:first-of-type)': {
      textAlign: 'center',
    },
  },

  '& .tableRowTotal': {
    position: 'sticky',
    bottom: '-1px',

    '& .cellTotal': {
      whiteSpace: 'nowrap',
    },
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

  '& .nutrients': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.colors.primaryLight,
    letterSpacing: '1px',
  },

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

  '& .titleTotal': {
    borderRadius: '3px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    backgroundColor: theme.colors.burlyWood,
    color: theme.colors.bgDark,
    textShadow: 'none',
  },

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
