import { styled } from '@mui/material';

export const SearchingResultsStyled = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  margin: '25px 0px',
  padding: '25px 0px',
  borderRadius: '5px',
  background: theme.colors.bgColorOne,
}));
