import { styled, TableContainer } from '@mui/material';

export const Wrapper = styled(TableContainer)(() => ({
  width: '90%',
  alignSelf: 'center',
  borderRadius: '5px',
  marginBottom: '15px',

  '::-webkit-scrollbar': {
    width: '4px',
  },
}));
