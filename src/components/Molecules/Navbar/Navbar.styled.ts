import { styled, Box, Button, ButtonProps, Theme } from '@mui/material';
import { NavLink, NavLinkProps } from 'react-router-dom';

// GRID TEMPLATE "/Dashboard.styles.ts"
// gridTemplateColumns: '45px 205px 1fr',
// gridTemplateRows: `50px 65px 1fr`,

export const Wrapper = styled(`div`)(({ theme }) => ({
  display: 'grid',
  color: theme.colors.white,
  gridArea: '1/1/3/4',
  gridTemplateColumns: '40px 210px 5px 1fr 50px',
  gridTemplateRows: `50px 70px 1fr`,

  [theme.breakpoints.down('xs')]: {
    gridArea: '1/1/2/4',
  },
}));

export const PagesStyled = styled(`div`)<{ is_hamburger_menu?: string }>(
  ({ is_hamburger_menu, theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderBottom: `2px solid ${theme.colors.darkGrey}`,
    borderLeft: `2px solid ${theme.colors.darkGrey}`,
    fontSize: '1.4rem',
    gridArea: '1/4/1/6',

    ...(is_hamburger_menu && {
      flexDirection: 'column',
      padding: '10px 15px',
      backgroundColor: 'default',
      border: 'none',
    }),

    [theme.breakpoints.down('xs')]: {
      gridArea: '1/1/1/6',
    },
    [theme.breakpoints.down('sm')]: {
      borderBottomLeftRadius: '20px',
    },
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

export const HamburgerStyled = styled(Box)(({ theme }) => ({
  alignSelf: 'center',
  justifySelf: 'center',

  transform: 'scale(1.6)',
  gridArea: '1/5/2/6',

  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const WelcomeLogoStyledReduced = (theme: Theme, is_email_long: string) => ({
  span: { display: 'none' },
  gridArea: '1/1/2/3',
  borderRadius: '0px',
  borderBottom: `2px solid ${theme.colors.darkGrey}`,
  justifyContent: 'center',
  textAlign: 'center',

  h4: {
    fontSize: is_email_long === 'true' ? '1.1rem' : '1.4rem',
    padding: '0px 0px 0px 42px',
  },
});

export const WelcomeLogoStyled = styled(`div`)<{ is_sidebar_hide: string; is_email_long: string }>(
  ({ theme, is_email_long, is_sidebar_hide }) => ({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    borderRight: `2px solid ${theme.colors.darkGrey}`,
    backgroundColor: theme.colors.primary,
    padding: '10px',
    borderBottomRightRadius: '25px',
    gridArea: '1/1/3/3',
    overflow: 'hidden',

    span: {
      fontSize: '1.2rem',
      cursor: 'default',
    },

    h4: {
      fontFamily: theme.fonts.montserrat,
      fontWeight: '600',
      fontSize: is_email_long === 'true' ? '1.5rem' : '1.9rem',
      padding: '10px 0',
      width: '100%',
      overflow: 'hidden',
      cursor: 'default',
    },

    ...(is_sidebar_hide === 'true' && {
      '&': WelcomeLogoStyledReduced(theme, is_email_long),
    }),

    [theme.breakpoints.down('sm')]: {
      ...WelcomeLogoStyledReduced(theme, is_email_long),
      borderBottomRightRadius: '20px',
    },

    [theme.breakpoints.down('xs')]: {
      gridArea: '1/1/2/2',
      border: 'none',
    },
  }),
);

const LogoutButtonStyledReduced = {
  '& > p': { display: 'none' },
  height: '100%',
  minWidth: '40px',
  width: '40px',
  top: 0,
  left: 0,
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
};

export const LogoutButtonStyled = styled(Button)<ButtonProps & { is_sidebar_hide: string }>(
  ({ theme, is_sidebar_hide }) => ({
    display: 'flex',
    width: '105%',
    color: theme.colors.white,
    backgroundColor: theme.colors.darkGrey,
    borderRadius: '0px',
    position: 'absolute',
    bottom: -2,
    left: -5,

    '&:hover': {
      backgroundColor: theme.colors.purple,
    },

    '& > p': {
      flexGrow: 1,
    },

    [theme.breakpoints.down('sm')]: LogoutButtonStyledReduced,

    ...(is_sidebar_hide === 'true' && LogoutButtonStyledReduced),
  }),
);
