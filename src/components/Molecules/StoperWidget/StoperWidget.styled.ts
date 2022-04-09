import { darken } from '@mui/system';
import { styled } from '@mui/material';

export const Wrapper = styled('div')<{ is_hided: string }>(({ theme, is_hided }) => ({
  width: '300px',
  height: '40px',
  backgroundColor: darken(theme.colors.primary, 0.5),
  borderBottomLeftRadius: '40px',
  borderTopLeftRadius: '40px',
  position: 'absolute',
  right: '0',
  top: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  padding: '0 10px',
  transition: 'all .3s linear',

  ...(is_hided === 'true' && {
    right: '-260px',
  }),

  svg: {
    fill: theme.colors.primaryLight,
    fontSize: '2.3rem',
    flexGrow: '0',

    '&:hover': {
      cursor: 'pointer',
      fill: theme.colors.white,
    },
  },
}));

export const IconStyled = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',

  '&:not(:last-child)': {
    marginRight: '10px',
  },

  '&:hover': {
    cursor: 'pointer',
    svg: {
      fill: theme.colors.white,
      transform: 'scale(1.1)',
    },
  },

  svg: {
    fill: theme.colors.primaryLight,
    fontSize: '3rem',
  },
}));

export const TimerStyled = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.white,
  fontSize: '2rem',
  flexGrow: '1',
  marginLeft: '10px',
}));
