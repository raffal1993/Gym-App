import { CardWrapper } from 'components/Molecules/CardStyled/CardStyled.styled';
import { styled } from '@mui/material';

export const Wrapper = styled(CardWrapper)({
  '& .sunTime': {
    position: 'absolute',
    top: '15px',
    fontSize: '1.5rem',

    svg: {
      width: '50%',
    },
  },

  '& .sunrise': {
    left: '15px',
  },
  '& .sunset': {
    right: '15px',
  },

  '& .weatherTabs': {
    height: '100%',
    width: '100%',
    padding: '0',
    margin: '10px 0px 0px 0px',
    border: 'none',
    backgroundColor: 'transparent',

    '& .MuiTabScrollButton-root': {
      margin: '0',
      width: 'auto',
    },

    '& .MuiTabs-indicator': {
      display: 'none',
    },

    '& .MuiTabs-scroller': {
      height: '100%',
    },
  },
});
