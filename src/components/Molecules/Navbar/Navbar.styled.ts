import { styled, Box } from '@mui/material';
import { NavLink, NavLinkProps } from 'react-router-dom';

// GRID TEMPLATE "/Dashboard.styles.ts"
// gridTemplateColumns: '45px 205px 1fr',
// gridTemplateRows: `50px 65px 1fr`,

export const Wrapper = styled(`div`)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.colors.primary,
  color: theme.colors.white,
  borderBottom: `2px solid ${theme.colors.darkGrey}`,
  borderLeft: `2px solid ${theme.colors.darkGrey}`,
  padding: '10px',
  gridArea: '1/3/2/4',

  [theme.breakpoints.down('xs')]: {
    gridArea: '1/2/2/4',
  },
}));

export const PagesStyled = styled(`div`)<{ is_hamburger_menu?: string }>(
  ({ is_hamburger_menu }) => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
    fontSize: '1.4rem',

    ...(is_hamburger_menu && {
      flexDirection: 'column',
      padding: '10px 15px',
    }),
  }),
);

export const NavLinkStyled = styled(NavLink)<NavLinkProps & { is_hamburger_menu_element?: string }>(
  ({ theme, is_hamburger_menu_element }) => ({
    padding: '5px 25px',
    borderRadius: '5px',

    '&:hover': {
      backgroundColor: theme.colors.whiteLight,
    },

    '&.active': {
      backgroundColor: theme.colors.purple,
    },

    ...(is_hamburger_menu_element && {
      flexDirection: 'column',
      padding: '15px ',
      width: '100%',
      textAlign: 'center',

      '&:hover, &.active': {
        backgroundColor: theme.colors.primaryLight,
      },
    }),

    [theme.breakpoints.down('sm')]: {
      ...(!is_hamburger_menu_element && {
        '&:not(.active)': {
          display: 'none',
        },
      }),
    },
  }),
);

export const BoxStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));
