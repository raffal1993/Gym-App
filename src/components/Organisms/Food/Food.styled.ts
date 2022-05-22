import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& .searchFoodButton': {
    background: theme.colors.bgColorOne,
    position: 'absolute',
    top: '0',
    right: '0',
    width: '10%',
    maxWidth: '70px',
    margin: '10px 10px 0px 0px',
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}));

export const ScrollTopStyled = styled('div')<{ is_visible: string }>(({ theme, is_visible }) => ({
  height: '50px',
  width: '50px',
  position: 'fixed',
  bottom: '30px',
  right: '15px',
  cursor: 'pointer',
  opacity: '0.3',
  transition: 'all .3s',
  border: '4px solid black',
  borderRadius: '50%',
  zIndex: '100',
  transform: `${is_visible === 'true' ? 'scale(1)' : 'scale(0)'}`,

  '&:hover': {
    opacity: '1',
  },

  svg: {
    width: '100%',
    height: '100%',
    color: theme.colors.primary,
  },

  [theme.breakpoints.down('sm')]: {
    height: '40px',
    width: '40px',
  },
}));
