import { styled } from '@mui/material';

export const EditDbButtonStyled = styled('button')(({ theme }) => ({
  margin: '10px 0px',
  backgroundColor: theme.colors.primary,
  border: `1px dashed ${theme.colors.bgDark}`,
  cursor: 'pointer',
  transition: '.2s all ease',
  borderRadius: '5px',
  padding: '2px 7px',
  color: theme.colors.white,
  filter: 'brightness(100%)',

  '&:hover': {
    filter: 'brightness(140%)',
  },
}));
