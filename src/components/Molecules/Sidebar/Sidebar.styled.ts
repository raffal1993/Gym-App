import { List, ListProps, styled } from '@mui/material';
import { darken } from '@mui/system';
import theme from 'style/theme';
import CustomTabs from '../CustomTabs/CustomTabs';

// GRID TEMPLATE "/Dashboard.styles.ts"
// gridTemplateColumns: '45px 205px 1fr',
// gridTemplateRows: `50px 65px 1fr`,

const blinkAnimation = (power: number = 5) => ({
  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    opacity: 1,
    boxShadow: `inset 0px 0px 10px ${[power]}px ${theme.colors.white}`,
    animation: 'blink .6s linear alternate  infinite',

    '@keyframes blink': {
      '100%': {
        opacity: '0',
      },
    },
  },
});

export const Wrapper = styled(`div`)(({ theme }) => ({
  color: theme.colors.white,
  display: 'grid',
  gridArea: '1/1/4/3',
  gridTemplateColumns: '40px 1fr 15px',
  gridTemplateRows: `50px 70px 1fr`,
  marginRight: '5px',
}));

export const SidebarListMobileStyled = styled(CustomTabs)<{
  is_settings_page: string;
  is_blink_animation_on: string;
}>(({ theme, is_settings_page, is_blink_animation_on }) => ({
  position: 'relative',

  ...(is_settings_page === 'true' && {
    backgroundColor: darken(theme.colors.primary, 0.3),
    textTransform: 'uppercase',
  }),

  ...(is_blink_animation_on === 'true' && { ...blinkAnimation(4) }),

  '& .editSidebarMobile': {
    border: `2px dashed ${theme.colors.bgDark}`,
    padding: '3px 7px',

    '& .arrowPointerMobile': {
      transform: 'rotate(180deg) translate(-60%,75%)',
      animation: 'movingArrowsSidebarMobile .5s linear alternate  infinite',

      '@keyframes movingArrowsSidebarMobile': {
        '100%': {
          transform: 'rotate(180deg) translate(-130%,75%)',
        },
      },
    },
  },
}));

export const SidebarListDesktopStyled = styled(List)<
  ListProps & { is_sidebar_hide: string; is_settings_page: string; is_blink_animation_on: string }
>(({ theme, is_sidebar_hide, is_settings_page, is_blink_animation_on }) => ({
  backgroundColor: theme.colors.primary,
  borderTop: `2px solid ${theme.colors.darkGrey}`,
  borderRight: `2px solid ${theme.colors.darkGrey}`,
  gridArea: '3/1/3/3',
  marginTop: '5px',
  overflowY: 'auto',
  overflowX: 'hidden',
  textAlign: 'center',

  ...(is_blink_animation_on === 'true' && { ...blinkAnimation(7) }),

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

  '& .editSidebarDesktop': {
    border: `2px dashed ${theme.colors.bgDark}`,
    padding: '3px 7px',

    '& .arrowPointerDesktop': {
      left: '0',
      transform: 'rotate(270deg) translate(-30%,0%)',
      animation: 'movingArrowsSidebarDesktop .5s linear alternate  infinite',

      '@keyframes movingArrowsSidebarDesktop': {
        '100%': {
          transform: 'rotate(270deg) translate(-80%,0%)',
        },
      },
    },
  },

  ...(is_settings_page === 'true' && {
    backgroundColor: darken(theme.colors.primary, 0.3),

    textTransform: 'uppercase',
  }),

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
}));

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
