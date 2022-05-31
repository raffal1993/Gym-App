import { styled } from '@mui/material';

export const ModalContentStyled = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transform: 'translate(-50%, -50%)',
  maxWidth: '320px',
  maxHeight: '100vh',
  minWidth: '300px',
  overflowY: 'auto',
  overflowX: 'hidden',
  background: theme.colors.bgColorOne,
  border: `2px solid ${theme.colors.whiteLight}`,
  padding: '4px',

  '& .close': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '25px',
    width: '100%',
    border: `1px solid ${theme.colors.whiteLight}`,
    color: theme.colors.whiteLight,
    opacity: '0.4',
    transition: 'all 0.2s ease-in-out',

    '&:hover': {
      opacity: '.7',
      cursor: 'pointer',
      color: theme.colors.white,
      border: `1px solid ${theme.colors.white}`,
    },
  },
}));
