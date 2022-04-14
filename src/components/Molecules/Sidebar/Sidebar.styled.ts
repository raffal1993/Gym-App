import { List, ListProps, styled } from '@mui/material';
import { darken } from '@mui/system';

// GRID TEMPLATE "/Dashboard.styles.ts"
// gridTemplateColumns: '45px 205px 1fr',
// gridTemplateRows: `50px 65px 1fr`,

export const Wrapper = styled(`div`)(({ theme }) => ({
  color: theme.colors.white,
  display: 'grid',
  gridArea: '1/1/4/3',
  gridTemplateColumns: '40px 1fr 15px',
  gridTemplateRows: `50px 70px 1fr`,
  marginRight: '5px',
}));

export const SidebarListStyled = styled(List)<ListProps & { is_sidebar_hide: string }>(
  ({ theme, is_sidebar_hide }) => ({
    backgroundColor: theme.colors.primary,
    borderTop: `2px solid ${theme.colors.darkGrey}`,
    borderRight: `2px solid ${theme.colors.darkGrey}`,
    gridArea: '3/1/3/3',
    marginTop: '5px',
    overflowY: 'auto',
    overflowX: 'hidden',

    '::-webkit-scrollbar': {
      width: '4px',
    },

    '& .listNumber': {
      textAlign: 'center',
      fontSize: '2rem',
      minWidth: '30px',
      borderRight: `2px solid ${theme.colors.bgDark}`,
    },

    '& .MuiListItemButton-root': {
      marginBottom: '10px',

      '&:hover': {
        backgroundColor: theme.colors.whiteLight,
      },
    },

    '& .MuiTypography-root': {
      fontFamily: theme.fonts.roboto,
      textTransform: 'uppercase',
      fontSize: '1.3rem',
      textAlign: 'center',
      paddingLeft: '10px',
      letterSpacing: '.1rem',
    },

    '& .Mui-selected, & .Mui-selected:hover': {
      backgroundColor: `${theme.colors.purple} !important`,
    },

    ...(is_sidebar_hide === 'true' && {
      ...{
        gridArea: '2/1/4/2',

        '.MuiListItemButton-root': {
          paddingLeft: '4px',
        },

        '.listNumber': {
          borderRight: 'none',
        },
      },
    }),
  }),
);

export const SliderStyled = styled(`div`)<{ is_sidebar_hide: string }>(
  ({ theme, is_sidebar_hide }) => ({
    marginTop: '5px',
    borderTopRightRadius: '20px',
    gridArea: '3/3/4/4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darken(theme.colors.darkGrey, 0.3),
    opacity: '.5',

    '&:hover': {
      cursor: 'pointer',
      transition: '.3s ease-in',
      opacity: '1',

      svg: {
        transition: '.3s ease-in',
      },
    },

    ...(is_sidebar_hide === 'true' && {
      gridColumnStart: '2',
      gridRowStart: '2',
      width: '15px',
    }),

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }),
);
