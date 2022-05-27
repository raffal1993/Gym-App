import { styled } from '@mui/material';

export const ModalContentStyled = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  display: 'flex',
  justifyContent: 'center',
  transform: 'translate(-50%, -50%)',
  maxWidth: '320px',
  maxHeight: '100vh',
  minWidth: '300px',
  overflowY: 'auto',
  overflowX: 'hidden',
  background: theme.colors.bgColorOne,
  border: `2px solid ${theme.colors.whiteLight}`,
  padding: '4px',
}));
