import { Button, ButtonProps, List, ListProps, styled } from '@mui/material';

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

export const WelcomeLogoStyled = styled(`div`)<{ is_email_long: string }>(
  ({ theme, is_email_long }) => ({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    borderRight: `2px solid ${theme.colors.darkGrey}`,
    backgroundColor: theme.colors.primary,
    padding: '10px',
    borderBottomRightRadius: '25px',
    gridArea: '1/1/3/4',
    overflow: 'hidden',

    span: {
      fontSize: '1.2rem',
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

    [theme.breakpoints.down('sm')]: {
      span: { display: 'none' },
      gridArea: '1/1/2/4',
      borderRadius: '0px',
      borderBottom: `2px solid ${theme.colors.darkGrey}`,
      justifyContent: 'center',
      textAlign: 'center',
      h4: {
        fontSize: is_email_long === 'true' ? '1.1rem' : '1.4rem',
        padding: '0px 0px 0px 42px',
      },
    },

    [theme.breakpoints.down('xs')]: {
      gridArea: '1/1/2/2',
    },
  }),
);

export const LogoutButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
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

  [theme.breakpoints.down('sm')]: {
    '& > p': { display: 'none' },
    height: '100%',
    minWidth: '42px !important',
    width: '42px',
    top: 0,
    left: 0,
  },
}));

export const SidebarListStyled = styled(List)<ListProps>(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  borderTop: `2px solid ${theme.colors.darkGrey}`,
  borderRight: `2px solid ${theme.colors.darkGrey}`,
  gridArea: '3/1/4/3',
  marginTop: '5px',

  '.listNumber': {
    textAlign: 'center',
    fontSize: '2rem',
    minWidth: '30px',
    borderRight: `2px solid ${theme.colors.bgDark}`,
  },

  '.MuiListItemButton-root': {
    marginBottom: '10px',
  },

  '.MuiTypography-root': {
    fontFamily: theme.fonts.gillSans,
    textTransform: 'uppercase',
    fontSize: '1.3rem',
    fontWeight: '800',
    textAlign: 'center',
    paddingLeft: '10px',
  },

  '.MuiListItemButton-root:hover': {
    backgroundColor: theme.colors.whiteLight,
  },
  '.Mui-selected, .Mui-selected:hover': {
    backgroundColor: `${theme.colors.purple} !important`,
  },

  [theme.breakpoints.down('sm')]: {
    gridArea: '2/1/4/2',
    overflow: 'hidden',

    '.MuiListItemButton-root': {
      padding: 0,
      paddingLeft: '4px',
    },
    '.listNumber': {
      borderRight: `none`,
    },
  },
}));
