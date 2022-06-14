import { styled } from '@mui/material';
import { CardWrapper } from 'components/Molecules/CardStyled/CardStyled.styled';

export const Wrapper = styled(CardWrapper)<{ url: string }>(({ url }) => ({
  minHeight: '400px',
  '&:after': {
    content: '""',
    background: `url('${url}') `,
    backgroundSize: 'cover',
    backgroundPosition: '20%',
    opacity: '.4',
    width: '100px',
    height: '50%',
    position: 'absolute',
    bottom: '-10px',
    right: '-10px',
    borderTopLeftRadius: '100px',
    pointerEvents: 'none',
  },

  '& .buttonEditExercise': {
    position: 'absolute',
    top: '3px',
    left: '15px',
    padding: `5px 10px 3px 10px`,
  },
}));

export const VersionsStyled = styled('div')(({ theme }) => ({
  margin: '10px 0px 10px 20px',

  '& .addVersionButton': {
    backgroundColor: theme.colors.green,
  },
}));
