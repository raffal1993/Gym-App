import { styled } from '@mui/material';

export const ModalContentStyled = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '320px',
  maxHeight: '100vh',
  overflowY: 'auto',
  background: 'radial-gradient(circle, rgba(83,95,111,1) 0%, rgba(42,50,61,1) 100%)',
  border: `2px solid ${theme.colors.whiteLight}`,
  padding: '4px',
}));
