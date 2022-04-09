import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

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
    pointerEvents: 'auto',
  },
}));
