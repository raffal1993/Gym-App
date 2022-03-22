import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const LinkStyled = styled(Link)({
  display: 'flex',

  '& > p': {
    fontWeight: '600',
    fontSize: '1.2rem',
    marginLeft: '10px',
  },

  '& > svg': {
    display: 'block',
    margin: 'auto',
  },
});
