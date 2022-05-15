import { styled } from '@mui/material';
import { CardWrapper } from '../CardStyled/CardStyled.styled';

export const Wrapper = styled(CardWrapper)(({ theme }) => ({
  maxHeight: '400px',

  [theme.breakpoints.down('sm')]: {
    '& .mainTitle': {
      fontSize: '1.6rem',
      padding: '10px 0px',
      minHeight: '40px',
    },
  },
}));
