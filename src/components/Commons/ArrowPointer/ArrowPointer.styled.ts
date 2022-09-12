import { styled } from '@mui/material';

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  color: 'white',
  scale: '1.4',
  pointerEvents: 'none',
  cursor: 'default',

  '& .secondArrow': {
    transform: 'translate(-40%,0%)',
  },
}));
