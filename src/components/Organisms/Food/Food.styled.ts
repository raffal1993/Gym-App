import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  //   position: 'relative',

  '& .searchFoodButton': {
    background: theme.colors.bgColorOne,
    position: 'absolute',
    top: '0',
    right: '0',
    width: '10%',
    maxWidth: '70px',
    margin: '10px 10px 0px 0px',
  },
}));

export const ScrollTopStyled = styled('div')<{ is_visible: string }>(({ theme, is_visible }) => ({
  height: '50px',
  width: '50px',
  position: 'fixed',
  bottom: '30px',
  right: '15px',
  transform: `${is_visible === 'true' ? 'translateY(0px)' : 'translateY(100px)'}`,
  cursor: 'pointer',
  opacity: '0.3',
  transition: 'all .3s',
  border: '4px solid black',
  borderRadius: '50%',
  zIndex: '100',

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
