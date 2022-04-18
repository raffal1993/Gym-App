import { styled } from '@mui/material';

export const VersionButtonStyled = styled('button')(({ theme }) => ({
  marginLeft: '10px',
  padding: '5px 15px',
  backgroundColor: 'transparent',
  border: `1px solid ${theme.colors.whiteLight}`,
  color: 'inherit',
  cursor: 'pointer',
  textShadow: 'inherit',

  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'all 0.1s  ease-in-out',
  },

  '&.active': {
    backgroundColor: theme.colors.primary,
    border: `1px solid ${theme.colors.primary}`,
    transform: 'scale(1.2)',
  },
}));
