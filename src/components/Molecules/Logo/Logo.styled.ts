import { styled } from '@mui/material';
import { ReactComponent as MyIcon } from 'assets/images/arm.svg';

export const Wrapper = styled(`div`)({
  display: 'flex',
  alignItems: 'center',
  height: '150px',
  userSelect: 'none',
  marginTop: '20px',
});

export const StyledTitle = styled(`h1`)(({ theme }) => ({
  fontSize: '4rem',
  textAlign: 'center',
  borderRight: `3px solid ${theme.colors.primaryLight}`,
  borderLeft: `3px solid ${theme.colors.primaryLight}`,
  padding: '0 5px',
  color: theme.colors.primaryLight,

  '& > p': {
    fontSize: '2.5rem',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '3rem',

    '& > p': {
      fontSize: '2rem',
    },
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '2rem',

    '& > p': {
      fontSize: '1.5rem',
    },
  },
}));

export const StyledSvgIcon = styled(MyIcon)<{ arm_to_rotate?: string }>(
  ({ theme, arm_to_rotate }) => ({
    width: '100px',
    fill: theme.colors.primaryLight,

    transform: arm_to_rotate && 'rotateY(180deg)',

    [theme.breakpoints.down('sm')]: {
      width: '80px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '60px',
    },
  }),
);
