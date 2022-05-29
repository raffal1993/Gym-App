import { styled } from '@mui/material';
import { CardWrapper } from '../CardStyled/CardStyled.styled';

export const Wrapper = styled(CardWrapper)(({ theme }) => ({
  maxHeight: '550px',
  minHeight: '200px',

  '& .noFood': {
    width: '30%',
    height: '30%',
    margin: '5% auto auto auto',
  },

  [theme.breakpoints.down('sm')]: {
    '& .mainTitle': {
      padding: '5px 0px',
      minHeight: '50px',
    },
  },
}));
