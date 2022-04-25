import { styled } from '@mui/material';

export const AddToDbButtonStyled = styled('button')(({ theme }) => ({
  margin: '10px 0px',
  backgroundColor: theme.colors.primary,
  border: `1px dashed ${theme.colors.bgDark}`,
  cursor: 'pointer',
  transition: '.2s all ease',
  borderRadius: '20%',

  '&:hover': {
    backgroundColor: theme.colors.purple,
  },
}));
