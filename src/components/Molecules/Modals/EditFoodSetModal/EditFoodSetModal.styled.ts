import { styled } from '@mui/material';
import { CustomModalWrapper } from '../Modals.styled';

export const Wrapper = styled(CustomModalWrapper)(({ theme }) => ({
  display: 'flex',
  width: '100%',

  '& .foodSetName': {
    display: 'flex',
    width: '100%',
    marginBottom: '10px',
  },

  '& .name': {
    width: '100%',
    margin: '5px 10px',
  },

  '& .foodList': {
    display: 'flex',
    flexDirection: 'column',
    color: theme.colors.white,
    fontSize: '1.4rem',

    li: {
      marginBottom: '5px',
      display: 'flex',
      alignItems: 'center',

      span: {
        width: '100%',
        wordBreak: 'break-all',
      },
    },
  },
}));
