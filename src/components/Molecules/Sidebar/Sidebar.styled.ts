import { List, ListProps, styled } from '@mui/material';
import { darken } from '@mui/system';

// GRID TEMPLATE "/Dashboard.styles.ts"
// gridTemplateColumns: '45px 205px 1fr',
// gridTemplateRows: `50px 65px 1fr`,

export const Wrapper = styled(`div`)<{ is_settings_page: string }>(
  ({ theme, is_settings_page }) => ({
    color: theme.colors.white,
    display: 'grid',
    gridArea: '1/1/4/3',
    gridTemplateColumns: '40px 1fr 15px',
    gridTemplateRows: `50px 70px 1fr`,
    marginRight: '5px',

    ...(is_settings_page === 'true' && {
      '& .sidebar': {
        backgroundColor: darken(theme.colors.primary, 0.3),

        textTransform: 'uppercase',
      },
    }),
  }),
);

export const SidebarListStyled = styled(List)<ListProps & { is_sidebar_hide: string }>(
  ({ theme, is_sidebar_hide }) => ({
    backgroundColor: theme.colors.primary,
    borderTop: `2px solid ${theme.colors.darkGrey}`,
    borderRight: `2px solid ${theme.colors.darkGrey}`,
    gridArea: '3/1/3/3',
    marginTop: '5px',
    overflowY: 'auto',
    overflowX: 'hidden',
    textAlign: 'center',

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
      whiteSpace: 'nowrap',

      '&:hover': {
        backgroundColor: theme.colors.whiteLight,
      },
    },

    '& .MuiTypography-root': {
      fontFamily: theme.fonts.roboto,
      fontSize: '1.3rem',
      textAlign: 'center',
      paddingLeft: '10px',
    },

    '& .Mui-selected, & .Mui-selected:hover': {
      backgroundColor: `${theme.colors.purple} !important`,
    },

    '.buttonAddSubPage': {
      border: `2px dashed ${theme.colors.bgDark}`,
      padding: '3px 7px',
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
