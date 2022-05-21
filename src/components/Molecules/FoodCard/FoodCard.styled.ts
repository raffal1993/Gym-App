import { styled } from '@mui/material';
import { CardWrapper } from '../CardStyled/CardStyled.styled';

export const Wrapper = styled(CardWrapper)(({ theme }) => ({
  maxHeight: '400px',
  minHeight: '200px',

  '& .noFood': {
    width: '30%',
    height: '30%',
    margin: '5% auto auto auto',
  },

  [theme.breakpoints.down('sm')]: {
    minHeight: '100px',
    '& .mainTitle': {
      fontSize: '1.6rem',
      padding: '10px 0px',
      minHeight: '40px',
    },
  },
}));
