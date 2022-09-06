import { styled } from '@mui/material';

export const Wrapper = styled('div')<{ is_disabled: string }>(({ theme, is_disabled }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: is_disabled === 'true' ? 'none' : 'auto',
  opacity: is_disabled === 'true' ? '0.5' : '1',

  '&:hover': {
    img: {
      transition: 'all 0.3s linear',
      transform: 'scale(0.9)',
    },
  },

  h5: {
    transform: 'rotate(-50deg)',
    marginRight: '5px',
    fontSize: '1.4rem',
    color: theme.colors.bgDark,
  },

  img: {
    height: '60px',
    borderRadius: '10px',
  },

  svg: {
    fontSize: '3rem',
  },

  [theme.breakpoints.down('sm')]: {
    h5: {
      fontSize: '1.1rem',
    },
    img: {
      height: '40px',
      borderRadius: '5px',
    },
    svg: {
      fontSize: '2.3rem',
    },
  },
}));
